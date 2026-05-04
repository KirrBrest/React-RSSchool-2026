export const SEARCH_TERM_STORAGE_KEY = 'swapi-explorer-search-term';

export function readStoredSearchTerm(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  try {
    const raw = window.localStorage.getItem(SEARCH_TERM_STORAGE_KEY);
    if (raw === null) {
      return '';
    }
    return raw.trim();
  } catch {
    return '';
  }
}

export function writeStoredSearchTerm(term: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  const normalized = term.trim();
  try {
    if (normalized === '') {
      window.localStorage.removeItem(SEARCH_TERM_STORAGE_KEY);
    } else {
      window.localStorage.setItem(SEARCH_TERM_STORAGE_KEY, normalized);
    }
  } catch {
    return;
  }
}
