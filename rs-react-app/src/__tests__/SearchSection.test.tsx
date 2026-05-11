import { render, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SearchSection } from '../components/SearchSection';
import { SearchTermStorage } from '../storage/searchTermStorage';
import { withinRenderedRoot } from './withinRenderedRoot';

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
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      const region = withinRenderedRoot(view);
      expect(region.getByLabelText('Search query')).toBeInTheDocument();
      expect(region.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('displays previously saved search term from localStorage on mount', () => {
      localStorage.setItem(storageKey, 'stored-value');
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      expect(withinRenderedRoot(view).getByLabelText('Search query')).toHaveValue(
        'stored-value'
      );
    });

    it('shows empty input when no saved term exists', () => {
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      expect(withinRenderedRoot(view).getByLabelText('Search query')).toHaveValue(
        ''
      );
    });
  });

  describe('user interaction', () => {
    it('updates input value when user types', () => {
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      const input = withinRenderedRoot(view).getByLabelText('Search query');
      fireEvent.change(input, { target: { value: 'typed value' } });
      expect(input).toHaveValue('typed value');
    });

    it('saves search term to localStorage when search button is clicked', () => {
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      const region = withinRenderedRoot(view);
      fireEvent.change(region.getByLabelText('Search query'), {
        target: { value: 'persisted' },
      });
      fireEvent.click(region.getByRole('button', { name: 'Search' }));
      expect(localStorage.getItem(storageKey)).toBe('persisted');
      expect(onSearch).toHaveBeenCalledWith('persisted');
    });

    it('trims whitespace from search input before saving', () => {
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      const region = withinRenderedRoot(view);
      fireEvent.change(region.getByLabelText('Search query'), {
        target: { value: '  trimmed term  ' },
      });
      fireEvent.click(region.getByRole('button', { name: 'Search' }));
      expect(localStorage.getItem(storageKey)).toBe('trimmed term');
      expect(onSearch).toHaveBeenCalledWith('trimmed term');
    });

    it('triggers search callback with correct parameters', () => {
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      const region = withinRenderedRoot(view);
      fireEvent.change(region.getByLabelText('Search query'), {
        target: { value: 'skywalker' },
      });
      fireEvent.click(region.getByRole('button', { name: 'Search' }));
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith('skywalker');
    });
  });

  describe('localStorage integration', () => {
    it('retrieves saved search term on component mount', () => {
      localStorage.setItem(storageKey, 'from-storage');
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      expect(withinRenderedRoot(view).getByLabelText('Search query')).toHaveValue(
        'from-storage'
      );
    });

    it('overwrites existing localStorage value when new search is performed', () => {
      localStorage.setItem(storageKey, 'first');
      const onSearch = vi.fn();
      const view = render(<SearchSection onSearch={onSearch} />);
      const region = withinRenderedRoot(view);
      expect(region.getByLabelText('Search query')).toHaveValue('first');
      fireEvent.change(region.getByLabelText('Search query'), {
        target: { value: 'second' },
      });
      fireEvent.click(region.getByRole('button', { name: 'Search' }));
      expect(localStorage.getItem(storageKey)).toBe('second');
      expect(onSearch).toHaveBeenCalledWith('second');
    });
  });
});
