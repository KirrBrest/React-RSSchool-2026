import { z } from 'zod';

export const submissionInputSchema = z.object({
  source: z.enum(['uncontrolled', 'rhf']),
  name: z.string().trim().min(1, 'Name is required.'),
  age: z.coerce.number().int().min(1, 'Age must be at least 1.').max(120),
  email: z.string().trim().min(1, 'Email is required.'),
  gender: z.enum(['male', 'female', 'other']),
});

export type SubmissionInputValues = z.infer<typeof submissionInputSchema>;
