import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SearchTermStorage } from '../storage/searchTermStorage';

describe('SearchTermStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns stored value trimmed from localStorage', () => {
    localStorage.setItem(SearchTermStorage.storageKey, '  stored  ');
    const value = SearchTermStorage.read();
    expect(value).toBe('stored');
  });

  it('returns empty string when key is missing', () => {
    const value = SearchTermStorage.read();
    expect(value).toBe('');
  });

  it('returns empty string when localStorage throws', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const value = SearchTermStorage.read();
    expect(value).toBe('');
  });

  it('writes normalized term to localStorage', () => {
    SearchTermStorage.write('  skywalker  ');
    expect(localStorage.getItem(SearchTermStorage.storageKey)).toBe('skywalker');
  });

  it('removes key when normalized term is empty', () => {
    localStorage.setItem(SearchTermStorage.storageKey, 'existing');
    SearchTermStorage.write('   ');
    expect(localStorage.getItem(SearchTermStorage.storageKey)).toBeNull();
  });

  it('does not throw when localStorage write fails', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => SearchTermStorage.write('value')).not.toThrow();
  });

  it('does not throw when localStorage remove fails', () => {
    vi.spyOn(window.localStorage, 'removeItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => SearchTermStorage.write('')).not.toThrow();
  });
});

