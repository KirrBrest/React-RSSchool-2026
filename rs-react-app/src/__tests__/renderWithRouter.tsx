import { render, type RenderOptions } from '@testing-library/react';
import { Suspense, type ReactNode } from 'react';
import { SelectedItemsFlyout } from '../components/SelectedItemsFlyout';
import { AppNav } from '../components/AppNav';
import { ThemeProvider } from '../context/ThemeProvider';
import { SearchPageShell } from '../components/SearchPageShell';
import { ReduxProvider } from '../store/ReduxProvider';
import { clearSelected } from '../store/selectedItemsSlice';
import { resetSwapiApiState, store } from '../store';
import { getNavigationState, setNavigationState } from './nextNavigationMock';
import { SearchPageTestHarness } from './SearchPageTestHarness';
import { IntlTestProvider } from './IntlTestProvider';

export function resetStoreState(): void {
  store.dispatch(clearSelected());
  resetSwapiApiState();
}

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
    <div className="router">
      <AppNav />
      <div className="router__content">{content}</div>
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
      <SearchPageTestHarness />
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

  const view = renderAppShell(
    <Suspense fallback={null}>
      {appElement}
    </Suspense>,
    options
  );

  return { view, router: createMockRouter() };
}

export function renderSearchPageShell(
  props: {
    initialQuery: { term: string; page: number };
    initialResult: import('../types/swapiApi').PeopleListQueryResult | null;
    initialError: string | null;
    selectedDetailsId?: string | null;
    children?: ReactNode;
  },
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const view = renderAppShell(
    <Suspense fallback={null}>
      <SearchPageShell
        initialQuery={props.initialQuery}
        initialResult={props.initialResult}
        initialError={props.initialError}
        selectedDetailsId={props.selectedDetailsId ?? null}
      >
        {props.children ?? <div />}
      </SearchPageShell>
    </Suspense>,
    options
  );

  return { view, router: createMockRouter() };
}
