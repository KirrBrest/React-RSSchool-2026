'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/i18n/navigation';
import { SearchPageShell } from '@/components/SearchPageShell';
import { PersonDetailsPanelShell } from '@/components/PersonDetailsPanelShell';
import { ResultsSection } from '@/components/ResultsSection';
import { SearchResultsLayout } from '@/views/SearchResultsLayout';
import { buildPeopleListPagination } from '@/utils/buildPeopleListPagination';
import { fetchInitialPeopleList } from '@/utils/fetchInitialPeopleList';
import { parseSearchRouteParams } from '@/utils/parseSearchRouteParams';
import type { PeopleListQueryArg } from '@/types/swapiApi';
import type { InitialPeopleListFetchResult } from '@/utils/fetchInitialPeopleList';
import type { SearchRouteParams } from '@/utils/parseSearchRouteParams';
import { TestPersonDetailsContent } from './TestPersonDetailsContent';

type ServerSnapshot = {
  initialQuery: PeopleListQueryArg;
  initialFetch: InitialPeopleListFetchResult;
  routeParams: SearchRouteParams;
};

function buildServerBody(
  isDetailsOpen: boolean,
  snapshot: ServerSnapshot,
  isLoading: boolean
): ReactNode {
  const { initialFetch, routeParams, initialQuery } = snapshot;
  const pagination = buildPeopleListPagination(
    initialFetch.data,
    initialQuery.page
  );

  return (
    <SearchResultsLayout
      isDetailsOpen={isDetailsOpen}
      master={
        <ResultsSection
          items={initialFetch.data?.results ?? []}
          hasSearched
          isLoading={isLoading}
          isFetching={false}
          errorMessage={initialFetch.errorMessage}
          onRefresh={null}
          isRefreshDisabled
          pagination={isLoading ? null : pagination}
          selectedItemId={routeParams.detailsId}
          onMainPanelClick={() => {}}
        />
      }
      details={
        isDetailsOpen && routeParams.detailsId !== null ? (
          <PersonDetailsPanelShell personId={routeParams.detailsId}>
            <TestPersonDetailsContent personId={routeParams.detailsId} />
          </PersonDetailsPanelShell>
        ) : null
      }
    />
  );
}

export function SearchPageTestHarness() {
  const pathname = usePathname();
  const readonlySearchParams = useSearchParams();
  const [snapshot, setSnapshot] = useState<ServerSnapshot | null>(null);
  const [loadedSearchKey, setLoadedSearchKey] = useState<string | null>(null);
  const routeParams = useMemo(
    () =>
      parseSearchRouteParams(
        Object.fromEntries(readonlySearchParams.entries())
      ),
    [readonlySearchParams]
  );
  const pendingQuery = useMemo(
    (): PeopleListQueryArg => ({
      term: routeParams.searchTerm,
      page: routeParams.page,
    }),
    [routeParams.page, routeParams.searchTerm]
  );
  const searchKey = useMemo(
    () => `${pathname}?${readonlySearchParams.toString()}`,
    [pathname, readonlySearchParams]
  );

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      const initialFetch = await fetchInitialPeopleList(pendingQuery);

      if (!cancelled) {
        setSnapshot({
          initialQuery: pendingQuery,
          initialFetch,
          routeParams,
        });
        setLoadedSearchKey(searchKey);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [pendingQuery, routeParams, searchKey]);

  const isDetailsOpen = pathname === '/details';
  const isServerLoading = loadedSearchKey !== searchKey;
  const activeSnapshot: ServerSnapshot =
    snapshot ?? {
      initialQuery: pendingQuery,
      initialFetch: { data: null, errorMessage: null },
      routeParams,
    };
  const serverBody = buildServerBody(
    isDetailsOpen,
    activeSnapshot,
    isServerLoading
  );
  const shellInitialResult = isServerLoading
    ? null
    : activeSnapshot.initialFetch.data;

  return (
    <SearchPageShell
      initialQuery={pendingQuery}
      initialResult={shellInitialResult}
      initialError={
        isServerLoading ? null : activeSnapshot.initialFetch.errorMessage
      }
      selectedDetailsId={routeParams.detailsId}
    >
      {serverBody}
    </SearchPageShell>
  );
}
