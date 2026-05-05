import type { SwapiPerson } from '../types';

export class SwapiPersonDescription {
  static build(person: SwapiPerson): string {
    return [
      `Gender: ${person.gender}`,
      `Birth: ${person.birth_year}`,
      `${person.height} cm · ${person.mass} kg`,
      `Hair: ${person.hair_color} · Eyes: ${person.eye_color} · Skin: ${person.skin_color}`,
    ].join(' · ');
  }
}
