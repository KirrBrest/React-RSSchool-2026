import type { PersonResultItem } from './person';

export type HomeListSnapshotData = {
  term: string;
  page: number;
  results: PersonResultItem[];
  listHasNext: boolean;
  listHasPrev: boolean;
  listTotalCount: number;
};
