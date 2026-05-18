import { describe, it, expect } from 'vitest';
import { extractPersonId, parseDetailsParam } from '../utils/extractPersonId';

describe('extractPersonId', () => {
  it('parses numeric id from SWAPI person url', () => {
    expect(extractPersonId('https://swapi.py4e.com/api/people/1/')).toBe('1');
  });

  it('returns trimmed value when already numeric', () => {
    expect(extractPersonId('  42 ')).toBe('42');
  });
});

describe('parseDetailsParam', () => {
  it('returns null for empty values', () => {
    expect(parseDetailsParam(null)).toBeNull();
    expect(parseDetailsParam('')).toBeNull();
  });

  it('returns person id from details query value', () => {
    expect(parseDetailsParam('https://swapi.py4e.com/api/people/3/')).toBe(
      '3'
    );
  });
});
