import type { ReactNode } from 'react';
import type { PeopleListQueryArg } from '@/types/swapiApi';
import { buildPeopleListPagination } from '@/utils/buildPeopleListPagination';
import { fetchInitialPeopleList } from '@/utils/fetchInitialPeopleList';
import type { InitialPeopleListFetchResult } from '@/utils/fetchInitialPeopleList';
import { parseSearchRouteParams, type SearchRouteParams } from '@/utils/parseSearchRouteParams';
import { SearchResultsLayout } from '@/views/SearchResultsLayout';
import { SearchResultsList } from '@/views/SearchResultsList';
import { PersonDetailsPanel } from '@/views/PersonDetailsPanel';

export type SearchRouteInitialState = {
  initialQuery: PeopleListQueryArg;
  initialFetch: InitialPeopleListFetchResult;
  routeParams: SearchRouteParams;
};

export async function getSearchRouteInitialState(
  searchParams: Record<string, string | string[] | undefined>
): Promise<SearchRouteInitialState> {
  const routeParams = parseSearchRouteParams(searchParams);
  const initialQuery: PeopleListQueryArg = {
    term: '',
    page: routeParams.page,
  };
  const initialFetch = await fetchInitialPeopleList(initialQuery);

  return {
    initialQuery,
    initialFetch,
    routeParams,
  };
}

type BuildSearchResultsBodyOptions = {
  isDetailsOpen: boolean;
  initialState: SearchRouteInitialState;
};

export function buildSearchResultsServerBody({
  isDetailsOpen,
  initialState,
}: BuildSearchResultsBodyOptions): ReactNode {
  const { initialFetch, routeParams, initialQuery } = initialState;
  const pagination = buildPeopleListPagination(
    initialFetch.data,
    initialQuery.page
  );

  return (
    <SearchResultsLayout
      isDetailsOpen={isDetailsOpen}
      master={
        <SearchResultsList
          items={initialFetch.data?.results ?? []}
          hasSearched
          errorMessage={initialFetch.errorMessage}
          pagination={pagination}
          selectedItemId={routeParams.detailsId}
        />
      }
      details={isDetailsOpen ? <PersonDetailsPanel /> : null}
    />
  );
}
