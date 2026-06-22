import { useCallback, useState } from 'react';
import { SearchTermStorage } from '../storage/searchTermStorage';

export function useSearchTermStorage(initialSearchTerm = '') {
  const [searchTerm, setSearchTerm] = useState(() => {
    const fromUrl = initialSearchTerm.trim();
    if (fromUrl !== '') {
      return fromUrl;
    }
    return SearchTermStorage.read();
  });

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
