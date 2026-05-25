import { describe, it, expect, beforeEach } from 'vitest';
import { HomeListSnapshot } from '../storage/homeListSnapshot';
import type { PersonResultItem } from '../types';

const luke: PersonResultItem = {
  id: '1',
  name: 'Luke Skywalker',
  description: 'Gender: male',
};

describe('HomeListSnapshot', () => {
  beforeEach(() => {
    HomeListSnapshot.clear();
  });

  it('returns null when no snapshot is stored', () => {
    expect(HomeListSnapshot.readMatching('', 1)).toBeNull();
  });

  it('returns null when term or page does not match', () => {
    HomeListSnapshot.save({
      term: 'sky',
      page: 2,
      results: [luke],
      listHasNext: true,
      listHasPrev: true,
      listTotalCount: 20,
    });

    expect(HomeListSnapshot.readMatching('sky', 1)).toBeNull();
    expect(HomeListSnapshot.readMatching('', 2)).toBeNull();
  });

  it('returns a matching snapshot and clears it', () => {
    const snapshot = {
      term: 'sky',
      page: 2,
      results: [luke],
      listHasNext: false,
      listHasPrev: true,
      listTotalCount: 12,
    };
    HomeListSnapshot.save(snapshot);

    expect(HomeListSnapshot.readMatching('sky', 2)).toEqual(snapshot);

    HomeListSnapshot.clear();
    expect(HomeListSnapshot.readMatching('sky', 2)).toBeNull();
  });
});
