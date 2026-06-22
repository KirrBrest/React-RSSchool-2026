import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';

describe('SwapiPeopleApi.fetchPeople', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    vi.stubGlobal('window', {
      location: { hostname: 'localhost' },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds correct URL and returns parsed data on success', async () => {
    const payload = {
      count: 1,
      next: null,
      previous: null,
      results: [],
    };
    const response = new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await SwapiPeopleApi.fetchPeople('  skywalker  ', 2);

    expect(fetchMock).toHaveBeenCalledWith(
      '/swapi/people/?search=skywalker&page=2',
      undefined
    );
    expect(result).toEqual(payload);
  });

  it('normalizes page below 1 and omits query string when term is empty', async () => {
    const payload = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
    const response = new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await SwapiPeopleApi.fetchPeople('   ', 0);

    expect(fetchMock).toHaveBeenCalledWith('/swapi/people/', undefined);
    expect(result).toEqual(payload);
  });

  it('throws when response JSON does not match SWAPI list shape', async () => {
    const response = new Response(JSON.stringify({ invalid: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal('fetch', fetchMock);

    await expect(SwapiPeopleApi.fetchPeople('', 1)).rejects.toEqual(
      new Error('SWAPI_INVALID_RESPONSE')
    );
  });

  it('fetches a single person by id', async () => {
    const person = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.py4e.com/api/people/1/',
    };
    const response = new Response(JSON.stringify(person), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await SwapiPeopleApi.fetchPerson('1');

    expect(fetchMock).toHaveBeenCalledWith('/swapi/people/1/', undefined);
    expect(result).toEqual(person);
  });

  it('throws a descriptive error when HTTP status is not ok', async () => {
    const badResponse = new Response('', {
      status: 503,
      statusText: 'Service Unavailable',
    });
    const fetchMock = vi.fn().mockResolvedValue(badResponse);
    vi.stubGlobal('fetch', fetchMock);

    await expect(SwapiPeopleApi.fetchPeople('any', 1)).rejects.toEqual(
      new Error('SWAPI_HTTP_503')
    );
  });
});

