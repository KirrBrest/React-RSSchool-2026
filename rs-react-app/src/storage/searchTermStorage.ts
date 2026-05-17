const storageKey = 'swapi-explorer-search-term';

function read(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw === null) {
      return '';
    }
    return raw.trim();
  } catch {
    return '';
  }
}

function write(term: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  const normalized = term.trim();
  try {
    if (normalized === '') {
      window.localStorage.removeItem(storageKey);
    } else {
      window.localStorage.setItem(storageKey, normalized);
    }
  } catch {
    return;
  }
}

export const SearchTermStorage = {
  storageKey,
  read,
  write,
};
