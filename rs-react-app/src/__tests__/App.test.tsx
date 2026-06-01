import {
  screen,
  fireEvent,
  waitFor,
  cleanup,
  within,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { AppErrorBoundary } from '../components/AppErrorBoundary';
import {
  renderWithAppRoutes,
  renderWithRouter,
  resetStoreState,
} from './renderWithRouter.tsx';
import { store } from '../store';
import { selectSelectedItems } from '../store/selectedItemsSlice';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { SearchTermStorage } from '../storage/searchTermStorage';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
import { SelectedItemsCsvDownload } from '../utils/selectedItemsCsvDownload';
import { QUERY_UI, THEME_MODES } from '../constants';
import type { SwapiPeopleListResponse } from '../types';
import { emptyPeopleList } from './emptyPeopleList.ts';
import { onePersonSwapiList } from './onePersonSwapiList.ts';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    pageSize: 10,
    fetchPeople: vi.fn(),
    fetchPerson: vi.fn(),
  },
}));

const fetchPeople = vi.mocked(SwapiPeopleApi.fetchPeople);
const fetchPerson = vi.mocked(SwapiPeopleApi.fetchPerson);

function listResponse(options: {
  count: number;
  hasNext: boolean;
  hasPrev: boolean;
}): SwapiPeopleListResponse {
  return {
    count: options.count,
    next: options.hasNext ? 'next' : null,
    previous: options.hasPrev ? 'prev' : null,
    results: [],
  };
}

function mockPaginatedPeopleList(): void {
  fetchPeople.mockImplementation((_term: string, page: number) => {
    if (page === 1) {
      return Promise.resolve(
        listResponse({ count: 20, hasNext: true, hasPrev: false })
      );
    }
    if (page === 2) {
      return Promise.resolve(
        listResponse({ count: 20, hasNext: false, hasPrev: true })
      );
    }
    return Promise.resolve(emptyPeopleList());
  });
}

describe('App', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    resetStoreState();
    document.documentElement.dataset.theme = THEME_MODES.dark;
    vi.clearAllMocks();
    fetchPeople.mockResolvedValue(emptyPeopleList());
    fetchPerson.mockResolvedValue(onePersonSwapiList().results[0]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete document.documentElement.dataset.theme;
    cleanup();
  });

  describe('integration', () => {
    it('renders navigation link to About', () => {
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);
      expect(root.getByRole('link', { name: 'About' })).toHaveAttribute(
        'href',
        '/about'
      );
    });

    it('makes initial API call on component mount', async () => {
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('', 1);
        expect(root.getByText('No matching people.')).toBeInTheDocument();
      });
    });

    it('handles search term from localStorage on initial load', async () => {
      localStorage.setItem(SearchTermStorage.storageKey, 'stored-query');
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);
      expect(
        root.getByLabelText('Search query')
      ).toHaveValue('stored-query');
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('stored-query', 1);
      });
    });

    it('manages loading states during API calls', async () => {
      let resolveData!: (value: ReturnType<typeof emptyPeopleList>) => void;
      const pending = new Promise<ReturnType<typeof emptyPeopleList>>(
        (resolve) => {
          resolveData = resolve;
        }
      );
      fetchPeople.mockReturnValue(pending);
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);
      expect(root.getByText('Loading data…')).toBeInTheDocument();
      resolveData(emptyPeopleList());
      await waitFor(() => {
        expect(root.getByText('No matching people.')).toBeInTheDocument();
      });
    });
  });

  describe('API integration', () => {
    it('calls API with correct parameters when the user searches', async () => {
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalled();
      });
      fetchPeople.mockClear();
      fireEvent.change(root.getByLabelText('Search query'), {
        target: { value: 'falcon' },
      });
      fireEvent.click(root.getByRole('button', { name: 'Search' }));
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('falcon', 1);
      });
    });

    it('handles successful API responses', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      renderWithRouter();
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'View details for Luke Skywalker' })
        ).toBeInTheDocument();
      });
    });

    it('handles API error responses', async () => {
      fetchPeople.mockRejectedValue(new Error('SWAPI_HTTP_500'));
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);
      const expected = AppFetchErrorMessage.fromUnknown(
        new Error('SWAPI_HTTP_500')
      );
      await waitFor(() => {
        expect(root.getByRole('alert')).toHaveTextContent(expected);
      });
    });

    it('clears stale list results when a later search fails', async () => {
      fetchPeople.mockResolvedValueOnce(onePersonSwapiList());
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('button', { name: 'View details for Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fetchPeople.mockRejectedValueOnce(new Error('SWAPI_HTTP_500'));
      fireEvent.change(root.getByLabelText('Search query'), {
        target: { value: 'broken' },
      });
      fireEvent.click(root.getByRole('button', { name: 'Search' }));
      const expected = AppFetchErrorMessage.fromUnknown(
        new Error('SWAPI_HTTP_500')
      );
      await waitFor(() => {
        expect(root.getByRole('alert')).toHaveTextContent(expected);
      });
      expect(
        root.queryByRole('button', { name: 'View details for Luke Skywalker' })
      ).not.toBeInTheDocument();
    });

    it('shows a readable error in the details panel when fetch fails', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      fetchPerson.mockRejectedValue(new Error('SWAPI_HTTP_404'));
      const { view } = renderWithRouter('/details?page=1&details=1');
      const root = withinRenderedRoot(view);
      const detailsPanel = within(
        root.getByRole('region', { name: 'Person details' })
      );
      const expected = AppFetchErrorMessage.fromUnknown(
        new Error('SWAPI_HTTP_404')
      );
      await waitFor(() => {
        expect(detailsPanel.getByRole('alert')).toHaveTextContent(expected);
      });
      expect(detailsPanel.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    });
  });

  describe('state management', () => {
    it('updates visible results when the API returns people', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view } = renderWithRouter();
      await waitFor(() => {
        expect(
          withinRenderedRoot(view).getByRole('button', {
            name: 'View details for Luke Skywalker',
          })
        ).toBeInTheDocument();
      });
    });

    it('manages search term state through search and storage', async () => {
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalled();
      });
      fireEvent.change(root.getByLabelText('Search query'), {
        target: { value: 'solo' },
      });
      fireEvent.click(root.getByRole('button', { name: 'Search' }));
      await waitFor(() => {
        expect(root.getByLabelText('Search query')).toHaveValue('solo');
      });
      expect(localStorage.getItem(SearchTermStorage.storageKey)).toBe('solo');
    });
  });

  describe('pagination', () => {
    it('skips API call when search term and page are unchanged', async () => {
      fetchPeople.mockResolvedValue(emptyPeopleList());
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('', 1);
      });

      fetchPeople.mockClear();
      fireEvent.click(root.getByRole('button', { name: 'Search' }));

      await waitFor(() => {
        expect(fetchPeople).not.toHaveBeenCalled();
      });
    });

    it('loads next and previous pages when pagination is available', async () => {
      mockPaginatedPeopleList();

      const { view, router } = renderWithRouter();
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(root.getByText('Page 1 of 2')).toBeInTheDocument();
      });

      fireEvent.click(root.getByRole('button', { name: 'Next' }));
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenLastCalledWith('', 2);
        expect(router.state.location.search).toBe('?page=2');
      });

      await waitFor(() => {
        expect(root.getByText('Page 2 of 2')).toBeInTheDocument();
      });

      fetchPeople.mockClear();
      fireEvent.click(root.getByRole('button', { name: 'Previous' }));
      await waitFor(() => {
        expect(router.state.location.search).toBe('?page=1');
        expect(root.getByText('Page 1 of 2')).toBeInTheDocument();
      });
      expect(root.queryByText(QUERY_UI.listLoading)).not.toBeInTheDocument();
      expect(fetchPeople).not.toHaveBeenCalled();
    });

    it('refetches the current page when refresh is clicked after cache is warm', async () => {
      mockPaginatedPeopleList();
      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(root.getByText('Page 1 of 2')).toBeInTheDocument();
      });

      fireEvent.click(root.getByRole('button', { name: 'Next' }));
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenLastCalledWith('', 2);
      });

      fetchPeople.mockClear();
      fireEvent.click(root.getByRole('button', { name: 'Previous' }));
      await waitFor(() => {
        expect(root.getByText('Page 1 of 2')).toBeInTheDocument();
      });
      expect(fetchPeople).not.toHaveBeenCalled();

      fireEvent.click(
        root.getByRole('button', { name: 'Refresh results' })
      );
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('', 1);
      });
    });

    it('loads the page number from the URL on first visit', async () => {
      renderWithRouter('/?page=2');
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('', 2);
      });
    });

    it('updates the URL when moving to another page', async () => {
      fetchPeople
        .mockResolvedValueOnce(
          listResponse({ count: 20, hasNext: true, hasPrev: false })
        )
        .mockResolvedValueOnce(
          listResponse({ count: 20, hasNext: false, hasPrev: true })
        );
      const { view, router } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(root.getByText('Page 1 of 2')).toBeInTheDocument();
      });

      fireEvent.click(root.getByRole('button', { name: 'Next' }));

      await waitFor(() => {
        expect(router.state.location.search).toBe('?page=2');
      });
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenLastCalledWith('', 2);
      });
    });

    it('keeps the current page when the search input changes', async () => {
      const { view, router } = renderWithRouter('/?page=2');
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('', 2);
      });

      fetchPeople.mockClear();

      fireEvent.change(root.getByLabelText('Search query'), {
        target: { value: 'a' },
      });

      expect(router.state.location.search).toBe('?page=2');
      expect(fetchPeople).not.toHaveBeenCalled();
    });

    it('paginates search results when more than one page exists', async () => {
      fetchPeople
        .mockReset()
        .mockResolvedValueOnce(emptyPeopleList())
        .mockResolvedValueOnce(
          listResponse({ count: 15, hasNext: true, hasPrev: false })
        )
        .mockResolvedValueOnce(
          listResponse({ count: 15, hasNext: false, hasPrev: true })
        );
      const { view, router } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('', 1);
      });

      fireEvent.change(root.getByLabelText('Search query'), {
        target: { value: 'sky' },
      });
      fireEvent.click(root.getByRole('button', { name: 'Search' }));

      await waitFor(() => {
        expect(fetchPeople).toHaveBeenLastCalledWith('sky', 1);
      });

      await waitFor(() => {
        expect(root.getByText('Page 1 of 2')).toBeInTheDocument();
        expect(
          root.getByRole('button', { name: 'Next' })
        ).not.toBeDisabled();
      });

      fireEvent.click(root.getByRole('button', { name: 'Next' }));

      await waitFor(() => {
        expect(fetchPeople).toHaveBeenLastCalledWith('sky', 2);
      });
      await waitFor(() => {
        expect(root.getByText('Page 2 of 2')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(router.state.location.search).toBe('?page=2');
      });
    });

    it('does not show pagination controls while results are loading', async () => {
      let resolveData!: (value: ReturnType<typeof emptyPeopleList>) => void;
      const pending = new Promise<ReturnType<typeof emptyPeopleList>>(
        (resolve) => {
          resolveData = resolve;
        }
      );
      fetchPeople.mockReturnValue(pending);
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);

      expect(
        root.queryByRole('navigation', { name: 'People list pages' })
      ).not.toBeInTheDocument();

      resolveData(
        listResponse({ count: 20, hasNext: true, hasPrev: false })
      );

      await waitFor(() => {
        expect(
          root.getByRole('navigation', { name: 'People list pages' })
        ).toBeInTheDocument();
      });
    });
  });

  describe('master-detail', () => {
    it('does not show the details panel on initial load', async () => {
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalled();
      });
      expect(
        root.queryByRole('region', { name: 'Person details' })
      ).not.toBeInTheDocument();
    });

    it('opens details in the outlet when a result card is clicked', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view, router } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('button', { name: 'View details for Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('button', { name: 'View details for Luke Skywalker' })
      );
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/details');
        expect(router.state.location.search).toContain('details=1');
      });
      await waitFor(() => {
        expect(fetchPerson).toHaveBeenCalledWith('1');
      });
      expect(
        root.getByRole('region', { name: 'Person details' })
      ).toBeInTheDocument();
    });

    it('reuses cached person details without the initial loading state', async () => {
      const luke = onePersonSwapiList().results[0];
      const leia = {
        ...luke,
        name: 'Leia Organa',
        url: 'https://swapi.py4e.com/api/people/2/',
      };
      fetchPeople.mockResolvedValue({
        count: 2,
        next: null,
        previous: null,
        results: [luke, leia],
      });
      fetchPerson
        .mockResolvedValueOnce(luke)
        .mockResolvedValueOnce(leia);

      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(
          root.getByRole('button', { name: 'View details for Luke Skywalker' })
        ).toBeInTheDocument();
      });

      fireEvent.click(
        root.getByRole('button', { name: 'View details for Luke Skywalker' })
      );
      const detailsPanel = () =>
        within(root.getByRole('region', { name: 'Person details' }));

      await waitFor(() => {
        expect(detailsPanel().getByText('Luke Skywalker')).toBeInTheDocument();
      });

      fireEvent.click(
        root.getByRole('button', { name: 'View details for Leia Organa' })
      );
      await waitFor(() => {
        expect(detailsPanel().getByText('Leia Organa')).toBeInTheDocument();
      });

      fetchPerson.mockClear();
      fireEvent.click(
        root.getByRole('button', { name: 'View details for Luke Skywalker' })
      );

      await waitFor(() => {
        expect(detailsPanel().getByText('Luke Skywalker')).toBeInTheDocument();
      });
      expect(fetchPerson).not.toHaveBeenCalled();
      expect(
        detailsPanel().queryByText(QUERY_UI.detailsLoading)
      ).not.toBeInTheDocument();
    });

    it('closes the details panel when Close is clicked', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view, router } = renderWithRouter('/details?page=1&details=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('button', { name: 'Close details' })
        ).toBeInTheDocument();
      });
      fireEvent.click(root.getByRole('button', { name: 'Close details' }));
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/');
        expect(router.state.location.search).toBe('?page=1');
      });
      expect(
        root.queryByRole('region', { name: 'Person details' })
      ).not.toBeInTheDocument();
    });

    it('restores details after remount when returning from another route', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const first = renderWithRouter('/details?page=1&details=1');
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledTimes(1);
      });
      first.view.unmount();
      const second = renderWithRouter('/details?page=1&details=1');
      await waitFor(() => {
        expect(second.router.state.location.pathname).toBe('/details');
        expect(second.router.state.location.search).toContain('details=1');
        expect(
          screen.getByRole('region', { name: 'Person details' })
        ).toBeInTheDocument();
      });
      expect(fetchPeople).toHaveBeenCalledTimes(1);
    });

    it('keeps details in the URL after the list fetch finishes', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { router } = renderWithRouter('/details?page=1&details=1');
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalled();
      });
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/details');
        expect(router.state.location.search).toContain('details=1');
      });
    });

    it('keeps the details panel open when paginating', async () => {
      fetchPeople
        .mockResolvedValueOnce(
          listResponse({ count: 20, hasNext: true, hasPrev: false })
        )
        .mockResolvedValueOnce(
          listResponse({ count: 20, hasNext: false, hasPrev: true })
        );
      const { view, router } = renderWithRouter('/details?page=1&details=1');
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(root.getByText('Page 1 of 2')).toBeInTheDocument();
      });

      fireEvent.click(root.getByRole('button', { name: 'Next' }));

      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/details');
        expect(router.state.location.search).toContain('details=1');
        expect(router.state.location.search).toContain('page=2');
      });
      expect(
        root.getByRole('region', { name: 'Person details' })
      ).toBeInTheDocument();
    });

    it('syncs details from a direct visit to /?page=1&details=1', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { router } = renderWithRouter('/?page=1&details=1');
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/details');
        expect(router.state.location.search).toContain('details=1');
      });
    });
  });

  describe('selected items', () => {
    it('selects an item via checkbox without opening details', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view, router } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeChecked();
      });
      expect(router.state.location.pathname).toBe('/');
      expect(
        root.queryByRole('region', { name: 'Person details' })
      ).not.toBeInTheDocument();
      expect(selectSelectedItems(store.getState())).toHaveLength(1);
    });

    it('opens details without changing checkbox selection', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view, router } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('button', { name: 'View details for Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('button', { name: 'View details for Luke Skywalker' })
      );
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/details');
      });
      expect(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      ).not.toBeChecked();
      expect(selectSelectedItems(store.getState())).toHaveLength(0);
    });

    it('removes an item from state when unselected', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeChecked();
      });
      fireEvent.click(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).not.toBeChecked();
      });
      expect(selectSelectedItems(store.getState())).toHaveLength(0);
    });

    it('keeps checkbox selections after page navigation', async () => {
      fetchPeople
        .mockResolvedValueOnce({
          ...onePersonSwapiList(),
          count: 20,
          next: 'next',
          previous: null,
        })
        .mockResolvedValueOnce(
          listResponse({ count: 20, hasNext: false, hasPrev: true })
        )
        .mockResolvedValueOnce({
          ...onePersonSwapiList(),
          count: 20,
          next: 'next',
          previous: null,
        });
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      await waitFor(() => {
        expect(selectSelectedItems(store.getState())).toHaveLength(1);
      });
      fireEvent.click(root.getByRole('button', { name: 'Next' }));
      await waitFor(() => {
        expect(root.getByText('Page 2 of 2')).toBeInTheDocument();
      });
      expect(selectSelectedItems(store.getState())).toHaveLength(1);
      fireEvent.click(root.getByRole('button', { name: 'Previous' }));
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeChecked();
      });
    });
  });

  describe('selected items flyout', () => {
    it('shows the flyout with count after selecting an item', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      await waitFor(() => {
        expect(
          root.getByRole('region', { name: 'Selected items' })
        ).toHaveTextContent('1 item selected');
      });
    });

    it('hides the flyout after Unselect all', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      await waitFor(() => {
        expect(
          root.getByRole('region', { name: 'Selected items' })
        ).toBeInTheDocument();
      });
      fireEvent.click(root.getByRole('button', { name: 'Unselect all' }));
      await waitFor(() => {
        expect(
          root.queryByRole('region', { name: 'Selected items' })
        ).not.toBeInTheDocument();
      });
      expect(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      ).not.toBeChecked();
    });

    it('keeps the flyout visible after navigating to About', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view, router } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      await waitFor(() => {
        expect(
          root.getByRole('region', { name: 'Selected items' })
        ).toHaveTextContent('1 item selected');
      });
      fireEvent.click(root.getByRole('link', { name: 'About' }));
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/about');
      });
      expect(
        root.getByRole('region', { name: 'Selected items' })
      ).toHaveTextContent('1 item selected');
    });

    it('downloads a CSV file when Download is clicked', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const download = vi
        .spyOn(SelectedItemsCsvDownload, 'download')
        .mockImplementation(() => {});
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(
          root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
        ).toBeInTheDocument();
      });
      fireEvent.click(
        root.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      await waitFor(() => {
        expect(
          root.getByRole('region', { name: 'Selected items' })
        ).toBeInTheDocument();
      });
      fireEvent.click(root.getByRole('button', { name: 'Download' }));
      expect(download).toHaveBeenCalledTimes(1);
      expect(download.mock.calls[0][0]).toHaveLength(1);
      expect(download.mock.calls[0][0][0].name).toBe('Luke Skywalker');
      download.mockRestore();
    });
  });

  describe('theme', () => {
    it('shows theme controls at the top of the app', async () => {
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalled();
      });
      expect(root.getByRole('radio', { name: 'Light' })).toBeInTheDocument();
      expect(root.getByRole('radio', { name: 'Dark' })).toBeInTheDocument();
    });

    it('updates the application theme when light is selected', async () => {
      const { view } = renderWithRouter('/?page=1');
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalled();
      });
      fireEvent.click(root.getByRole('radio', { name: 'Light' }));
      expect(document.documentElement.dataset.theme).toBe(THEME_MODES.light);
    });
  });

  describe('error button', () => {
    it('throws when simulate error is clicked and triggers error boundary fallback UI', async () => {
      const err = vi.spyOn(console, 'error').mockImplementation(() => {});
      renderWithAppRoutes(
        '/?page=1',
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      );
      await waitFor(() => {
        expect(screen.getByText('No matching people.')).toBeInTheDocument();
      });
      fireEvent.click(
        screen.getByRole('button', { name: 'Simulate error' })
      );
      expect(
        screen.getByRole('heading', { name: 'Something went wrong' })
      ).toBeInTheDocument();
      expect(
        err.mock.calls.some(
          (args) =>
            args.length > 0 && args[0] === 'AppErrorBoundary caught an error:'
        )
      ).toBe(true);
      err.mockRestore();
    });
  });
});
