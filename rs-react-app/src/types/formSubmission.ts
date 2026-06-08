export type FormSource = 'uncontrolled' | 'rhf';

export type GenderValue = 'male' | 'female' | 'other';

export type FormSubmission = {
  id: string;
  source: FormSource;
  name: string;
  age: number;
  email: string;
  gender: GenderValue;
  country: string;
  pictureDataUrl: string;
  submittedAt: string;
};

export type SubmissionInput = Omit<FormSubmission, 'id' | 'submittedAt'>;
