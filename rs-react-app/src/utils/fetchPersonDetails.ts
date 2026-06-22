import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import type { SwapiPerson } from '../types';
import { rtkQueryErrorMessage } from './rtkQueryErrorMessage';

export type PersonDetailsFetchResult = {
  person: SwapiPerson | null;
  errorMessage: string | null;
};

export async function fetchPersonDetails(
  personId: string
): Promise<PersonDetailsFetchResult> {
  try {
    const person = await SwapiPeopleApi.fetchPerson(personId);
    return { person, errorMessage: null };
  } catch (reason: unknown) {
    return {
      person: null,
      errorMessage: rtkQueryErrorMessage(reason),
    };
  }
}
