import type { GenderValue } from '../types/formSubmission';

export function parseGenderValue(value: FormDataEntryValue | null): GenderValue | null {
  if (value === 'male' || value === 'female' || value === 'other') {
    return value;
  }
  return null;
}
