export function buildSearchParamsString(params: URLSearchParams): string {
  const qs = params.toString();
  return qs === '' ? '' : `?${qs}`;
}
