import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SearchSection } from '../components/SearchSection';
import { SearchTermStorage } from '../storage/searchTermStorage';
import { fetchInitialPeopleList } from '../utils/fetchInitialPeopleList';
import { withinRenderedRoot } from './withinRenderedRoot.ts';
import { emptyPeopleList } from './emptyPeopleList.ts';

vi.mock('../actions/searchPeople', () => ({
  searchPeopleAction: vi.fn(
    async (
      _previousState: unknown,
      formData: FormData
    ) => {
      const term = String(formData.get('search-query') ?? '').trim();
      const result = await fetchInitialPeopleList({ term, page: 1 });
      return {
        query: { term, page: 1 },
        data: result.data,
        errorMessage: result.errorMessage,
      };
    }
  ),
}));

const storageKey = SearchTermStorage.storageKey;

describe('SearchSection', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('renders search input and search button', () => {
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getByLabelText('Search query')).toBeInTheDocument();
      expect(region.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('displays previously saved search term from localStorage on mount', () => {
      localStorage.setItem(storageKey, 'stored-value');
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      expect(withinRenderedRoot(view).getByLabelText('Search query')).toHaveValue(
        'stored-value'
      );
    });

    it('prefers the URL search term over localStorage on mount', () => {
      localStorage.setItem(storageKey, 'stored-value');
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm="url-term"
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      expect(withinRenderedRoot(view).getByLabelText('Search query')).toHaveValue(
        'url-term'
      );
    });

    it('shows empty input when no saved term exists', () => {
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      expect(withinRenderedRoot(view).getByLabelText('Search query')).toHaveValue(
        ''
      );
    });
  });

  describe('user interaction', () => {
    it('updates input value when user types', () => {
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      const input = withinRenderedRoot(view).getByLabelText('Search query');
      fireEvent.change(input, { target: { value: 'typed value' } });
      expect(input).toHaveValue('typed value');
    });

    it('saves search term to localStorage when search button is clicked', async () => {
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      const region = withinRenderedRoot(view);
      fireEvent.change(region.getByLabelText('Search query'), {
        target: { value: 'persisted' },
      });
      fireEvent.click(region.getByRole('button', { name: 'Search' }));
      expect(localStorage.getItem(storageKey)).toBe('persisted');
      await waitFor(() => {
        expect(onSearchComplete).toHaveBeenCalledWith(
          expect.objectContaining({
            query: { term: 'persisted', page: 1 },
          })
        );
      });
    });

    it('trims whitespace from search input before saving', async () => {
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      const region = withinRenderedRoot(view);
      fireEvent.change(region.getByLabelText('Search query'), {
        target: { value: '  trimmed term  ' },
      });
      fireEvent.click(region.getByRole('button', { name: 'Search' }));
      expect(localStorage.getItem(storageKey)).toBe('trimmed term');
      await waitFor(() => {
        expect(onSearchComplete).toHaveBeenCalledWith(
          expect.objectContaining({
            query: { term: 'trimmed term', page: 1 },
          })
        );
      });
    });

    it('triggers search callback with server action state', async () => {
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      const region = withinRenderedRoot(view);
      fireEvent.change(region.getByLabelText('Search query'), {
        target: { value: 'skywalker' },
      });
      fireEvent.click(region.getByRole('button', { name: 'Search' }));
      await waitFor(() => {
        expect(onSearchComplete).toHaveBeenCalledTimes(1);
        expect(onSearchComplete).toHaveBeenCalledWith(
          expect.objectContaining({
            query: { term: 'skywalker', page: 1 },
            data: expect.objectContaining({
              results: expect.any(Array),
            }),
          })
        );
      });
    });
  });

  describe('localStorage integration', () => {
    it('retrieves saved search term on component mount', () => {
      localStorage.setItem(storageKey, 'from-storage');
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      expect(withinRenderedRoot(view).getByLabelText('Search query')).toHaveValue(
        'from-storage'
      );
    });

    it('overwrites existing localStorage value when new search is performed', async () => {
      localStorage.setItem(storageKey, 'first');
      const onSearchComplete = vi.fn();
      const onSearchInputChange = vi.fn();
      const view = render(
        <SearchSection
          initialSearchTerm=""
          onSearchComplete={onSearchComplete}
          onSearchInputChange={onSearchInputChange}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getByLabelText('Search query')).toHaveValue('first');
      fireEvent.change(region.getByLabelText('Search query'), {
        target: { value: 'second' },
      });
      fireEvent.click(region.getByRole('button', { name: 'Search' }));
      expect(localStorage.getItem(storageKey)).toBe('second');
      await waitFor(() => {
        expect(onSearchComplete).toHaveBeenCalledWith(
          expect.objectContaining({
            query: { term: 'second', page: 1 },
          })
        );
      });
    });
  });
});

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    pageSize: 10,
    fetchPeople: vi.fn(async () => emptyPeopleList()),
    fetchPerson: vi.fn(),
  },
}));
