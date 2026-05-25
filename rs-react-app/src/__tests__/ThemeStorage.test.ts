import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { THEME_MODES, THEME_STORAGE_KEY } from '../constants';
import { ThemeStorage } from '../storage/themeStorage';

describe('ThemeStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns dark theme by default', () => {
    expect(ThemeStorage.read()).toBe(THEME_MODES.dark);
  });

  it('persists the selected theme', () => {
    ThemeStorage.write(THEME_MODES.light);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_MODES.light);
    expect(ThemeStorage.read()).toBe(THEME_MODES.light);
  });
});
