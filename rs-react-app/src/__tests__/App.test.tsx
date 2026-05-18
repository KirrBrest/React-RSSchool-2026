import {
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { AppErrorBoundary } from '../components/AppErrorBoundary';
import {
  renderWithAppRoutes,
  renderWithRouter,
} from './renderWithRouter.tsx';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { SearchTermStorage } from '../storage/searchTermStorage';
import { HomeListSnapshot } from '../storage/homeListSnapshot';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
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

describe('App', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    HomeListSnapshot.clear();
    vi.clearAllMocks();
    fetchPeople.mockResolvedValue(emptyPeopleList());
    fetchPerson.mockResolvedValue(onePersonSwapiList().results[0]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
      });
      expect(root.getByText('No matching people.')).toBeInTheDocument();
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
  });

  describe('state management', () => {
    it('updates visible results when the API returns people', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { view } = renderWithRouter();
      await waitFor(() => {
        expect(
          withinRenderedRoot(view).getByText(
            'Gender: male · Birth: 19BBY · 172 cm · 77 kg · Hair: blond · Eyes: blue · Skin: fair'
          )
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
      fetchPeople
        .mockResolvedValueOnce(
          listResponse({ count: 20, hasNext: true, hasPrev: false })
        )
        .mockResolvedValueOnce(
          listResponse({ count: 20, hasNext: false, hasPrev: true })
        )
        .mockResolvedValueOnce(
          listResponse({ count: 20, hasNext: true, hasPrev: false })
        );

      const { view } = renderWithRouter();
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(root.getByText('Page 1 of 2')).toBeInTheDocument();
      });

      fireEvent.click(root.getByRole('button', { name: 'Next' }));
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenLastCalledWith('', 2);
      });

      await waitFor(() => {
        expect(root.getByText('Page 2 of 2')).toBeInTheDocument();
      });

      fireEvent.click(root.getByRole('button', { name: 'Previous' }));
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenLastCalledWith('', 1);
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

    it('resets the page query to 1 when the search input changes', async () => {
      const { view, router } = renderWithRouter('/?page=2');
      const root = withinRenderedRoot(view);

      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('', 2);
      });

      fireEvent.change(root.getByLabelText('Search query'), {
        target: { value: 'a' },
      });

      await waitFor(() => {
        expect(router.state.location.search).toBe('?page=1');
      });
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

    it('syncs details from a direct visit to /?page=1&details=1', async () => {
      fetchPeople.mockResolvedValue(onePersonSwapiList());
      const { router } = renderWithRouter('/?page=1&details=1');
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/details');
        expect(router.state.location.search).toContain('details=1');
      });
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
