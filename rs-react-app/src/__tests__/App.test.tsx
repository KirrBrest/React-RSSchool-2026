import { screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { AppErrorBoundary } from '../components/AppErrorBoundary';
import { renderWithRouter } from './renderWithRouter.tsx';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { SearchTermStorage } from '../storage/searchTermStorage';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
import type { SwapiPeopleListResponse } from '../types';
import { emptyPeopleList } from './emptyPeopleList.ts';
import { onePersonSwapiList } from './onePersonSwapiList.ts';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    pageSize: 10,
    fetchPeople: vi.fn(),
  },
}));

const fetchPeople = vi.mocked(SwapiPeopleApi.fetchPeople);

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
    vi.clearAllMocks();
    fetchPeople.mockResolvedValue(emptyPeopleList());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  describe('integration', () => {
    it('makes initial API call on component mount', async () => {
      const view = renderWithRouter(<App />);
      const root = withinRenderedRoot(view);
      await waitFor(() => {
        expect(fetchPeople).toHaveBeenCalledWith('', 1);
      });
      expect(root.getByText('No matching people.')).toBeInTheDocument();
    });

    it('handles search term from localStorage on initial load', async () => {
      localStorage.setItem(SearchTermStorage.storageKey, 'stored-query');
      const view = renderWithRouter(<App />);
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
      const view = renderWithRouter(<App />);
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
      const view = renderWithRouter(<App />);
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
      renderWithRouter(<App />);
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Luke Skywalker' })
        ).toBeInTheDocument();
      });
    });

    it('handles API error responses', async () => {
      fetchPeople.mockRejectedValue(new Error('SWAPI_HTTP_500'));
      const view = renderWithRouter(<App />);
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
      const view = renderWithRouter(<App />);
      await waitFor(() => {
        expect(
          withinRenderedRoot(view).getByText(
            'Gender: male · Birth: 19BBY · 172 cm · 77 kg · Hair: blond · Eyes: blue · Skin: fair'
          )
        ).toBeInTheDocument();
      });
    });

    it('manages search term state through search and storage', async () => {
      const view = renderWithRouter(<App />);
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
      const view = renderWithRouter(<App />);
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

      const view = renderWithRouter(<App />);
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
  });

  describe('error button', () => {
    it('throws when simulate error is clicked and triggers error boundary fallback UI', async () => {
      const err = vi.spyOn(console, 'error').mockImplementation(() => {});
      renderWithRouter(
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
