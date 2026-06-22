'use server';

import { QUERY_PARAMS } from '@/constants';
import { fetchInitialPeopleList } from '@/utils/fetchInitialPeopleList';
import { parsePageParam } from '@/utils/parsePageParam';
import type { PeopleListQueryArg, PeopleListQueryResult } from '@/types/swapiApi';

export type SearchPeopleActionState = {
  query: PeopleListQueryArg;
  data: PeopleListQueryResult | null;
  errorMessage: string | null;
};

export async function searchPeopleAction(
  _previousState: SearchPeopleActionState | null,
  formData: FormData
): Promise<SearchPeopleActionState> {
  const term = String(formData.get('search-query') ?? '').trim();
  const query: PeopleListQueryArg = { term, page: 1 };
  const result = await fetchInitialPeopleList(query);

  return {
    query,
    data: result.data,
    errorMessage: result.errorMessage,
  };
}

export async function refreshPeopleListAction(
  _previousState: SearchPeopleActionState | null,
  formData: FormData
): Promise<SearchPeopleActionState> {
  const term = String(formData.get(QUERY_PARAMS.search) ?? '').trim();
  const page = parsePageParam(String(formData.get(QUERY_PARAMS.page) ?? '1'));
  const query: PeopleListQueryArg = { term, page };
  const result = await fetchInitialPeopleList(query);

  return {
    query,
    data: result.data,
    errorMessage: result.errorMessage,
  };
}
