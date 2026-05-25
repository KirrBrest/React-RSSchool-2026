import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AppRoutes } from '../routes/AppRoutes';
import { ReduxProvider } from '../store/ReduxProvider';
import { ThemeProvider } from '../context/ThemeProvider';
import { resetStoreState } from './renderWithRouter.tsx';

vi.mock('../App', () => ({
  default: function MockApp() {
    return <div>Mock app home route</div>;
  },
}));

function renderAppRoutes(initialPath: string) {
  return render(
    <ReduxProvider>
      <ThemeProvider>
        <MemoryRouter initialEntries={[initialPath]}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

describe('AppRoutes', () => {
  beforeEach(() => {
    cleanup();
    resetStoreState();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the home route at /', () => {
    renderAppRoutes('/?page=1');
    expect(screen.getByText('Mock app home route')).toBeInTheDocument();
  });

  it('renders the about route at /about', () => {
    renderAppRoutes('/about');
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'RS School React course' })
    ).toBeInTheDocument();
  });

  it('renders the not-found page for unknown paths', () => {
    renderAppRoutes('/no-such-page');
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
