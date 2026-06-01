import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { getQueryCacheTtlSeconds } from '../config/queryCacheTtl';
import type {
  PeopleListQueryArg,
  PeopleListQueryResult,
  SwapiPerson,
  SwapiQueryError,
} from '../types/swapiApi';
import { SwapiPersonResultMapper } from '../utils/mapSwapiPersonToResult';

const cacheTtlSeconds = getQueryCacheTtlSeconds();

function toQueryError(reason: unknown): SwapiQueryError {
  const message =
    reason instanceof Error ? reason.message : 'SWAPI_UNKNOWN';
  return { status: 'CUSTOM_ERROR', error: message };
}

function peopleListTagId(arg: PeopleListQueryArg): string {
  return `${arg.term.trim()}-${arg.page < 1 ? 1 : arg.page}`;
}

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['PeopleList', 'Person'],
  keepUnusedDataFor: cacheTtlSeconds,
  refetchOnMountOrArgChange: cacheTtlSeconds,
  endpoints: (builder) => ({
    getPeople: builder.query<PeopleListQueryResult, PeopleListQueryArg>({
      queryFn: async (arg) => {
        try {
          const data = await SwapiPeopleApi.fetchPeople(arg.term, arg.page);
          const results = data.results.map((person) =>
            SwapiPersonResultMapper.toItem(person)
          );
          return {
            data: {
              results,
              listHasNext: data.next !== null,
              listHasPrev: data.previous !== null,
              listTotalCount: data.count,
            },
          };
        } catch (reason: unknown) {
          return { error: toQueryError(reason) };
        }
      },
      providesTags: (_result, _error, arg) => [
        { type: 'PeopleList', id: peopleListTagId(arg) },
        { type: 'PeopleList', id: 'LIST' },
      ],
    }),
    getPerson: builder.query<SwapiPerson, string>({
      queryFn: async (personId) => {
        try {
          const data = await SwapiPeopleApi.fetchPerson(personId);
          return { data };
        } catch (reason: unknown) {
          return { error: toQueryError(reason) };
        }
      },
      providesTags: (_result, _error, personId) => [
        { type: 'Person', id: personId },
        { type: 'Person', id: 'DETAIL' },
      ],
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = swapiApi;
