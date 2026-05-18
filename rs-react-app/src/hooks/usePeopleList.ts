import { useCallback, useEffect, useRef, useState } from 'react';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { QUERY_PARAMS } from '../constants';
import { HomeListSnapshot } from '../storage/homeListSnapshot';
import { SearchTermStorage } from '../storage/searchTermStorage';
import type { AppState, FetchOptions } from '../types';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
import { parsePageParam } from '../utils/parsePageParam';
import { SwapiPersonResultMapper } from '../utils/mapSwapiPersonToResult';

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

type UsePeopleListOptions = {
  searchParams: URLSearchParams;
  pageInUrl: number;
  isDetailsOpen: boolean;
  updatePageInUrl: (page: number, options?: { clearDetails?: boolean }) => void;
  closeDetails: () => void;
};

export function usePeopleList({
  searchParams,
  pageInUrl,
  isDetailsOpen,
  updatePageInUrl,
  closeDetails,
}: UsePeopleListOptions) {
  const [state, setState] = useState<AppState>(initialAppState);
  const stateRef = useRef(state);
  stateRef.current = state;
  const lastSuccessfulFetchRef = useRef<{ term: string; page: number } | null>(
    null
  );
  const homeMountHandledRef = useRef(false);

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

  const triggerSimulatedCrash = useCallback((): void => {
    setState((prev) => ({ ...prev, simulateCrash: true }));
  }, []);

  return {
    state,
    handleSearchInputChange,
    handleSearch,
    handlePageNext,
    handlePagePrev,
    triggerSimulatedCrash,
  };
}
