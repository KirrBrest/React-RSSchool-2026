import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store';
import { submissionInputSchema } from '../../validation/submissionSchema';
import { isGenderValue } from '../../utils/parseGenderValue';
import { FORM_LABELS, GENDER_OPTIONS } from '../../constants/formLabels';
import './FormFields.css';

const rhfFormSchema = z.object({
  name: z.string(),
  age: z.string(),
  email: z.string(),
  gender: z.string().refine(isGenderValue, 'Choose a gender.'),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: 'You must accept the Terms and Conditions.',
  }),
});

type RhfFormValues = {
  name: string;
  age: string;
  email: string;
  gender: string;
  acceptTerms: boolean;
};

type RhfFormProps = {
  onSuccess: () => void;
};

const RHF_FIELD_NAMES: readonly (keyof RhfFormValues)[] = [
  'name',
  'age',
  'email',
  'gender',
  'acceptTerms',
];

function isRhfFieldName(value: string): value is keyof RhfFormValues {
  return RHF_FIELD_NAMES.some((fieldName) => fieldName === value);
}

export function RhfForm({ onSuccess }: RhfFormProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RhfFormValues>({
    resolver: zodResolver(rhfFormSchema),
    defaultValues: {
      name: '',
      age: '',
      email: '',
      gender: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: RhfFormValues): Promise<void> => {
    const parsed = submissionInputSchema.safeParse({
      source: 'rhf',
      name: values.name,
      age: values.age,
      email: values.email,
      gender: values.gender,
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const fieldName = firstIssue?.path[0];
      const message = firstIssue?.message ?? 'Please check the form fields.';
      if (typeof fieldName === 'string' && isRhfFieldName(fieldName)) {
        setError(fieldName, { message });
      } else {
        setError('root', { message });
      }
      return;
    }

    dispatch(addSubmission(parsed.data));
    reset();
    onSuccess();
  };

  return (
    <form
      className="registration-form"
      noValidate
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-name">
          {FORM_LABELS.name}
        </label>
        <input
          id="rhf-name"
          className="registration-form__input"
          type="text"
          autoComplete="name"
          {...register('name')}
        />
        {errors.name && (
          <p className="registration-form__error">{errors.name.message}</p>
        )}
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-age">
          {FORM_LABELS.age}
        </label>
        <input
          id="rhf-age"
          className="registration-form__input"
          type="number"
          min={1}
          max={120}
          {...register('age')}
        />
        {errors.age && (
          <p className="registration-form__error">{errors.age.message}</p>
        )}
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-email">
          {FORM_LABELS.email}
        </label>
        <input
          id="rhf-email"
          className="registration-form__input"
          type="email"
          autoComplete="email"
          {...register('email')}
        />
        {errors.email && (
          <p className="registration-form__error">{errors.email.message}</p>
        )}
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-gender">
          {FORM_LABELS.gender}
        </label>
        <select
          id="rhf-gender"
          className="registration-form__select"
          {...register('gender')}
        >
          <option value="" disabled>
            Select gender
          </option>
          {GENDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.gender && (
          <p className="registration-form__error">{errors.gender.message}</p>
        )}
      </div>
      <div className="registration-form__field registration-form__field--inline">
        <input
          id="rhf-terms"
          className="registration-form__checkbox-input"
          type="checkbox"
          {...register('acceptTerms')}
        />
        <label className="registration-form__checkbox" htmlFor="rhf-terms">
          {FORM_LABELS.terms}
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="registration-form__error">{errors.acceptTerms.message}</p>
      )}
      {errors.root && (
        <p className="registration-form__error" role="alert">
          {errors.root.message}
        </p>
      )}
      <button
        type="submit"
        className="registration-form__submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}
