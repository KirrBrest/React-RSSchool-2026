import { describe, it, expect } from 'vitest';
import { buildDetailsPath, buildPagePath } from '../utils/appNavigation';

describe('appNavigation', () => {
  it('builds a localized details path from current search params', () => {
    expect(
      buildDetailsPath(new URLSearchParams('page=2'), 'https://swapi.py4e.com/api/people/1/')
    ).toBe('/details?page=2&details=1');
  });

  it('builds a page path for the current route', () => {
    expect(buildPagePath('/', new URLSearchParams('page=1'), 2)).toBe('/?page=2');
    expect(
      buildPagePath('/details', new URLSearchParams('page=1&details=1'), 2)
    ).toBe('/details?page=2&details=1');
  });
});
