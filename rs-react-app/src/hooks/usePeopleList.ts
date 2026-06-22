import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QUERY_PARAMS, SWAPI_PAGE_SIZE } from '../constants';
import { invalidatePeopleListCache } from '../store';
import { useGetPeopleQuery } from '../store/swapiApi';
import { SearchTermStorage } from '../storage/searchTermStorage';
import type { AppState, PeopleListQueryArg } from '../types';
import { parsePageParam } from '../utils/parsePageParam';
import { rtkQueryErrorMessage } from '../utils/rtkQueryErrorMessage';

type UsePeopleListOptions = {
  searchParams: URLSearchParams;
  pageInUrl: number;
  isDetailsOpen: boolean;
  updatePageInUrl: (page: number, options?: { clearDetails?: boolean }) => void;
  closeDetails: () => void;
};

function pageFromSearchParams(searchParams: URLSearchParams): number {
  return searchParams.has(QUERY_PARAMS.page)
    ? parsePageParam(searchParams.get(QUERY_PARAMS.page))
    : 1;
}

export function usePeopleList({
  searchParams,
  pageInUrl,
  isDetailsOpen,
  updatePageInUrl,
  closeDetails,
}: UsePeopleListOptions) {
  const [listTerm, setListTerm] = useState(() => SearchTermStorage.read());
  const [simulateCrash, setSimulateCrash] = useState(false);
  const homeMountHandledRef = useRef(false);

  const listQuery: PeopleListQueryArg = useMemo(
    () => ({
      term: listTerm,
      page: pageFromSearchParams(searchParams),
    }),
    [listTerm, searchParams]
  );

  const {
    data,
    currentData,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetPeopleQuery(listQuery);

  const hasSearched = isSuccess || isError;
  const listData = isError ? undefined : (data ?? currentData);
  const isListLoading = isLoading && listData === undefined;
  const isListFetching = !isError && isFetching && listData !== undefined;

  useEffect(() => {
    if (homeMountHandledRef.current) {
      return;
    }
    homeMountHandledRef.current = true;
    const page = pageFromSearchParams(searchParams);
    if (!searchParams.has(QUERY_PARAMS.page)) {
      updatePageInUrl(page);
    }
  }, [searchParams, updatePageInUrl]);

  const handleSearchInputChange = useCallback(() => {
    if (isDetailsOpen) {
      closeDetails();
    }
  }, [closeDetails, isDetailsOpen]);

  const handleSearch = useCallback(
    async (trimmedTerm: string): Promise<void> => {
      if (isDetailsOpen) {
        closeDetails();
      }
      if (pageInUrl !== 1) {
        updatePageInUrl(1, { clearDetails: true });
      }
      setListTerm(trimmedTerm);
    },
    [closeDetails, isDetailsOpen, pageInUrl, updatePageInUrl]
  );

  const listTotalCount = listData?.listTotalCount ?? 0;
  const totalPages =
    listTotalCount > 0
      ? Math.ceil(listTotalCount / SWAPI_PAGE_SIZE)
      : 0;
  const listPage = listQuery.page;
  const listHasNext = totalPages > 0 && listPage < totalPages;
  const listHasPrev = listPage > 1;

  const triggerSimulatedCrash = useCallback((): void => {
    setSimulateCrash(true);
  }, []);

  const handleRefreshList = useCallback((): void => {
    invalidatePeopleListCache();
  }, []);

  const state: AppState = {
    results: listData?.results ?? [],
    hasSearched,
    lastFetchedTerm: listTerm,
    isLoading: isListLoading,
    isFetching: isListFetching,
    errorMessage: isError ? rtkQueryErrorMessage(error) : null,
    listPage,
    listHasNext,
    listHasPrev,
    listTotalCount,
    simulateCrash,
  };

  return {
    state,
    handleSearchInputChange,
    handleSearch,
    handleRefreshList,
    triggerSimulatedCrash,
  };
}
