import { useCallback, useState } from 'react';
import { SearchTermStorage } from '../storage/searchTermStorage';

export function useSearchTermStorage() {
  const [searchTerm, setSearchTerm] = useState(() => SearchTermStorage.read());

  const persistSearchTerm = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (trimmed !== SearchTermStorage.read()) {
      SearchTermStorage.write(trimmed);
    }
    return trimmed;
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    persistSearchTerm,
  };
}
