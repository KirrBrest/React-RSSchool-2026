import { SWAPI_PAGE_SIZE } from '../constants';
import type { PeopleListQueryResult } from '../types/swapiApi';
import type { PeoplePaginationProps } from '../types';

export function buildPeopleListPagination(
  data: PeopleListQueryResult | null,
  page: number
): PeoplePaginationProps | null {
  if (data === null) {
    return null;
  }

  const totalPages =
    data.listTotalCount > 0
      ? Math.ceil(data.listTotalCount / SWAPI_PAGE_SIZE)
      : 0;

  if (totalPages === 0 && !data.listHasNext && !data.listHasPrev) {
    return null;
  }

  return {
    page,
    totalCount: data.listTotalCount,
    hasNext: totalPages > 0 && page < totalPages,
    hasPrev: page > 1,
  };
}
