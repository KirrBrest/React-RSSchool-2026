import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store';
import { rhfFormSchema } from '../../validation/formSchemas';
import { submissionInputSchema } from '../../validation/submissionSchema';
import { readFileAsDataUrl } from '../../utils/readFileAsDataUrl';
import { FORM_LABELS, GENDER_OPTIONS } from '../../constants/formLabels';
import { CountryAutocomplete } from '../CountryAutocomplete/CountryAutocomplete';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator/PasswordStrengthIndicator';
import { FieldError } from './FieldError';
import './FormFields.css';
import '../CountryAutocomplete/CountryAutocomplete.css';
import '../PasswordStrengthIndicator/PasswordStrengthIndicator.css';

type RhfFormValues = {
  name: string;
  age: string;
  email: string;
  gender: string;
  acceptTerms: boolean;
  password: string;
  confirmPassword: string;
  country: string;
  picture: FileList | undefined;
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
  'password',
  'confirmPassword',
  'country',
  'picture',
];

function isRhfFieldName(value: string): value is keyof RhfFormValues {
  return RHF_FIELD_NAMES.some((fieldName) => fieldName === value);
}

function getPictureFile(files: FileList | undefined): File | null {
  if (files === undefined) {
    return null;
  }
  return files.item(0);
}

export function RhfForm({ onSuccess }: RhfFormProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RhfFormValues>({
    resolver: zodResolver(rhfFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      email: '',
      gender: '',
      acceptTerms: false,
      password: '',
      confirmPassword: '',
      country: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (values: RhfFormValues): Promise<void> => {
    const pictureFile = getPictureFile(values.picture);
    if (pictureFile === null) {
      setError('picture', { message: 'Profile picture is required.' });
      return;
    }

    let pictureDataUrl = '';
    try {
      pictureDataUrl = await readFileAsDataUrl(pictureFile);
    } catch {
      setError('picture', { message: 'Profile picture could not be read.' });
      return;
    }

    const parsed = submissionInputSchema.safeParse({
      source: 'rhf',
      name: values.name,
      age: values.age,
      email: values.email,
      gender: values.gender,
      country: values.country,
      pictureDataUrl,
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const fieldName = firstIssue?.path[0];
      const message = firstIssue?.message ?? 'Please check the form fields.';
      if (typeof fieldName === 'string' && isRhfFieldName(fieldName)) {
        setError(fieldName, { message });
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
        <FieldError message={errors.name?.message} />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-age">
          {FORM_LABELS.age}
        </label>
        <input
          id="rhf-age"
          className="registration-form__input"
          type="number"
          min={0}
          {...register('age')}
        />
        <FieldError message={errors.age?.message} />
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
        <FieldError message={errors.email?.message} />
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
        <FieldError message={errors.gender?.message} />
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
      <FieldError message={errors.acceptTerms?.message} />
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-password">
          {FORM_LABELS.password}
        </label>
        <input
          id="rhf-password"
          className="registration-form__input"
          type="password"
          autoComplete="new-password"
          {...register('password')}
        />
        <PasswordStrengthIndicator password={passwordValue} />
        <FieldError message={errors.password?.message} />
      </div>
      <div className="registration-form__field">
        <label
          className="registration-form__label"
          htmlFor="rhf-confirm-password"
        >
          {FORM_LABELS.confirmPassword}
        </label>
        <input
          id="rhf-confirm-password"
          className="registration-form__input"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
        <FieldError message={errors.confirmPassword?.message} />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-country">
          {FORM_LABELS.country}
        </label>
        <CountryAutocomplete
          id="rhf-country"
          variant="rhf"
          registration={register('country')}
          setCountryValue={(value) => {
            setValue('country', value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }}
          error={errors.country?.message}
        />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-picture">
          {FORM_LABELS.picture}
        </label>
        <input
          id="rhf-picture"
          className="registration-form__input"
          type="file"
          accept="image/png,image/jpeg"
          {...register('picture')}
        />
        <FieldError message={errors.picture?.message} />
      </div>
      <button
        type="submit"
        className="registration-form__submit"
        disabled={isSubmitting || !isValid}
      >
        Submit
      </button>
    </form>
  );
}
