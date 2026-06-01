import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QUERY_PARAMS } from '../constants';
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
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetPeopleQuery(listQuery);

  const hasSearched = isSuccess || isError;

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

  const handlePageStep = useCallback(
    (step: 1 | -1): void => {
      const listHasNext = data?.listHasNext ?? false;
      const listHasPrev = data?.listHasPrev ?? false;
      const canStep = step === 1 ? listHasNext : listHasPrev;
      if (!canStep) {
        return;
      }
      updatePageInUrl(listQuery.page + step);
    },
    [data?.listHasNext, data?.listHasPrev, listQuery.page, updatePageInUrl]
  );

  const handlePageNext = useCallback((): void => {
    handlePageStep(1);
  }, [handlePageStep]);

  const handlePagePrev = useCallback((): void => {
    handlePageStep(-1);
  }, [handlePageStep]);

  const triggerSimulatedCrash = useCallback((): void => {
    setSimulateCrash(true);
  }, []);

  const state: AppState = {
    results: data?.results ?? [],
    hasSearched,
    lastFetchedTerm: listTerm,
    isLoading: isLoading || isFetching,
    errorMessage: isError ? rtkQueryErrorMessage(error) : null,
    listPage: listQuery.page,
    listHasNext: data?.listHasNext ?? false,
    listHasPrev: data?.listHasPrev ?? false,
    listTotalCount: data?.listTotalCount ?? 0,
    simulateCrash,
  };

  return {
    state,
    handleSearchInputChange,
    handleSearch,
    handlePageNext,
    handlePagePrev,
    triggerSimulatedCrash,
  };
}
