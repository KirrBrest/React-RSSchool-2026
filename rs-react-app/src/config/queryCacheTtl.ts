const DEFAULT_QUERY_CACHE_TTL_SECONDS = 300;

export function getQueryCacheTtlSeconds(): number {
  const raw = process.env.NEXT_PUBLIC_QUERY_CACHE_TTL_SECONDS;
  if (raw === undefined || raw === '') {
    return DEFAULT_QUERY_CACHE_TTL_SECONDS;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return DEFAULT_QUERY_CACHE_TTL_SECONDS;
  }
  return parsed;
}
