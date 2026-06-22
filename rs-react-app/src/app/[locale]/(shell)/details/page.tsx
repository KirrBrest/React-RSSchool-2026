import { setRequestLocale } from 'next-intl/server';
import { SearchPageShell } from '@/components/SearchPageShell';
import {
  buildSearchResultsServerBody,
  getSearchRouteInitialState,
} from '@/views/searchRouteServerModel';

type DetailsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DetailsPage({
  params,
  searchParams,
}: DetailsPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  setRequestLocale(locale);

  const initialState = await getSearchRouteInitialState(resolvedSearchParams);
  const serverBody = buildSearchResultsServerBody({
    isDetailsOpen: true,
    initialState,
  });

  return (
    <SearchPageShell
      initialQuery={initialState.initialQuery}
      initialResult={initialState.initialFetch.data}
      initialError={initialState.initialFetch.errorMessage}
    >
      {serverBody}
    </SearchPageShell>
  );
}
