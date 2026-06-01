import type { PersonResultItem } from './person';
import type { SwapiPerson } from './swapi';

export type PeopleListQueryArg = {
  term: string;
  page: number;
};

export type PeopleListQueryResult = {
  results: PersonResultItem[];
  listHasNext: boolean;
  listHasPrev: boolean;
  listTotalCount: number;
};

export type SwapiQueryError = {
  status: 'CUSTOM_ERROR';
  error: string;
};

export type { SwapiPerson };
