import type { PersonResultItem } from './person';

export type AppState = {
  results: PersonResultItem[];
  hasSearched: boolean;
  lastFetchedTerm: string | null;
  isLoading: boolean;
  isFetching: boolean;
  errorMessage: string | null;
  listPage: number;
  listHasNext: boolean;
  listHasPrev: boolean;
  listTotalCount: number;
  simulateCrash: boolean;
};
