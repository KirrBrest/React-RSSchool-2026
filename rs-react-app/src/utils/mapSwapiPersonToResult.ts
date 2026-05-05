import type { PersonResultItem, SwapiPerson } from '../types';
import { SwapiPersonDescription } from './personDescription';

export class SwapiPersonResultMapper {
  static toItem(person: SwapiPerson): PersonResultItem {
    return {
      id: person.url,
      name: person.name,
      description: SwapiPersonDescription.build(person),
    };
  }
}
