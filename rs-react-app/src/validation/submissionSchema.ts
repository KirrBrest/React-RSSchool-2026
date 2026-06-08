import { z } from 'zod';
import {
  ageFieldSchema,
  countryFieldSchema,
  emailFieldSchema,
  genderFieldSchema,
  nameFieldSchema,
} from './formSchemas';

export const submissionInputSchema = z.object({
  source: z.enum(['uncontrolled', 'rhf']),
  name: nameFieldSchema,
  age: ageFieldSchema.transform((value) => Number(value)),
  email: emailFieldSchema,
  gender: genderFieldSchema,
  country: countryFieldSchema,
  pictureDataUrl: z
    .string()
    .min(1, 'Profile picture is required.')
    .refine(
      (value) => value.startsWith('data:image/'),
      'Profile picture must be an image file.'
    ),
});

export type SubmissionInputValues = z.infer<typeof submissionInputSchema>;
