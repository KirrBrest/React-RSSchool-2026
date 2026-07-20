import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { emptyPeopleList } from './emptyPeopleList.ts';
import { onePersonSwapiList } from './onePersonSwapiList.ts';
import {
  invalidateAllSwapiCache,
  invalidatePeopleListCache,
  invalidatePersonCache,
  resetSwapiApiState,
  store,
} from '../store';
import { swapiApi } from '../api/swapiApi';

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    pageSize: 10,
    fetchPeople: vi.fn(),
    fetchPerson: vi.fn(),
  },
}));

const fetchPeople = vi.mocked(SwapiPeopleApi.fetchPeople);
const fetchPerson = vi.mocked(SwapiPeopleApi.fetchPerson);

describe('swapiApi', () => {
  beforeEach(() => {
    resetSwapiApiState();
    vi.clearAllMocks();
    fetchPeople.mockResolvedValue(emptyPeopleList());
    fetchPerson.mockResolvedValue(onePersonSwapiList().results[0]);
  });

  afterEach(() => {
    resetSwapiApiState();
    vi.restoreAllMocks();
  });

  it('caches people list results for the same query args', async () => {
    const first = store.dispatch(
      swapiApi.endpoints.getPeople.initiate({ term: '', page: 1 })
    );
    await first;
    fetchPeople.mockClear();

    const second = store.dispatch(
      swapiApi.endpoints.getPeople.initiate({ term: '', page: 1 })
    );
    await second;

    expect(fetchPeople).not.toHaveBeenCalled();
  });

  it('refetches the people list after cache invalidation', async () => {
    const first = store.dispatch(
      swapiApi.endpoints.getPeople.initiate({ term: '', page: 1 })
    );
    await first;
    fetchPeople.mockClear();

    invalidatePeopleListCache();

    const second = store.dispatch(
      swapiApi.endpoints.getPeople.initiate({ term: '', page: 1 })
    );
    await second;

    expect(fetchPeople).toHaveBeenCalledWith('', 1);
  });

  it('refetches person details after targeted invalidation', async () => {
    const first = store.dispatch(swapiApi.endpoints.getPerson.initiate('1'));
    await first;
    fetchPerson.mockClear();

    invalidatePersonCache('1');

    const second = store.dispatch(swapiApi.endpoints.getPerson.initiate('1'));
    await second;

    expect(fetchPerson).toHaveBeenCalledWith('1');
  });

  it('invalidates both list and detail caches together', async () => {
    await store.dispatch(
      swapiApi.endpoints.getPeople.initiate({ term: 'sky', page: 1 })
    );
    await store.dispatch(swapiApi.endpoints.getPerson.initiate('1'));
    fetchPeople.mockClear();
    fetchPerson.mockClear();

    invalidateAllSwapiCache();

    await store.dispatch(
      swapiApi.endpoints.getPeople.initiate({ term: 'sky', page: 1 })
    );
    await store.dispatch(swapiApi.endpoints.getPerson.initiate('1'));

    expect(fetchPeople).toHaveBeenCalledWith('sky', 1);
    expect(fetchPerson).toHaveBeenCalledWith('1');
  });
});
