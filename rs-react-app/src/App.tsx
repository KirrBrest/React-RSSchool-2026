import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppNav } from './components/AppNav';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { SwapiPeopleApi } from './api/fetchSwapiPeople';
import { SwapiPersonResultMapper } from './utils/mapSwapiPersonToResult';
import { SearchTermStorage } from './storage/searchTermStorage';
import { AppFetchErrorMessage } from './utils/AppFetchErrorMessage';
import { parsePageParam } from './utils/parsePageParam';
import type { AppState, FetchOptions } from './types';
import './App.css';

const initialAppState: AppState = {
  results: [],
  hasSearched: false,
  lastFetchedTerm: null,
  isLoading: true,
  errorMessage: null,
  listPage: 1,
  listHasNext: false,
  listHasPrev: false,
  listTotalCount: 0,
  simulateCrash: false,
};

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<AppState>(initialAppState);
  const stateRef = useRef(state);
  stateRef.current = state;
  const lastSuccessfulFetchRef = useRef<{ term: string; page: number } | null>(
    null
  );
  const initialLoadDoneRef = useRef(false);

  const pageInUrl = parsePageParam(searchParams.get('page'));

  const syncPageInUrl = useCallback(
    (page: number) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('page', String(page));
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const fetchAndSetResults = useCallback(
    async (trimmedTerm: string, options: FetchOptions): Promise<void> => {
      const page = options.page ?? 1;
      const lastFetch = lastSuccessfulFetchRef.current;
      if (
        options.skipIfUnchanged &&
        lastFetch !== null &&
        trimmedTerm === lastFetch.term &&
        page === lastFetch.page
      ) {
        return;
      }
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const data = await SwapiPeopleApi.fetchPeople(trimmedTerm, page);
        lastSuccessfulFetchRef.current = { term: trimmedTerm, page };
        syncPageInUrl(page);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          hasSearched: true,
          errorMessage: null,
          results: data.results.map((person) =>
            SwapiPersonResultMapper.toItem(person)
          ),
          lastFetchedTerm: trimmedTerm,
          listPage: page,
          listHasNext: data.next !== null,
          listHasPrev: data.previous !== null,
          listTotalCount: data.count,
        }));
      } catch (reason: unknown) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          hasSearched: true,
          errorMessage: AppFetchErrorMessage.fromUnknown(reason),
          results: [],
          listHasNext: false,
          listHasPrev: false,
        }));
      }
    },
    [syncPageInUrl]
  );

  useEffect(() => {
    if (initialLoadDoneRef.current) {
      return;
    }
    initialLoadDoneRef.current = true;
    const page = searchParams.has('page')
      ? parsePageParam(searchParams.get('page'))
      : 1;
    if (!searchParams.has('page')) {
      syncPageInUrl(1);
    }
    void fetchAndSetResults(SearchTermStorage.read(), {
      skipIfUnchanged: false,
      page,
    });
  }, [fetchAndSetResults, searchParams, syncPageInUrl]);

  useEffect(() => {
    if (!initialLoadDoneRef.current) {
      return;
    }
    const page = parsePageParam(searchParams.get('page'));
    const { listPage, lastFetchedTerm, isLoading } = stateRef.current;
    if (isLoading || page === listPage) {
      return;
    }
    void fetchAndSetResults(lastFetchedTerm ?? '', {
      skipIfUnchanged: false,
      page,
    });
  }, [searchParams, fetchAndSetResults]);

  const handleSearchInputChange = useCallback(() => {
    if (parsePageParam(searchParams.get('page')) === 1) {
      return;
    }
    syncPageInUrl(1);
  }, [searchParams, syncPageInUrl]);

  const handleSearch = useCallback(
    async (trimmedTerm: string): Promise<void> => {
      if (pageInUrl !== 1) {
        syncPageInUrl(1);
      }
      await fetchAndSetResults(trimmedTerm, {
        skipIfUnchanged: true,
        page: 1,
      });
    },
    [fetchAndSetResults, pageInUrl, syncPageInUrl]
  );

  const handlePageNext = useCallback((): void => {
    const { listPage, listHasNext } = stateRef.current;
    if (!listHasNext) {
      return;
    }
    syncPageInUrl(listPage + 1);
  }, [syncPageInUrl]);

  const handlePagePrev = useCallback((): void => {
    const { listPage, listHasPrev } = stateRef.current;
    if (!listHasPrev) {
      return;
    }
    syncPageInUrl(listPage - 1);
  }, [syncPageInUrl]);

  const handleSimulateError = (): void => {
    setState((prev) => ({ ...prev, simulateCrash: true }));
  };

  const {
    results,
    hasSearched,
    isLoading,
    errorMessage,
    listHasNext,
    listHasPrev,
    listTotalCount,
    simulateCrash,
  } = state;

  if (simulateCrash) {
    throw new Error('Simulated application error (error boundary test)');
  }

  const showPagination =
    hasSearched &&
    !isLoading &&
    errorMessage === null &&
    (listHasNext || listHasPrev);

  return (
    <div className="app">
      <AppNav />
      <SearchSection
        onSearch={handleSearch}
        onSearchInputChange={handleSearchInputChange}
      />
      <ResultsSection
        items={results}
        hasSearched={hasSearched}
        isLoading={isLoading}
        errorMessage={errorMessage}
        pagination={
          showPagination
            ? {
                page: pageInUrl,
                totalCount: listTotalCount,
                hasNext: listHasNext,
                hasPrev: listHasPrev,
                onNext: handlePageNext,
                onPrev: handlePagePrev,
              }
            : null
        }
      />
      <div className="app__error-test">
        <button
          type="button"
          className="app__error-test-button"
          onClick={handleSimulateError}
        >
          Simulate error
        </button>
      </div>
    </div>
  );
}
