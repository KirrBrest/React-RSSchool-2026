import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AboutPage } from '../views/AboutPage';
import { ThemeProvider } from '../context/ThemeProvider';
import { setNavigationState } from './nextNavigationMock';

function renderAboutPage() {
  setNavigationState('/about');
  return render(
    <ThemeProvider>
      <AboutPage />
    </ThemeProvider>
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

  it('includes navigation to home', () => {
    renderAboutPage();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });
});
