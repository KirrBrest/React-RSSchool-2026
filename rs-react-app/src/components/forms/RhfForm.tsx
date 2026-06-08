import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store';
import { submissionInputSchema } from '../../validation/submissionSchema';
import { readFileAsDataUrl } from '../../utils/readFileAsDataUrl';
import { CountryAutocomplete } from '../CountryAutocomplete/CountryAutocomplete';
import './FormFields.css';
import '../CountryAutocomplete/CountryAutocomplete.css';

const rhfFormSchema = z
  .object({
    name: z.string(),
    age: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    country: z.string(),
    picture: z.custom<FileList | undefined>(),
  })
  .superRefine((values, context) => {
    if (values.password !== values.confirmPassword) {
      context.addIssue({
        code: 'custom',
        message: 'Passwords must match.',
        path: ['confirmPassword'],
      });
    }
  });

type RhfFormValues = z.infer<typeof rhfFormSchema>;

type RhfFormProps = {
  onSuccess: () => void;
};

const RHF_FIELD_NAMES: readonly (keyof RhfFormValues)[] = [
  'name',
  'age',
  'email',
  'password',
  'confirmPassword',
  'gender',
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
  const file = files.item(0);
  if (file === null) {
    return null;
  }
  return file;
}

export function RhfForm({ onSuccess }: RhfFormProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RhfFormValues>({
    resolver: zodResolver(rhfFormSchema),
    defaultValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      country: '',
    },
  });

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
          Name
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
          Age
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
          Email
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
        <label className="registration-form__label" htmlFor="rhf-password">
          Password
        </label>
        <input
          id="rhf-password"
          className="registration-form__input"
          type="password"
          autoComplete="new-password"
          {...register('password')}
        />
        {errors.password && (
          <p className="registration-form__error">{errors.password.message}</p>
        )}
      </div>
      <div className="registration-form__field">
        <label
          className="registration-form__label"
          htmlFor="rhf-confirm-password"
        >
          Confirm password
        </label>
        <input
          id="rhf-confirm-password"
          className="registration-form__input"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="registration-form__error">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <fieldset className="registration-form__field">
        <legend className="registration-form__label">Gender</legend>
        <div className="registration-form__radios">
          <label className="registration-form__radio">
            <input type="radio" value="male" {...register('gender')} />
            Male
          </label>
          <label className="registration-form__radio">
            <input type="radio" value="female" {...register('gender')} />
            Female
          </label>
          <label className="registration-form__radio">
            <input type="radio" value="other" {...register('gender')} />
            Other
          </label>
        </div>
        {errors.gender && (
          <p className="registration-form__error">{errors.gender.message}</p>
        )}
      </fieldset>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-country">
          Country
        </label>
        <CountryAutocomplete
          id="rhf-country"
          variant="rhf"
          registration={register('country')}
          setCountryValue={(value) => {
            setValue('country', value, { shouldDirty: true, shouldTouch: true });
          }}
          error={errors.country?.message}
        />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="rhf-picture">
          Profile picture
        </label>
        <input
          id="rhf-picture"
          className="registration-form__input"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          {...register('picture')}
        />
        {errors.picture && (
          <p className="registration-form__error">{errors.picture.message}</p>
        )}
      </div>
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
