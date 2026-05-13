import type { SwapiPeopleListResponse } from '../types';

export function onePersonSwapiList(): SwapiPeopleListResponse {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.py4e.com/api/people/1/',
      },
    ],
  };
}
