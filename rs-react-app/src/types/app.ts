import type { PersonResultItem } from './person';

export type AppState = {
  results: PersonResultItem[];
  hasSearched: boolean;
  lastFetchedTerm: string | null;
  isLoading: boolean;
  errorMessage: string | null;
  listPage: number;
  listHasNext: boolean;
  listHasPrev: boolean;
  listTotalCount: number;
  simulateCrash: boolean;
};

export type FetchOptions = {
  skipIfUnchanged: boolean;
  page?: number;
};
