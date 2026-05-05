export class SearchTermStorage {
  static readonly storageKey = 'swapi-explorer-search-term';

  static read(): string {
    if (typeof window === 'undefined') {
      return '';
    }
    try {
      const raw = window.localStorage.getItem(SearchTermStorage.storageKey);
      if (raw === null) {
        return '';
      }
      return raw.trim();
    } catch {
      return '';
    }
  }

  static write(term: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    const normalized = term.trim();
    try {
      if (normalized === '') {
        window.localStorage.removeItem(SearchTermStorage.storageKey);
      } else {
        window.localStorage.setItem(SearchTermStorage.storageKey, normalized);
      }
    } catch {
      return;
    }
  }
}
