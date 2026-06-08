import type { GenderValue } from '../types/formSubmission';

export function isGenderValue(value: string): value is GenderValue {
  return value === 'male' || value === 'female' || value === 'other';
}

export function parseGenderValue(value: FormDataEntryValue | null): GenderValue | null {
  if (value === 'male' || value === 'female' || value === 'other') {
    return value;
  }
  return null;
}
