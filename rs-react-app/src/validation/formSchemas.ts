import { z } from 'zod';
import { COUNTRY_NAMES } from '../constants/countries';
import { isGenderValue } from '../utils/parseGenderValue';
import { validateImageFile } from '../utils/validateImageFile';

const countrySet = new Set<string>(COUNTRY_NAMES);

export function isValidEmail(value: string): boolean {
  const parts = value.split('@');
  if (parts.length !== 2) {
    return false;
  }
  const [localPart, domain] = parts;
  if (localPart.length === 0 || domain.length === 0) {
    return false;
  }
  return domain.includes('.');
}

export function hasUppercaseFirstLetter(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return false;
  }
  const firstChar = trimmed.charAt(0);
  return firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
}

export const nameFieldSchema = z
  .string()
  .trim()
  .min(1, 'Name is required.')
  .refine(
    hasUppercaseFirstLetter,
    'Name must start with an uppercase letter.'
  );

export const ageFieldSchema = z
  .string()
  .trim()
  .min(1, 'Age is required.')
  .refine((value) => !Number.isNaN(Number(value)), 'Age must be a number.')
  .refine((value) => Number(value) >= 0, 'Age cannot be negative.');

export const emailFieldSchema = z
  .string()
  .trim()
  .min(1, 'Email is required.')
  .refine(isValidEmail, 'Enter a valid email address.');

export const genderFieldSchema = z
  .string()
  .refine(isGenderValue, 'Choose a gender.');

export const countryFieldSchema = z
  .string()
  .trim()
  .min(1, 'Country is required.')
  .refine((value) => countrySet.has(value), 'Choose a country from the list.');

export const acceptTermsFieldSchema = z.boolean().refine((value) => value === true, {
  message: 'You must accept the Terms and Conditions.',
});

function addPictureFileIssue(
  file: File | null,
  context: z.RefinementCtx,
  path: ['picture']
): void {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    context.addIssue({
      code: 'custom',
      message: validation.message,
      path,
    });
  }
}

function addPasswordMatchIssue(
  values: { password: string; confirmPassword: string },
  context: z.RefinementCtx
): void {
  if (values.password !== values.confirmPassword) {
    context.addIssue({
      code: 'custom',
      message: 'Passwords must match.',
      path: ['confirmPassword'],
    });
  }
}

const sharedFormFieldsSchema = z.object({
  name: nameFieldSchema,
  age: ageFieldSchema,
  email: emailFieldSchema,
  gender: genderFieldSchema,
  acceptTerms: acceptTermsFieldSchema,
  password: z.string(),
  confirmPassword: z.string(),
  country: countryFieldSchema,
});

export const uncontrolledFormSchema = sharedFormFieldsSchema
  .extend({
    picture: z.custom<File | null>().superRefine((file, context) => {
      addPictureFileIssue(file, context, ['picture']);
    }),
  })
  .superRefine((values, context) => {
    addPasswordMatchIssue(values, context);
  });

export const rhfFormSchema = sharedFormFieldsSchema
  .extend({
    picture: z.custom<FileList | undefined>().superRefine((files, context) => {
      addPictureFileIssue(files?.item(0) ?? null, context, ['picture']);
    }),
  })
  .superRefine((values, context) => {
    addPasswordMatchIssue(values, context);
  });

export type UncontrolledFormValues = z.infer<typeof uncontrolledFormSchema>;

export type UncontrolledFieldName = keyof UncontrolledFormValues;

const UNCONTROLLED_FIELD_NAMES: readonly UncontrolledFieldName[] = [
  'name',
  'age',
  'email',
  'gender',
  'acceptTerms',
  'password',
  'confirmPassword',
  'country',
  'picture',
];

function isUncontrolledFieldName(value: string): value is UncontrolledFieldName {
  return UNCONTROLLED_FIELD_NAMES.some((fieldName) => fieldName === value);
}

export function mapZodErrorsToFields(
  error: z.ZodError
): Partial<Record<UncontrolledFieldName, string>> {
  const fieldErrors: Partial<Record<UncontrolledFieldName, string>> = {};

  for (const issue of error.issues) {
    const fieldName = issue.path[0];
    if (typeof fieldName !== 'string' || !isUncontrolledFieldName(fieldName)) {
      continue;
    }
    if (fieldName in fieldErrors) {
      continue;
    }
    fieldErrors[fieldName] = issue.message;
  }

  return fieldErrors;
}
