import type { PersonResultItem } from '../types';

export type HomeListSnapshot = {
  term: string;
  page: number;
  results: PersonResultItem[];
  listHasNext: boolean;
  listHasPrev: boolean;
  listTotalCount: number;
};

let snapshot: HomeListSnapshot | null = null;

function save(data: HomeListSnapshot): void {
  snapshot = data;
}

function readMatching(term: string, page: number): HomeListSnapshot | null {
  if (snapshot === null) {
    return null;
  }
  if (snapshot.term !== term || snapshot.page !== page) {
    return null;
  }
  return snapshot;
}

function clear(): void {
  snapshot = null;
}

export const HomeListSnapshot = {
  save,
  readMatching,
  clear,
};
