import { useCallback, useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { QUERY_PARAMS } from '../constants';
import {
  closeDetailsLocation,
  detailsPanelLocation,
  homeLocationWithSearch,
  openDetailsLocation,
} from '../utils/detailsNavigation';
import { extractPersonId, parseDetailsParam } from '../utils/extractPersonId';
import { parsePageParam } from '../utils/parsePageParam';

export function useDetailsRouting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pageInUrl = parsePageParam(searchParams.get(QUERY_PARAMS.page));
  const selectedDetailsId = parseDetailsParam(searchParams.get('details'));
  const isDetailsOpen = location.pathname === '/details';

  const updatePageInUrl = useCallback(
    (page: number, options?: { clearDetails?: boolean }) => {
      const clearDetails = options?.clearDetails === true;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(QUERY_PARAMS.page, String(page));
          if (clearDetails) {
            next.delete('details');
          }
          return next;
        },
        { replace: true }
      );
      if (clearDetails && location.pathname === '/details') {
        const next = new URLSearchParams(searchParams);
        next.set(QUERY_PARAMS.page, String(page));
        navigate(closeDetailsLocation(next), { replace: true });
      }
    },
    [setSearchParams, location.pathname, navigate, searchParams]
  );

  const openDetails = useCallback(
    (personRef: string): void => {
      const id = extractPersonId(personRef);
      navigate(openDetailsLocation(searchParams, id), { replace: false });
    },
    [navigate, searchParams]
  );

  const closeDetails = useCallback((): void => {
    if (!isDetailsOpen) {
      return;
    }
    navigate(closeDetailsLocation(searchParams), { replace: true });
  }, [isDetailsOpen, navigate, searchParams]);

  useEffect(() => {
    const details = parseDetailsParam(searchParams.get('details'));
    if (details !== null && location.pathname === '/') {
      navigate(detailsPanelLocation(searchParams), { replace: true });
    }
    if (details === null && location.pathname === '/details') {
      navigate(homeLocationWithSearch(searchParams), { replace: true });
    }
  }, [location.pathname, navigate, searchParams]);

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
