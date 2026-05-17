import { describe, it, expect } from 'vitest';
import { parsePageParam } from '../utils/parsePageParam';

describe('parsePageParam', () => {
  it('returns 1 when param is missing', () => {
    expect(parsePageParam(null)).toBe(1);
  });

  it('returns parsed page for valid values', () => {
    expect(parsePageParam('3')).toBe(3);
  });

  it('returns 1 for invalid values', () => {
    expect(parsePageParam('0')).toBe(1);
    expect(parsePageParam('abc')).toBe(1);
  });
});
