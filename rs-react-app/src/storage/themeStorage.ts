import { THEME_MODES, THEME_STORAGE_KEY } from '../constants';
import type { ThemeMode } from '../types';

function isThemeMode(value: string): value is ThemeMode {
  return value === THEME_MODES.light || value === THEME_MODES.dark;
}

function read(): ThemeMode {
  if (typeof window === 'undefined') {
    return THEME_MODES.dark;
  }
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw !== null && isThemeMode(raw)) {
      return raw;
    }
  } catch {
    return THEME_MODES.dark;
  }
  return THEME_MODES.dark;
}

function write(theme: ThemeMode): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
}

export const ThemeStorage = {
  read,
  write,
};
