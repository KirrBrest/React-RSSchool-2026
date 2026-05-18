import { render, type RenderOptions } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import type { ReactNode } from 'react';
import App from '../App';
import { PersonDetailsPanel } from '../pages/PersonDetailsPanel';

export const appHomeRoute: RouteObject = {
  path: '/',
  element: <App />,
  children: [{ path: 'details', element: <PersonDetailsPanel /> }],
};

export function createAppMemoryRouter(initialEntries: string[]) {
  return createMemoryRouter([appHomeRoute], { initialEntries });
}

export function renderWithRouter(
  initialPath = '/?page=1',
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const router = createAppMemoryRouter([initialPath]);
  const view = render(<RouterProvider router={router} />, options);
  return { view, router };
}

export function renderWithAppRoutes(
  initialPath: string,
  appElement: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: appElement,
        children: [{ path: 'details', element: <PersonDetailsPanel /> }],
      },
    ],
    { initialEntries: [initialPath] }
  );
  const view = render(<RouterProvider router={router} />, options);
  return { view, router };
}
