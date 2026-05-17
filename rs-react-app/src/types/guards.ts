import type { SwapiPeopleListResponse, SwapiPerson } from './index';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

export function isSwapiPerson(value: unknown): value is SwapiPerson {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value.name === 'string' &&
    typeof value.height === 'string' &&
    typeof value.mass === 'string' &&
    typeof value.hair_color === 'string' &&
    typeof value.skin_color === 'string' &&
    typeof value.eye_color === 'string' &&
    typeof value.birth_year === 'string' &&
    typeof value.gender === 'string' &&
    typeof value.url === 'string'
  );
}

export function isSwapiPeopleListResponse(
  value: unknown
): value is SwapiPeopleListResponse {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value.count === 'number' &&
    isNullableString(value.next) &&
    isNullableString(value.previous) &&
    Array.isArray(value.results) &&
    value.results.every(isSwapiPerson)
  );
}

export function isHTMLElement(
  element: Element | null
): element is HTMLElement {
  return element !== null && element instanceof HTMLElement;
}
