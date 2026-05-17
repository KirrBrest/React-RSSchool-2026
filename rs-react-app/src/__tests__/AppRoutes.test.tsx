import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AppRoutes } from '../routes/AppRoutes';

vi.mock('../App', () => ({
  default: function MockApp() {
    return <div>Mock app home route</div>;
  },
}));

describe('AppRoutes', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the home route at /', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock app home route')).toBeInTheDocument();
  });

  it('renders the about route at /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'RS School React course' })
    ).toBeInTheDocument();
  });
});
