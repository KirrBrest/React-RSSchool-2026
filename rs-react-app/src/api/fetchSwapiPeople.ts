import type { SwapiPeopleListResponse } from '../types';
import { isSwapiPeopleListResponse } from '../types/guards';

function apiBase(): string {
  if (typeof window === 'undefined') {
    return 'https://swapi.py4e.com/api';
  }
  const { hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return '/swapi';
  }
  return 'https://swapi.py4e.com/api';
}

async function fetchPeople(
  rawTerm: string,
  page: number
): Promise<SwapiPeopleListResponse> {
  const term = rawTerm.trim();
  const safePage = page < 1 ? 1 : page;
  const peoplePath = `${apiBase()}/people/`;
  const params = new URLSearchParams();
  if (term !== '') {
    params.set('search', term);
  }
  if (safePage > 1) {
    params.set('page', String(safePage));
  }
  const qs = params.toString();
  const url = qs === '' ? peoplePath : `${peoplePath}?${qs}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`SWAPI_HTTP_${res.status}`);
  }
  const payload: unknown = await res.json();
  if (!isSwapiPeopleListResponse(payload)) {
    throw new Error('SWAPI_INVALID_RESPONSE');
  }
  return payload;
}

export const SwapiPeopleApi = {
  pageSize: 10,
  fetchPeople,
};
