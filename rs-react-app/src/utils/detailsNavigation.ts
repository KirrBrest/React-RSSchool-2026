import { QUERY_PARAMS } from '../constants';
import { buildSearchParamsString } from './buildSearchParamsString';

export type AppLocationTarget = {
  pathname: string;
  search: string;
};

export function searchParamsWithoutDetails(
  params: URLSearchParams
): URLSearchParams {
  const next = new URLSearchParams(params);
  next.delete('details');
  return next;
}

export function closeDetailsLocation(
  params: URLSearchParams
): AppLocationTarget {
  return {
    pathname: '/',
    search: buildSearchParamsString(searchParamsWithoutDetails(params)),
  };
}

export function openDetailsLocation(
  params: URLSearchParams,
  personId: string
): AppLocationTarget {
  const next = new URLSearchParams(params);
  next.set('details', personId);
  if (!next.has(QUERY_PARAMS.page)) {
    next.set(QUERY_PARAMS.page, '1');
  }
  return {
    pathname: '/details',
    search: buildSearchParamsString(next),
  };
}

export function detailsPanelLocation(
  params: URLSearchParams
): AppLocationTarget {
  return {
    pathname: '/details',
    search: buildSearchParamsString(params),
  };
}

export function homeLocationWithSearch(
  params: URLSearchParams
): AppLocationTarget {
  return {
    pathname: '/',
    search: buildSearchParamsString(new URLSearchParams(params)),
  };
}
