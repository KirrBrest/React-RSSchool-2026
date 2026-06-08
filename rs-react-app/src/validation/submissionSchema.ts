import { z } from 'zod';
import { COUNTRY_NAMES } from '../constants/countries';

const countrySet = new Set<string>(COUNTRY_NAMES);

export const submissionInputSchema = z.object({
  source: z.enum(['uncontrolled', 'rhf']),
  name: z.string().trim().min(1, 'Name is required.'),
  age: z.coerce.number().int().min(1, 'Age must be at least 1.').max(120),
  email: z.string().trim().min(1, 'Email is required.'),
  gender: z.enum(['male', 'female', 'other']),
  country: z
    .string()
    .trim()
    .min(1, 'Country is required.')
    .refine((value) => countrySet.has(value), 'Choose a country from the list.'),
  pictureDataUrl: z
    .string()
    .min(1, 'Profile picture is required.')
    .refine(
      (value) => value.startsWith('data:image/'),
      'Profile picture must be an image file.'
    ),
});

export type SubmissionInputValues = z.infer<typeof submissionInputSchema>;
