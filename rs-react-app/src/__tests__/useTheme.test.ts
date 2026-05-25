import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { THEME_MODES, THEME_STORAGE_KEY } from '../constants';
import { ThemeProvider } from '../context/ThemeProvider';
import { useTheme } from '../hooks/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = THEME_MODES.dark;
  });

  afterEach(() => {
    delete document.documentElement.dataset.theme;
  });

  it('reads and updates the theme through Context API', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe(THEME_MODES.dark);

    act(() => {
      result.current.setTheme(THEME_MODES.light);
    });

    expect(result.current.theme).toBe(THEME_MODES.light);
    expect(document.documentElement.dataset.theme).toBe(THEME_MODES.light);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_MODES.light);
  });
});
