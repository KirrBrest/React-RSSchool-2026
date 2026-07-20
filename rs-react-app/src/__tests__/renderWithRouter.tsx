import { render, type RenderOptions } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import type { ReactNode } from 'react';
import App from '../App';
import { PersonDetailsPanel } from '../pages/PersonDetailsPanel';
import { AppRoutes } from '../routes/AppRoutes';
import { ReduxProvider } from '../store/ReduxProvider';
import { ThemeProvider } from '../context/ThemeProvider';
import { store } from '../store';
import { clearSelected } from '../store/selectedItemsSlice';

export const appHomeRoute: RouteObject = {
  path: '/',
  element: <App />,
  children: [{ path: 'details', element: <PersonDetailsPanel /> }],
};

export function resetStoreState(): void {
  store.dispatch(clearSelected());
}

export function createAppMemoryRouter(initialEntries: string[]) {
  return createMemoryRouter(
    [{ path: '*', element: <AppRoutes /> }],
    { initialEntries }
  );
}

function renderWithProviders(
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(
    <ReduxProvider>
      <ThemeProvider>{ui}</ThemeProvider>
    </ReduxProvider>,
    options
  );
}

export function renderWithRouter(
  initialPath = '/?page=1',
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const router = createAppMemoryRouter([initialPath]);
  const view = renderWithProviders(<RouterProvider router={router} />, options);
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
  const view = renderWithProviders(<RouterProvider router={router} />, options);
  return { view, router };
}
