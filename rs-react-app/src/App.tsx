import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { SwapiPeopleApi } from './api/fetchSwapiPeople';
import { SwapiPersonResultMapper } from './utils/mapSwapiPersonToResult';
import { SearchTermStorage } from './storage/searchTermStorage';
import { AppFetchErrorMessage } from './utils/AppFetchErrorMessage';
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
  const [state, setState] = useState<AppState>(initialAppState);
  const stateRef = useRef(state);
  stateRef.current = state;
  const lastSuccessfulFetchRef = useRef<{ term: string; page: number } | null>(
    null
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
    []
  );

  useEffect(() => {
    void fetchAndSetResults(SearchTermStorage.read(), {
      skipIfUnchanged: false,
      page: 1,
    });
  }, [fetchAndSetResults]);

  const handleSearch = useCallback(
    async (trimmedTerm: string): Promise<void> => {
      await fetchAndSetResults(trimmedTerm, {
        skipIfUnchanged: true,
        page: 1,
      });
    },
    [fetchAndSetResults]
  );

  const handlePageNext = useCallback((): void => {
    const { listPage, listHasNext, lastFetchedTerm } = stateRef.current;
    if (!listHasNext || lastFetchedTerm !== '') {
      return;
    }
    void fetchAndSetResults('', {
      skipIfUnchanged: false,
      page: listPage + 1,
    });
  }, [fetchAndSetResults]);

  const handlePagePrev = useCallback((): void => {
    const { listPage, listHasPrev, lastFetchedTerm } = stateRef.current;
    if (!listHasPrev || lastFetchedTerm !== '') {
      return;
    }
    void fetchAndSetResults('', {
      skipIfUnchanged: false,
      page: listPage - 1,
    });
  }, [fetchAndSetResults]);

  const handleSimulateError = (): void => {
    setState((prev) => ({ ...prev, simulateCrash: true }));
  };

  const {
    results,
    hasSearched,
    isLoading,
    errorMessage,
    lastFetchedTerm,
    listPage,
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
    errorMessage === null &&
    lastFetchedTerm === '' &&
    (listHasNext || listHasPrev);

  return (
    <div className="app">
      <SearchSection onSearch={handleSearch} />
      <ResultsSection
        items={results}
        hasSearched={hasSearched}
        isLoading={isLoading}
        errorMessage={errorMessage}
        pagination={
          showPagination
            ? {
                page: listPage,
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
