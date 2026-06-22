import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { fetchInitialPeopleList } from '../utils/fetchInitialPeopleList';
import { parseSearchRouteParams } from '../utils/parseSearchRouteParams';
import { onePersonSwapiList } from './onePersonSwapiList';

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    pageSize: 10,
    fetchPeople: vi.fn(),
    fetchPerson: vi.fn(),
  },
}));

const fetchPeople = vi.mocked(SwapiPeopleApi.fetchPeople);

describe('parseSearchRouteParams', () => {
  it('reads page and details from search params', () => {
    expect(
      parseSearchRouteParams({ page: '2', details: '1' })
    ).toEqual({
      page: 2,
      detailsId: '1',
    });
  });

  it('defaults page to 1 when page param is missing', () => {
    expect(parseSearchRouteParams({})).toEqual({
      page: 1,
      detailsId: null,
    });
  });
});

describe('fetchInitialPeopleList', () => {
  beforeEach(() => {
    fetchPeople.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('maps SWAPI people into list query result', async () => {
    fetchPeople.mockResolvedValue(onePersonSwapiList());

    const result = await fetchInitialPeopleList({ term: '', page: 1 });

    expect(fetchPeople).toHaveBeenCalledWith('', 1);
    expect(result.errorMessage).toBeNull();
    expect(result.data?.results[0]?.name).toBe('Luke Skywalker');
    expect(result.data?.listTotalCount).toBe(1);
  });

  it('returns an error message when SWAPI fails', async () => {
    fetchPeople.mockRejectedValue(new Error('SWAPI_HTTP_503'));

    const result = await fetchInitialPeopleList({ term: 'luke', page: 1 });

    expect(result.data).toBeNull();
    expect(result.errorMessage).not.toBeNull();
  });
});
