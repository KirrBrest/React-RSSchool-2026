import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Router } from '../routes/Router';
import { ReduxProvider } from '../store/ReduxProvider';
import { ThemeProvider } from '../context/ThemeProvider';
import { resetStoreState } from './renderWithRouter.tsx';

vi.mock('../pages/MainPage', () => ({
  MainPage: function MockMainPage() {
    return <div>Mock main page</div>;
  },
}));

function renderRouter(initialPath: string) {
  return render(
    <ReduxProvider>
      <ThemeProvider>
        <MemoryRouter initialEntries={[initialPath]}>
          <Router />
        </MemoryRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

describe('Router', () => {
  beforeEach(() => {
    cleanup();
    resetStoreState();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the home route at /', () => {
    renderRouter('/?page=1');
    expect(screen.getByText('Mock main page')).toBeInTheDocument();
  });

  it('renders the about route at /about', () => {
    renderRouter('/about');
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'RS School React course' })
    ).toBeInTheDocument();
  });

  it('renders the not-found page for unknown paths', () => {
    renderRouter('/no-such-page');
    expect(
      screen.getByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Mock main page')).not.toBeInTheDocument();
  });
});
