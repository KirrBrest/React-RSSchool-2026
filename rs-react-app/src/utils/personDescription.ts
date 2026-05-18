import type { SwapiPerson } from '../types';

function build(person: SwapiPerson): string {
  return [
    `Gender: ${person.gender}`,
    `Birth: ${person.birth_year}`,
    `${person.height} cm · ${person.mass} kg`,
    `Hair: ${person.hair_color} · Eyes: ${person.eye_color} · Skin: ${person.skin_color}`,
  ].join(' · ');
}

export const SwapiPersonDescription = {
  build,
};
