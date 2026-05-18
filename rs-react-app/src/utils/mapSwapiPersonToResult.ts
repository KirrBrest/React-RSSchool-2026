import type { PersonResultItem, SwapiPerson } from '../types';
import { SwapiPersonDescription } from './personDescription';

function toItem(person: SwapiPerson): PersonResultItem {
  return {
    id: person.url,
    name: person.name,
    description: SwapiPersonDescription.build(person),
  };
}

export const SwapiPersonResultMapper = {
  toItem,
};
