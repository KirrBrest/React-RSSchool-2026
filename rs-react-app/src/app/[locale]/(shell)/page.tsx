import { setRequestLocale } from 'next-intl/server';
import { SearchPageShell } from '@/components/SearchPageShell';
import {
  buildSearchResultsServerBody,
  getSearchRouteInitialState,
} from '@/views/searchRouteServerModel';

type HomePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ params, searchParams }: HomePageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  setRequestLocale(locale);

  const initialState = await getSearchRouteInitialState(resolvedSearchParams);
  const serverBody = buildSearchResultsServerBody({
    isDetailsOpen: false,
    initialState,
  });

  return (
    <SearchPageShell
      initialQuery={initialState.initialQuery}
      initialResult={initialState.initialFetch.data}
      initialError={initialState.initialFetch.errorMessage}
      selectedDetailsId={initialState.routeParams.detailsId}
    >
      {serverBody}
    </SearchPageShell>
  );
}
