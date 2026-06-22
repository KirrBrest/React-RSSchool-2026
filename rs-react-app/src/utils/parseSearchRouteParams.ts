import { QUERY_PARAMS } from '../constants';
import { parseDetailsParam } from './extractPersonId';
import { parsePageParam } from './parsePageParam';

function readParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
): string | null {
  const value = searchParams[key];
  if (value === undefined) {
    return null;
  }
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

export type SearchRouteParams = {
  page: number;
  detailsId: string | null;
};

export function parseSearchRouteParams(
  searchParams: Record<string, string | string[] | undefined>
): SearchRouteParams {
  return {
    page: parsePageParam(readParam(searchParams, QUERY_PARAMS.page)),
    detailsId: parseDetailsParam(readParam(searchParams, 'details')),
  };
}
