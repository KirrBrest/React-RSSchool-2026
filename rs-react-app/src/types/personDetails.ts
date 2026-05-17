import type { SwapiPerson } from './swapi';

export type DetailsState = {
  person: SwapiPerson | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export type PersonDetailsContentProps = {
  personId: string;
};
