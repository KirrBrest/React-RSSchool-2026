import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Router } from '../routes/Router';
import { ReduxProvider } from '../store/ReduxProvider';
import { ThemeProvider } from '../context/ThemeProvider';
import { AboutPage } from '../pages/AboutPage';

function renderAboutPage() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    </ThemeProvider>
  );
}

function renderAboutViaRouter() {
  return render(
    <ReduxProvider>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/about']}>
          <Router />
        </MemoryRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

describe('AboutPage', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders author section and external links', () => {
    renderAboutPage();
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Author' })).toBeInTheDocument();
    expect(screen.getByText('Kiryl Lukashchuk')).toBeInTheDocument();
    const githubLink = screen.getByRole('link', { name: 'GitHub profile' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/KirrBrest');
    expect(githubLink).toHaveAttribute('target', '_blank');
    const emailLink = screen.getByRole('link', {
      name: 'Lukashchuk.Kiryl@gmail.com',
    });
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:Lukashchuk.Kiryl@gmail.com'
    );
    const courseLink = screen.getByRole('link', { name: 'RS School React course' });
    expect(courseLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(courseLink).toHaveAttribute('target', '_blank');
  });

  it('includes navigation to home via the router layout', () => {
    renderAboutViaRouter();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });
});
