import { fireEvent, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ThemeToggle } from '../components/ThemeToggle';
import { THEME_MODES, THEME_STORAGE_KEY } from '../constants';
import { ThemeProvider } from '../context/ThemeProvider';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

function renderThemeToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    document.documentElement.dataset.theme = THEME_MODES.dark;
  });

  afterEach(() => {
    cleanup();
    delete document.documentElement.dataset.theme;
  });

  it('switches the application theme to light', () => {
    const view = renderThemeToggle();
    const region = withinRenderedRoot(view);
    fireEvent.click(region.getByRole('radio', { name: 'Light' }));
    expect(document.documentElement.dataset.theme).toBe(THEME_MODES.light);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_MODES.light);
  });

  it('switches the application theme to dark', () => {
    localStorage.setItem(THEME_STORAGE_KEY, THEME_MODES.light);
    const view = renderThemeToggle();
    const region = withinRenderedRoot(view);
    fireEvent.click(region.getByRole('radio', { name: 'Dark' }));
    expect(document.documentElement.dataset.theme).toBe(THEME_MODES.dark);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_MODES.dark);
  });
});
