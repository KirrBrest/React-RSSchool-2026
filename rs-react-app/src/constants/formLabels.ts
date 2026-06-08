export const FORM_LABELS = {
  name: 'Name',
  age: 'Age',
  email: 'Email',
  gender: 'Gender',
  terms: 'I accept the Terms and Conditions',
} as const;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
] as const;
