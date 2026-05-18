import type { PersonResultItem } from './person';

export type HomeListSnapshot = {
  term: string;
  page: number;
  results: PersonResultItem[];
  listHasNext: boolean;
  listHasPrev: boolean;
  listTotalCount: number;
};
