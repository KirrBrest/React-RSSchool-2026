import type { HomeListSnapshot as HomeListSnapshotData } from '../types';

let snapshot: HomeListSnapshotData | null = null;

function save(data: HomeListSnapshotData): void {
  snapshot = data;
}

function readMatching(term: string, page: number): HomeListSnapshotData | null {
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
