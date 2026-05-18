import { describe, it, expect } from 'vitest';
import {
  closeDetailsLocation,
  openDetailsLocation,
  detailsPanelLocation,
  homeLocationWithSearch,
  searchParamsWithoutDetails,
} from '../utils/detailsNavigation';

describe('detailsNavigation', () => {
  it('removes details from search params', () => {
    const params = new URLSearchParams('page=2&details=1');
    const next = searchParamsWithoutDetails(params);
    expect(next.get('page')).toBe('2');
    expect(next.has('details')).toBe(false);
  });

  it('builds close details location', () => {
    const params = new URLSearchParams('page=1&details=3');
    expect(closeDetailsLocation(params)).toEqual({
      pathname: '/',
      search: '?page=1',
    });
  });

  it('builds open details location and ensures page param', () => {
    expect(openDetailsLocation(new URLSearchParams(), '5')).toEqual({
      pathname: '/details',
      search: '?details=5&page=1',
    });
  });

  it('builds details panel location preserving search', () => {
    const params = new URLSearchParams('page=2&details=1');
    expect(detailsPanelLocation(params)).toEqual({
      pathname: '/details',
      search: '?page=2&details=1',
    });
  });

  it('builds home location keeping other search params', () => {
    const params = new URLSearchParams('page=2&details=bad');
    expect(homeLocationWithSearch(params)).toEqual({
      pathname: '/',
      search: '?page=2&details=bad',
    });
  });
});
