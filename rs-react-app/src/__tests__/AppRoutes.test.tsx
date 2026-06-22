import { render, screen, cleanup } from '@testing-library/react';
import { Suspense } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AboutPage } from '../views/AboutPage';
import { NotFoundPage } from '../views/NotFoundPage';
import { ReduxProvider } from '../store/ReduxProvider';
import { ThemeProvider } from '../context/ThemeProvider';
import { IntlTestProvider } from './IntlTestProvider';
import { SearchPage } from '../components/SearchPage';
import { SelectedItemsFlyout } from '../components/SelectedItemsFlyout';
import { AppNav } from '../components/AppNav';
import { resetStoreState } from './renderWithRouter';
import { setNavigationState } from './nextNavigationMock';

vi.mock('../components/SearchPage', () => ({
  SearchPage: function MockSearchPage() {
    return <div>Mock app home route</div>;
  },
}));

function renderShellRoute(initialPath: string, children: React.ReactNode) {
  const [pathname, search = ''] = initialPath.split('?');
  setNavigationState(pathname === '' ? '/' : pathname, search === '' ? '' : `?${search}`);

  return render(
    <IntlTestProvider>
      <ReduxProvider>
        <ThemeProvider>
          <div className="app-shell">
            <AppNav />
            <div className="app-shell__content">{children}</div>
            <SelectedItemsFlyout />
          </div>
        </ThemeProvider>
      </ReduxProvider>
    </IntlTestProvider>
  );
}

describe('App routing pages', () => {
  beforeEach(() => {
    cleanup();
    resetStoreState();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the home route at /', () => {
    renderShellRoute('/?page=1', (
      <Suspense fallback={null}>
        <SearchPage />
      </Suspense>
    ));
    expect(screen.getByText('Mock app home route')).toBeInTheDocument();
  });

  it('renders the about route at /about', async () => {
    setNavigationState('/about');
    const aboutPage = await AboutPage();
    renderShellRoute('/about', aboutPage);
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(
      screen.getByRole('link', { name: 'RS School React course' })
    ).toBeInTheDocument();
  });

  it('renders the not-found page for unknown paths', () => {
    render(
      <IntlTestProvider>
        <NotFoundPage />
      </IntlTestProvider>
    );
    expect(
      screen.getByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(
      screen.queryByRole('navigation', { name: 'Main navigation' })
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Mock app home route')).not.toBeInTheDocument();
  });
});
