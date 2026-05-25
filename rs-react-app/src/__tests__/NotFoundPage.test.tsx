import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NotFoundPage } from '../pages/NotFoundPage';

function renderNotFoundPage() {
  return render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );
}

describe('NotFoundPage', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders a not-found message and link to home', () => {
    renderNotFoundPage();
    expect(
      screen.getByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Ooops! The page you are looking for does not exist or has been moved.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('does not render app navigation or theme controls', () => {
    renderNotFoundPage();
    expect(
      screen.queryByRole('navigation', { name: 'Main navigation' })
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: 'Light' })).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: 'Dark' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'About' })).not.toBeInTheDocument();
  });
});
