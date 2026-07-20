import { describe, it, expect } from 'vitest';
import { getPersonAvatarUrl } from '../utils/personAvatarUrl';

describe('getPersonAvatarUrl', () => {
  it('builds a dicebear avatar url from the person name and size', () => {
    expect(getPersonAvatarUrl('Luke Skywalker', 96)).toBe(
      'https://api.dicebear.com/9.x/initials/png?seed=Luke%20Skywalker&size=96'
    );
  });

  it('uses a fallback seed for empty names', () => {
    expect(getPersonAvatarUrl('   ')).toContain('seed=unknown');
  });
});
