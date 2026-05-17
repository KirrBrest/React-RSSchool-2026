import type { SwapiPeopleListResponse, SwapiPerson } from '../types';
import { isSwapiPeopleListResponse, isSwapiPerson } from '../types/guards';

const SWAPI_API_BASE = 'https://swapi.py4e.com/api';
const SWAPI_DEV_PROXY_BASE = '/swapi';
const SWAPI_LOCAL_DEV_HOSTNAMES = ['localhost', '127.0.0.1'];

function apiBase(): string {
  if (typeof window === 'undefined') {
    return SWAPI_API_BASE;
  }
  const { hostname } = window.location;
  if (SWAPI_LOCAL_DEV_HOSTNAMES.includes(hostname)) {
    return SWAPI_DEV_PROXY_BASE;
  }
  return SWAPI_API_BASE;
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

async function fetchPerson(personId: string): Promise<SwapiPerson> {
  const safeId = personId.trim();
  if (safeId === '') {
    throw new Error('SWAPI_INVALID_PERSON_ID');
  }
  const url = `${apiBase()}/people/${safeId}/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`SWAPI_HTTP_${res.status}`);
  }
  const payload: unknown = await res.json();
  if (!isSwapiPerson(payload)) {
    throw new Error('SWAPI_INVALID_RESPONSE');
  }
  return payload;
}

export const SwapiPeopleApi = {
  pageSize: 10,
  fetchPeople,
  fetchPerson,
};
