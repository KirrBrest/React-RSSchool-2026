import type { SwapiPeopleListResponse } from '../types';

export function emptyPeopleList(): SwapiPeopleListResponse {
  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
}
