import { act, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { QUERY_PARAMS } from '../constants';
import { useDetailsRouting } from '../hooks/useDetailsRouting';

function renderDetailsRouting(initialEntry: string) {
  let routing!: ReturnType<typeof useDetailsRouting>;

  function HookHost() {
    routing = useDetailsRouting();
    return null;
  }

  const router = createMemoryRouter(
    [{ path: '*', element: <HookHost /> }],
    { initialEntries: [initialEntry] }
  );

  render(<RouterProvider router={router} />);

  return {
    router,
    get result() {
      return routing;
    },
  };
}

describe('useDetailsRouting', () => {
  it('does nothing when closeDetails is called while the panel is closed', () => {
    const { router, result } = renderDetailsRouting('/?page=1');

    act(() => {
      result.closeDetails();
    });

    expect(router.state.location.pathname).toBe('/');
    expect(router.state.location.search).toBe('?page=1');
  });

  it('clears details from the URL when updating the page with clearDetails', () => {
    const { router, result } = renderDetailsRouting('/details?page=2&details=1');

    act(() => {
      result.updatePageInUrl(3, { clearDetails: true });
    });

    expect(router.state.location.pathname).toBe('/');
    expect(router.state.location.search).toBe(`?${QUERY_PARAMS.page}=3`);
  });

  it('redirects home when details param is removed on the details route', () => {
    const { router } = renderDetailsRouting('/details?page=1');

    expect(router.state.location.pathname).toBe('/');
    expect(router.state.location.search).toBe('?page=1');
  });
});
