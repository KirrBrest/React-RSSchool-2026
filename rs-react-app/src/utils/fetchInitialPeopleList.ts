import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import type { PeopleListQueryArg, PeopleListQueryResult } from '../types/swapiApi';
import { SwapiPersonResultMapper } from './mapSwapiPersonToResult';
import { rtkQueryErrorMessage } from './rtkQueryErrorMessage';

export type InitialPeopleListFetchResult = {
  data: PeopleListQueryResult | null;
  errorMessage: string | null;
};

export async function fetchInitialPeopleList(
  query: PeopleListQueryArg
): Promise<InitialPeopleListFetchResult> {
  try {
    const response = await SwapiPeopleApi.fetchPeople(query.term, query.page);
    const results = response.results.map((person) =>
      SwapiPersonResultMapper.toItem(person)
    );

    return {
      data: {
        results,
        listHasNext: response.next !== null,
        listHasPrev: response.previous !== null,
        listTotalCount: response.count,
      },
      errorMessage: null,
    };
  } catch (reason: unknown) {
    return {
      data: null,
      errorMessage: rtkQueryErrorMessage(reason),
    };
  }
}
