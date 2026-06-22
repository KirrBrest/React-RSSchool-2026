import { afterEach, describe, expect, it, vi } from 'vitest';
import { getQueryCacheTtlSeconds } from '../config/queryCacheTtl';

describe('getQueryCacheTtlSeconds', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns the default TTL when the env variable is missing', () => {
    vi.stubEnv('NEXT_PUBLIC_QUERY_CACHE_TTL_SECONDS', '');
    expect(getQueryCacheTtlSeconds()).toBe(300);
  });

  it('returns the configured TTL from the environment variable', () => {
    vi.stubEnv('NEXT_PUBLIC_QUERY_CACHE_TTL_SECONDS', '120');
    expect(getQueryCacheTtlSeconds()).toBe(120);
  });

  it('falls back to the default TTL for invalid values', () => {
    vi.stubEnv('NEXT_PUBLIC_QUERY_CACHE_TTL_SECONDS', 'not-a-number');
    expect(getQueryCacheTtlSeconds()).toBe(300);
  });
});
