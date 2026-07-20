'use client';

import {
  useActionState,
  useCallback,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from 'react';
import { useTranslations } from 'next-intl';
import {
  refreshPeopleListAction,
  type SearchPeopleActionState,
} from '@/actions/searchPeople';
import { SearchSection } from '@/components/SearchSection';
import { ResultsSection } from '@/components/ResultsSection';
import { QUERY_PARAMS, SWAPI_PAGE_SIZE } from '@/constants';
import { useDetailsRouting } from '@/hooks/useDetailsRouting';
import { useRouter } from '@/i18n/navigation';
import { buildAppPath } from '@/utils/appNavigation';
import type { PeopleListQueryArg } from '@/types/swapiApi';
import type { PeopleListQueryResult } from '@/types/swapiApi';
import { SearchResultsLayout } from '@/views/SearchResultsLayout';
import '@/App.css';

type SearchPageShellProps = {
  children: ReactNode;
  initialQuery: PeopleListQueryArg;
  initialResult: PeopleListQueryResult | null;
  initialError: string | null;
  selectedDetailsId: string | null;
};

function queriesMatch(
  left: PeopleListQueryArg,
  right: PeopleListQueryArg
): boolean {
  return left.term.trim() === right.term.trim() && left.page === right.page;
}

function resolveActionResults(
  actionResults: SearchPeopleActionState | null,
  initialQuery: PeopleListQueryArg,
  pendingSearchQuery: PeopleListQueryArg | null
): SearchPeopleActionState | null {
  if (actionResults === null) {
    return null;
  }

  if (pendingSearchQuery !== null) {
    return actionResults;
  }

  if (!queriesMatch(actionResults.query, initialQuery)) {
    return null;
  }

  return actionResults;
}

export function SearchPageShell({
  children,
  initialQuery,
  initialResult,
  initialError,
  selectedDetailsId,
}: SearchPageShellProps) {
  const t = useTranslations('SearchPage');
  const router = useRouter();
  const [simulateCrash, setSimulateCrash] = useState(false);
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [actionResults, setActionResults] =
    useState<SearchPeopleActionState | null>(null);
  const [pendingSearchQuery, setPendingSearchQuery] =
    useState<PeopleListQueryArg | null>(null);
  const [refreshState, refreshAction, isRefreshPending] = useActionState<
    SearchPeopleActionState | null,
    FormData
  >(refreshPeopleListAction, null);
  const [, startRefreshTransition] = useTransition();
  const {
    selectedDetailsId: routedDetailsId,
    isDetailsOpen: isDetailsRouteOpen,
    closeDetails,
  } = useDetailsRouting();

  const syncedPendingSearchQuery =
    pendingSearchQuery !== null &&
    queriesMatch(pendingSearchQuery, initialQuery)
      ? null
      : pendingSearchQuery;

  const resolvedActionResults = useMemo(
    () =>
      resolveActionResults(
        actionResults,
        initialQuery,
        syncedPendingSearchQuery
      ),
    [actionResults, initialQuery, syncedPendingSearchQuery]
  );

  const activeQuery =
    resolvedActionResults?.query ?? refreshState?.query ?? initialQuery;
  const activeResult =
    resolvedActionResults?.data ?? refreshState?.data ?? initialResult;
  const activeError =
    resolvedActionResults?.errorMessage ??
    refreshState?.errorMessage ??
    initialError;

  const handleSearchComplete = useCallback(
    (state: SearchPeopleActionState): void => {
      setPendingSearchQuery(state.query);
      setActionResults(state);

      const params = new URLSearchParams();
      if (state.query.term.trim() !== '') {
        params.set(QUERY_PARAMS.search, state.query.term.trim());
      }
      params.set(QUERY_PARAMS.page, String(state.query.page));
      router.replace(buildAppPath('/', params));
    },
    [router]
  );

  const handleSearchInputChange = useCallback((): void => {
    if (isDetailsRouteOpen) {
      closeDetails();
    }
  }, [closeDetails, isDetailsRouteOpen]);

  const handleRefresh = useCallback((): void => {
    const formData = new FormData();
    formData.set(QUERY_PARAMS.search, activeQuery.term.trim());
    formData.set(QUERY_PARAMS.page, String(activeQuery.page));
    startRefreshTransition(() => {
      refreshAction(formData);
    });
  }, [activeQuery.page, activeQuery.term, refreshAction, startRefreshTransition]);

  const handleMainPanelClick = useCallback((): void => {
    if (isDetailsRouteOpen) {
      closeDetails();
    }
  }, [closeDetails, isDetailsRouteOpen]);

  if (simulateCrash) {
    throw new Error('Simulated application error (error boundary test)');
  }

  const listTotalCount = activeResult?.listTotalCount ?? 0;
  const totalPages =
    listTotalCount > 0 ? Math.ceil(listTotalCount / SWAPI_PAGE_SIZE) : 0;
  const listPage = activeQuery.page;
  const listHasNext = totalPages > 0 && listPage < totalPages;
  const listHasPrev = listPage > 1;
  const showPagination =
    activeError === null &&
    activeResult !== null &&
    (listHasNext || listHasPrev);

  const useActionDrivenBody =
    !isDetailsRouteOpen &&
    (resolvedActionResults !== null ||
      refreshState !== null ||
      isSearchPending ||
      isRefreshPending);

  const actionDrivenBody = (
    <SearchResultsLayout
      isDetailsOpen={isDetailsRouteOpen}
      master={
        <ResultsSection
          items={activeResult?.results ?? []}
          hasSearched
          isLoading={isSearchPending || isRefreshPending}
          isFetching={false}
          errorMessage={activeError}
          onRefresh={handleRefresh}
          isRefreshDisabled={isRefreshPending}
          pagination={
            showPagination
              ? {
                  page: listPage,
                  totalCount: listTotalCount,
                  hasNext: listHasNext,
                  hasPrev: listHasPrev,
                }
              : null
          }
          selectedItemId={routedDetailsId ?? selectedDetailsId}
          onMainPanelClick={handleMainPanelClick}
        />
      }
      details={null}
    />
  );

  return (
    <div className="app">
      <SearchSection
        initialSearchTerm={initialQuery.term}
        onSearchComplete={handleSearchComplete}
        onSearchInputChange={handleSearchInputChange}
        onSearchPendingChange={setIsSearchPending}
      />
      {useActionDrivenBody ? actionDrivenBody : children}
      <div className="app__error-test">
        <button
          type="button"
          className="app__error-test-button"
          onClick={() => setSimulateCrash(true)}
        >
          {t('simulateError')}
        </button>
      </div>
    </div>
  );
}
