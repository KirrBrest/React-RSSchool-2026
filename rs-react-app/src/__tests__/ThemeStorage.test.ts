import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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

  it('returns dark theme for invalid stored values', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'invalid');
    expect(ThemeStorage.read()).toBe(THEME_MODES.dark);
  });

  it('returns dark theme when localStorage read fails', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(ThemeStorage.read()).toBe(THEME_MODES.dark);
    vi.restoreAllMocks();
  });

  it('ignores write failures', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => ThemeStorage.write(THEME_MODES.light)).not.toThrow();
    vi.restoreAllMocks();
  });
});
