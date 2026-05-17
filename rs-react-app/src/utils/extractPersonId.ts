export function extractPersonId(personRef: string): string {
  const trimmed = personRef.trim();
  const match = /\/people\/(\d+)\/?$/.exec(trimmed);
  if (match !== null) {
    return match[1];
  }
  return trimmed;
}

export function parseDetailsParam(raw: string | null): string | null {
  if (raw === null || raw.trim() === '') {
    return null;
  }
  const id = extractPersonId(raw);
  return id === '' ? null : id;
}
