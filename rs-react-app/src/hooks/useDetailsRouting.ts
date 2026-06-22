'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { QUERY_PARAMS } from '../constants';
import {
  closeDetailsLocation,
  detailsPanelLocation,
  homeLocationWithSearch,
  openDetailsLocation,
} from '../utils/detailsNavigation';
import { buildSearchParamsString } from '../utils/buildSearchParamsString';
import { extractPersonId, parseDetailsParam } from '../utils/extractPersonId';
import { parsePageParam } from '../utils/parsePageParam';

function toUrlSearchParams(params: { toString(): string }): URLSearchParams {
  return new URLSearchParams(params.toString());
}

function toAppUrl(location: { pathname: string; search: string }): string {
  return `${location.pathname}${location.search}`;
}

export function useDetailsRouting() {
  const router = useRouter();
  const pathname = usePathname();
  const readonlySearchParams = useSearchParams();
  const searchParams = useMemo(
    () => toUrlSearchParams(readonlySearchParams),
    [readonlySearchParams]
  );

  const pageInUrl = parsePageParam(readonlySearchParams.get(QUERY_PARAMS.page));
  const selectedDetailsId = parseDetailsParam(readonlySearchParams.get('details'));
  const isDetailsOpen = pathname === '/details';

  const updatePageInUrl = useCallback(
    (page: number, options?: { clearDetails?: boolean }) => {
      const clearDetails = options?.clearDetails === true;
      const next = toUrlSearchParams(readonlySearchParams);
      next.set(QUERY_PARAMS.page, String(page));
      if (clearDetails) {
        next.delete('details');
      }

      if (clearDetails && pathname === '/details') {
        router.replace(toAppUrl(closeDetailsLocation(next)));
        return;
      }

      router.replace(`${pathname}${buildSearchParamsString(next)}`);
    },
    [pathname, readonlySearchParams, router]
  );

  const openDetails = useCallback(
    (personRef: string): void => {
      const id = extractPersonId(personRef);
      router.push(toAppUrl(openDetailsLocation(toUrlSearchParams(readonlySearchParams), id)));
    },
    [readonlySearchParams, router]
  );

  const closeDetails = useCallback((): void => {
    if (!isDetailsOpen) {
      return;
    }
    router.replace(toAppUrl(closeDetailsLocation(toUrlSearchParams(readonlySearchParams))));
  }, [isDetailsOpen, readonlySearchParams, router]);

  useEffect(() => {
    const details = parseDetailsParam(readonlySearchParams.get('details'));
    const currentSearchParams = toUrlSearchParams(readonlySearchParams);

    if (details !== null && pathname === '/') {
      router.replace(toAppUrl(detailsPanelLocation(currentSearchParams)));
    }

    if (details === null && pathname === '/details') {
      router.replace(toAppUrl(homeLocationWithSearch(currentSearchParams)));
    }
  }, [pathname, readonlySearchParams, router]);

  return {
    pageInUrl,
    selectedDetailsId,
    isDetailsOpen,
    searchParams,
    updatePageInUrl,
    openDetails,
    closeDetails,
  };
}
