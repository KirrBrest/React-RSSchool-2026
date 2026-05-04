import type { SwapiPeopleListResponse, SwapiPerson } from '../types/swapiPeople';

const PEOPLE_ENDPOINT = 'https://swapi.dev/api/people/';

export class SwapiPeopleApi {
  static async search(rawTerm: string): Promise<SwapiPerson[]> {
    const term = rawTerm.trim();
    const url =
      term === ''
        ? PEOPLE_ENDPOINT
        : `${PEOPLE_ENDPOINT}?search=${encodeURIComponent(term)}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`SWAPI request failed: ${res.status}`);
    }
    const data = (await res.json()) as SwapiPeopleListResponse;
    return data.results ?? [];
  }
}
