import {
  QUERY_PARAMS,
  SWAPI_API_BASE,
  SWAPI_DEV_PROXY_BASE,
  SWAPI_LOCAL_DEV_HOSTNAMES,
  SWAPI_PAGE_SIZE,
} from '../constants';
import type { SwapiPeopleListResponse, SwapiPerson } from '../types';
import { isSwapiPeopleListResponse, isSwapiPerson } from '../types/guards';

async function apiBase(): Promise<string> {
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (SWAPI_LOCAL_DEV_HOSTNAMES.includes(hostname)) {
      return SWAPI_DEV_PROXY_BASE;
    }
    return SWAPI_API_BASE;
  }

  try {
    const { headers } = await import('next/headers');
    const headerStore = await headers();
    const host =
      headerStore.get('x-forwarded-host') ?? headerStore.get('host');
    if (host !== null) {
      const protocol = headerStore.get('x-forwarded-proto') ?? 'https';
      return `${protocol}://${host}${SWAPI_DEV_PROXY_BASE}`;
    }
  } catch {
    return SWAPI_API_BASE;
  }

  return SWAPI_API_BASE;
}

function serverFetchInit(): RequestInit | undefined {
  if (typeof window !== 'undefined') {
    return undefined;
  }

  return {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; RSSchoolReact/1.0)',
    },
  };
}

async function fetchPeople(
  rawTerm: string,
  page: number
): Promise<SwapiPeopleListResponse> {
  const term = rawTerm.trim();
  const safePage = page < 1 ? 1 : page;
  const peoplePath = `${await apiBase()}/people/`;
  const params = new URLSearchParams();
  if (term !== '') {
    params.set('search', term);
  }
  if (safePage > 1) {
    params.set(QUERY_PARAMS.page, String(safePage));
  }
  const qs = params.toString();
  const url = qs === '' ? peoplePath : `${peoplePath}?${qs}`;
  const res = await fetch(url, serverFetchInit());
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
  const url = `${await apiBase()}/people/${safeId}/`;
  const res = await fetch(url, serverFetchInit());
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
  pageSize: SWAPI_PAGE_SIZE,
  fetchPeople,
  fetchPerson,
};
