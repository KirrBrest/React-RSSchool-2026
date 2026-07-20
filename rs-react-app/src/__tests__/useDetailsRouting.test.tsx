import { act, render } from '@testing-library/react';
import { Suspense } from 'react';
import { describe, it, expect } from 'vitest';
import { QUERY_PARAMS } from '../constants';
import { useDetailsRouting } from '../hooks/useDetailsRouting';
import {
  getNavigationState,
  setNavigationState,
} from './nextNavigationMock';

function renderDetailsRouting(initialEntry: string) {
  let routing!: ReturnType<typeof useDetailsRouting>;

  function HookHost() {
    routing = useDetailsRouting();
    return null;
  }

  const [pathname, search = ''] = initialEntry.split('?');
  setNavigationState(pathname === '' ? '/' : pathname, search === '' ? '' : `?${search}`);

  render(
    <Suspense fallback={null}>
      <HookHost />
    </Suspense>
  );

  return {
    get result() {
      return routing;
    },
  };
}

describe('useDetailsRouting', () => {
  it('does nothing when closeDetails is called while the panel is closed', () => {
    const { result } = renderDetailsRouting('/?page=1');

    act(() => {
      result.closeDetails();
    });

    expect(getNavigationState().pathname).toBe('/');
    expect(getNavigationState().search).toBe('?page=1');
  });

  it('clears details from the URL when updating the page with clearDetails', () => {
    const { result } = renderDetailsRouting('/details?page=2&details=1');

    act(() => {
      result.updatePageInUrl(3, { clearDetails: true });
    });

    expect(getNavigationState().pathname).toBe('/');
    expect(getNavigationState().search).toBe(`?${QUERY_PARAMS.page}=3`);
  });

  it('redirects home when details param is removed on the details route', () => {
    renderDetailsRouting('/details?page=1');

    expect(getNavigationState().pathname).toBe('/');
    expect(getNavigationState().search).toBe('?page=1');
  });
});
