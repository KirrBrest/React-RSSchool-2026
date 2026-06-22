import { render, type RenderOptions } from '@testing-library/react';
import { Suspense, type ReactNode } from 'react';
import { SelectedItemsFlyout } from '../components/SelectedItemsFlyout';
import { ThemeProvider } from '../context/ThemeProvider';
import { SearchPage } from '../components/SearchPage';
import { PersonDetailsPanel } from '../views/PersonDetailsPanel';
import { ReduxProvider } from '../store/ReduxProvider';
import { clearSelected } from '../store/selectedItemsSlice';
import { resetSwapiApiState, store } from '../store';
import { getNavigationState, setNavigationState } from './nextNavigationMock';

export function resetStoreState(): void {
  store.dispatch(clearSelected());
  resetSwapiApiState();
}

import { IntlTestProvider } from './IntlTestProvider';

function renderWithProviders(
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(
    <IntlTestProvider>
      <ReduxProvider>
        <ThemeProvider>{ui}</ThemeProvider>
      </ReduxProvider>
    </IntlTestProvider>,
    options
  );
}

function createMockRouter() {
  return {
    state: {
      get location() {
        const navigation = getNavigationState();
        return {
          pathname: navigation.pathname,
          search: navigation.search,
        };
      },
    },
  };
}

function renderAppShell(content: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) {
  return renderWithProviders(
    <div className="app-shell">
      <div className="app-shell__content">{content}</div>
      <SelectedItemsFlyout />
    </div>,
    options
  );
}

export function renderSearchPage(
  initialPath = '/?page=1',
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const [pathname, search = ''] = initialPath.split('?');
  setNavigationState(pathname === '' ? '/' : pathname, search === '' ? '' : `?${search}`);

  const view = renderAppShell(
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>,
    options
  );

  return { view, router: createMockRouter() };
}

export function renderWithRouter(
  initialPath = '/?page=1',
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return renderSearchPage(initialPath, options);
}

export function renderWithAppRoutes(
  initialPath: string,
  appElement: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const [pathname, search = ''] = initialPath.split('?');
  setNavigationState(pathname === '' ? '/' : pathname, search === '' ? '' : `?${search}`);

  const isDetailsRoute = pathname === '/details';

  const view = renderAppShell(
    <Suspense fallback={null}>
      {appElement}
      {isDetailsRoute ? <PersonDetailsPanel /> : null}
    </Suspense>,
    options
  );

  return { view, router: createMockRouter() };
}
