import { QUERY_PARAMS } from '../constants';
import { buildSearchParamsString } from './buildSearchParamsString';
import { openDetailsLocation } from './detailsNavigation';
import { extractPersonId } from './extractPersonId';

export function buildAppPath(
  pathname: string,
  searchParams: URLSearchParams
): string {
  return `${pathname}${buildSearchParamsString(searchParams)}`;
}

export function buildPagePath(
  pathname: string,
  searchParams: URLSearchParams,
  page: number
): string {
  const next = new URLSearchParams(searchParams);
  next.set(QUERY_PARAMS.page, String(page));
  return buildAppPath(pathname, next);
}

export function buildDetailsPath(
  searchParams: URLSearchParams,
  personRef: string
): string {
  const { pathname, search } = openDetailsLocation(
    new URLSearchParams(searchParams),
    extractPersonId(personRef)
  );

  return `${pathname}${search}`;
}
