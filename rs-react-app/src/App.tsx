import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AppNav } from './components/AppNav';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { SwapiPeopleApi } from './api/fetchSwapiPeople';
import { SwapiPersonResultMapper } from './utils/mapSwapiPersonToResult';
import { SearchTermStorage } from './storage/searchTermStorage';
import { HomeListSnapshot } from './storage/homeListSnapshot';
import { AppFetchErrorMessage } from './utils/AppFetchErrorMessage';
import { parsePageParam } from './utils/parsePageParam';
import { buildSearchParamsString } from './utils/buildSearchParamsString';
import {
  extractPersonId,
  parseDetailsParam,
} from './utils/extractPersonId';
import { QUERY_PARAMS } from './constants';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<AppState>(initialAppState);
  const stateRef = useRef(state);
  stateRef.current = state;
  const lastSuccessfulFetchRef = useRef<{ term: string; page: number } | null>(
    null
  );
  const homeMountHandledRef = useRef(false);
  const pageInUrl = parsePageParam(searchParams.get(QUERY_PARAMS.page));
  const selectedDetailsId = parseDetailsParam(
    searchParams.get('details')
  );
  const isDetailsOpen = location.pathname === '/details';

  const updatePageInUrl = useCallback(
    (page: number, options?: { clearDetails?: boolean }) => {
      const clearDetails = options?.clearDetails === true;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(QUERY_PARAMS.page, String(page));
          if (clearDetails) {
            next.delete('details');
          }
          return next;
        },
        { replace: true }
      );
      if (clearDetails && location.pathname === '/details') {
        const next = new URLSearchParams(searchParams);
        next.set(QUERY_PARAMS.page, String(page));
        next.delete('details');
        navigate(
          { pathname: '/', search: buildSearchParamsString(next) },
          { replace: true }
        );
      }
    },
    [setSearchParams, location.pathname, navigate, searchParams]
  );

  const openDetails = useCallback(
    (personRef: string): void => {
      const id = extractPersonId(personRef);
      const next = new URLSearchParams(searchParams);
      next.set('details', id);
      if (!next.has(QUERY_PARAMS.page)) {
        next.set(QUERY_PARAMS.page, '1');
      }
      navigate(
        { pathname: '/details', search: buildSearchParamsString(next) },
        { replace: false }
      );
    },
    [navigate, searchParams]
  );

  const closeDetails = useCallback((): void => {
    if (!isDetailsOpen) {
      return;
    }
    const next = new URLSearchParams(searchParams);
    next.delete('details');
    navigate(
      { pathname: '/', search: buildSearchParamsString(next) },
      { replace: true }
    );
  }, [isDetailsOpen, navigate, searchParams]);

  useEffect(() => {
    const details = parseDetailsParam(searchParams.get('details'));
    if (details !== null && location.pathname === '/') {
      navigate(
        { pathname: '/details', search: buildSearchParamsString(searchParams) },
        { replace: true }
      );
    }
    if (details === null && location.pathname === '/details') {
      const next = new URLSearchParams(searchParams);
      navigate(
        { pathname: '/', search: buildSearchParamsString(next) },
        { replace: true }
      );
    }
  }, [location.pathname, navigate, searchParams]);

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
        const results = data.results.map((person) =>
          SwapiPersonResultMapper.toItem(person)
        );
        const listHasNext = data.next !== null;
        const listHasPrev = data.previous !== null;
        HomeListSnapshot.save({
          term: trimmedTerm,
          page,
          results,
          listHasNext,
          listHasPrev,
          listTotalCount: data.count,
        });
        updatePageInUrl(page);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          hasSearched: true,
          errorMessage: null,
          results,
          lastFetchedTerm: trimmedTerm,
          listPage: page,
          listHasNext,
          listHasPrev,
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
    [updatePageInUrl]
  );

  useEffect(() => {
    if (homeMountHandledRef.current) {
      return;
    }
    homeMountHandledRef.current = true;
    const term = SearchTermStorage.read();
    const page = searchParams.has(QUERY_PARAMS.page)
      ? parsePageParam(searchParams.get(QUERY_PARAMS.page))
      : 1;
    if (!searchParams.has(QUERY_PARAMS.page)) {
      updatePageInUrl(page);
    }
    const cachedList = HomeListSnapshot.readMatching(term, page);
    if (cachedList !== null) {
      lastSuccessfulFetchRef.current = { term, page };
      setState((prev) => ({
        ...prev,
        isLoading: false,
        hasSearched: true,
        errorMessage: null,
        results: cachedList.results,
        lastFetchedTerm: term,
        listPage: page,
        listHasNext: cachedList.listHasNext,
        listHasPrev: cachedList.listHasPrev,
        listTotalCount: cachedList.listTotalCount,
      }));
      return;
    }
    void fetchAndSetResults(term, {
      skipIfUnchanged: false,
      page,
    });
  }, [fetchAndSetResults, updatePageInUrl, searchParams]);

  useEffect(() => {
    const page = parsePageParam(searchParams.get(QUERY_PARAMS.page));
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
    if (isDetailsOpen) {
      closeDetails();
    }
    if (parsePageParam(searchParams.get(QUERY_PARAMS.page)) === 1) {
      return;
    }
    updatePageInUrl(1, { clearDetails: true });
  }, [closeDetails, isDetailsOpen, searchParams, updatePageInUrl]);

  const handleSearch = useCallback(
    async (trimmedTerm: string): Promise<void> => {
      if (isDetailsOpen) {
        closeDetails();
      }
      if (pageInUrl !== 1) {
        updatePageInUrl(1, { clearDetails: true });
      }
      await fetchAndSetResults(trimmedTerm, {
        skipIfUnchanged: true,
        page: 1,
      });
    },
    [closeDetails, fetchAndSetResults, isDetailsOpen, pageInUrl, updatePageInUrl]
  );

  const handlePageNext = useCallback((): void => {
    const { listPage, listHasNext } = stateRef.current;
    if (!listHasNext) {
      return;
    }
    updatePageInUrl(listPage + 1, { clearDetails: true });
  }, [updatePageInUrl]);

  const handlePagePrev = useCallback((): void => {
    const { listPage, listHasPrev } = stateRef.current;
    if (!listHasPrev) {
      return;
    }
    updatePageInUrl(listPage - 1, { clearDetails: true });
  }, [updatePageInUrl]);

  const handleSimulateError = (): void => {
    setState((prev) => ({ ...prev, simulateCrash: true }));
  };

  const handleMainPanelClick = useCallback((): void => {
    if (isDetailsOpen) {
      closeDetails();
    }
  }, [closeDetails, isDetailsOpen]);

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
      <div
        className={
          isDetailsOpen
            ? 'app__split app__split--open'
            : 'app__split'
        }
      >
        <div className="app__master">
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
            selectedItemId={selectedDetailsId}
            onItemSelect={openDetails}
            onMainPanelClick={handleMainPanelClick}
          />
        </div>
        {isDetailsOpen && (
          <aside className="app__detail" onClick={(event) => event.stopPropagation()}>
            <Outlet />
          </aside>
        )}
      </div>
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
