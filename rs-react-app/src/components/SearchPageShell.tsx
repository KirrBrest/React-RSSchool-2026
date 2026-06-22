'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { useTranslations } from 'next-intl';
import { SearchSection } from '@/components/SearchSection';
import { ResultsSection } from '@/components/ResultsSection';
import { useDetailsRouting } from '@/hooks/useDetailsRouting';
import { usePeopleList } from '@/hooks/usePeopleList';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { SearchTermStorage } from '@/storage/searchTermStorage';
import { swapiApi } from '@/store/swapiApi';
import type { PeopleListQueryArg } from '@/types/swapiApi';
import type { PeopleListQueryResult } from '@/types/swapiApi';
import { SearchResultsLayout } from '@/views/SearchResultsLayout';
import { PersonDetailsPanel } from '@/views/PersonDetailsPanel';
import '@/App.css';

type SearchPageShellProps = {
  children: ReactNode;
  initialQuery: PeopleListQueryArg;
  initialResult: PeopleListQueryResult | null;
  initialError: string | null;
};

function queriesMatch(
  left: PeopleListQueryArg,
  right: PeopleListQueryArg
): boolean {
  return left.term.trim() === right.term.trim() && left.page === right.page;
}

export function SearchPageShell({
  children,
  initialQuery,
  initialResult,
  initialError,
}: SearchPageShellProps) {
  const t = useTranslations('SearchPage');
  const dispatch = useAppDispatch();
  const [forceInteractive, setForceInteractive] = useState(false);
  const {
    pageInUrl,
    selectedDetailsId,
    isDetailsOpen: isDetailsRouteOpen,
    searchParams,
    updatePageInUrl,
    closeDetails,
  } = useDetailsRouting();

  const {
    state,
    handleSearchInputChange,
    handleSearch,
    handleRefreshList,
    triggerSimulatedCrash,
  } = usePeopleList({
    searchParams,
    pageInUrl,
    isDetailsOpen: isDetailsRouteOpen,
    updatePageInUrl,
    closeDetails,
  });

  useEffect(() => {
    if (initialResult !== null) {
      dispatch(
        swapiApi.util.upsertQueryData('getPeople', initialQuery, initialResult)
      );
    }
  }, [dispatch, initialQuery, initialResult]);

  const enableInteractiveResults = useCallback((): void => {
    setForceInteractive(true);
  }, []);

  const useInteractiveResults = useMemo(() => {
    if (forceInteractive) {
      return true;
    }

    const storedTerm = SearchTermStorage.read();
    if (storedTerm !== initialQuery.term.trim()) {
      return true;
    }

    const currentQuery: PeopleListQueryArg = {
      term: state.lastFetchedTerm ?? '',
      page: state.listPage,
    };

    return !queriesMatch(currentQuery, initialQuery);
  }, [
    forceInteractive,
    initialQuery,
    state.lastFetchedTerm,
    state.listPage,
  ]);

  const handleSearchSubmit = useCallback(
    async (trimmedTerm: string): Promise<void> => {
      enableInteractiveResults();
      await handleSearch(trimmedTerm);
    },
    [enableInteractiveResults, handleSearch]
  );

  const handleRefresh = useCallback((): void => {
    enableInteractiveResults();
    handleRefreshList();
  }, [enableInteractiveResults, handleRefreshList]);

  const handleMainPanelClick = useCallback((): void => {
    if (isDetailsRouteOpen) {
      closeDetails();
    }
  }, [closeDetails, isDetailsRouteOpen]);

  const handleDetailsPanelClick = useCallback(
    (event: MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
    },
    []
  );

  if (state.simulateCrash) {
    throw new Error('Simulated application error (error boundary test)');
  }

  const showPagination =
    state.hasSearched &&
    !state.isLoading &&
    state.errorMessage === null &&
    (state.listHasNext || state.listHasPrev);

  const interactiveBody = (
    <SearchResultsLayout
      isDetailsOpen={isDetailsRouteOpen}
      master={
        <ResultsSection
          items={state.results}
          hasSearched={state.hasSearched}
          isLoading={state.isLoading}
          isFetching={state.isFetching}
          errorMessage={state.errorMessage}
          onRefresh={state.hasSearched ? handleRefresh : null}
          isRefreshDisabled={state.isLoading || state.isFetching}
          pagination={
            showPagination
              ? {
                  page: state.listPage,
                  totalCount: state.listTotalCount,
                  hasNext: state.listHasNext,
                  hasPrev: state.listHasPrev,
                }
              : null
          }
          selectedItemId={selectedDetailsId}
          onMainPanelClick={handleMainPanelClick}
        />
      }
      details={
        isDetailsRouteOpen ? (
          <div onClick={handleDetailsPanelClick}>
            <PersonDetailsPanel />
          </div>
        ) : null
      }
    />
  );

  const shouldUseServerResults =
    !useInteractiveResults &&
    (initialResult !== null || initialError !== null);

  return (
    <div className="app">
      <SearchSection
        onSearch={handleSearchSubmit}
        onSearchInputChange={handleSearchInputChange}
      />
      {shouldUseServerResults ? children : interactiveBody}
      <div className="app__error-test">
        <button
          type="button"
          className="app__error-test-button"
          onClick={triggerSimulatedCrash}
        >
          {t('simulateError')}
        </button>
      </div>
    </div>
  );
}
