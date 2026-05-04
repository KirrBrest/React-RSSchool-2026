import type { SwapiPerson } from '../types/swapiPeople';
import type { PersonResultItem } from '../types/personResultItem';
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
