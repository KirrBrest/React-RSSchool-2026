import { useRef, useState, type FormEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store';
import { FORM_LABELS, GENDER_OPTIONS } from '../../constants/formLabels';
import {
  mapZodErrorsToFields,
  uncontrolledFormSchema,
  type UncontrolledFieldName,
} from '../../validation/formSchemas';
import { submissionInputSchema } from '../../validation/submissionSchema';
import { readFileAsDataUrl } from '../../utils/readFileAsDataUrl';
import { CountryAutocomplete } from '../CountryAutocomplete/CountryAutocomplete';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator/PasswordStrengthIndicator';
import { FieldError } from './FieldError';
import './FormFields.css';
import '../CountryAutocomplete/CountryAutocomplete.css';
import '../PasswordStrengthIndicator/PasswordStrengthIndicator.css';

type UncontrolledFormProps = {
  onSuccess: () => void;
};

function getPictureFile(form: HTMLFormElement): File | null {
  const pictureField = form.elements.namedItem('picture');
  if (!(pictureField instanceof HTMLInputElement)) {
    return null;
  }
  return pictureField.files?.item(0) ?? null;
}

export function UncontrolledForm({ onSuccess }: UncontrolledFormProps) {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<UncontrolledFieldName, string>>
  >({});
  const [passwordValue, setPasswordValue] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setFieldErrors({});
    const form = formRef.current;
    if (form === null) {
      return;
    }

    const formData = new FormData(form);
    const validated = uncontrolledFormSchema.safeParse({
      name: String(formData.get('name') ?? ''),
      age: String(formData.get('age') ?? ''),
      email: String(formData.get('email') ?? ''),
      gender: String(formData.get('gender') ?? ''),
      acceptTerms: formData.get('acceptTerms') === 'on',
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
      country: String(formData.get('country') ?? ''),
      picture: getPictureFile(form),
    });

    if (!validated.success) {
      setFieldErrors(mapZodErrorsToFields(validated.error));
      return;
    }

    const pictureFile = validated.data.picture;
    if (pictureFile === null) {
      setFieldErrors({ picture: 'Profile picture is required.' });
      return;
    }

    let pictureDataUrl = '';
    try {
      pictureDataUrl = await readFileAsDataUrl(pictureFile);
    } catch {
      setFieldErrors({ picture: 'Profile picture could not be read.' });
      return;
    }

    const parsed = submissionInputSchema.safeParse({
      source: 'uncontrolled',
      name: validated.data.name,
      age: validated.data.age,
      email: validated.data.email,
      gender: validated.data.gender,
      country: validated.data.country,
      pictureDataUrl,
    });

    if (!parsed.success) {
      setFieldErrors(mapZodErrorsToFields(parsed.error));
      return;
    }

    dispatch(addSubmission(parsed.data));
    form.reset();
    setPasswordValue('');
    setFieldErrors({});
    onSuccess();
  };

  return (
    <form
      ref={formRef}
      className="registration-form"
      noValidate
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="uncontrolled-name">
          {FORM_LABELS.name}
        </label>
        <input
          id="uncontrolled-name"
          className="registration-form__input"
          type="text"
          name="name"
          autoComplete="name"
        />
        <FieldError message={fieldErrors.name} />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="uncontrolled-age">
          {FORM_LABELS.age}
        </label>
        <input
          id="uncontrolled-age"
          className="registration-form__input"
          type="number"
          name="age"
          min={0}
        />
        <FieldError message={fieldErrors.age} />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="uncontrolled-email">
          {FORM_LABELS.email}
        </label>
        <input
          id="uncontrolled-email"
          className="registration-form__input"
          type="email"
          name="email"
          autoComplete="email"
        />
        <FieldError message={fieldErrors.email} />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="uncontrolled-gender">
          {FORM_LABELS.gender}
        </label>
        <select
          id="uncontrolled-gender"
          className="registration-form__select"
          name="gender"
          defaultValue=""
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
        <FieldError message={fieldErrors.gender} />
      </div>
      <div className="registration-form__field registration-form__field--inline">
        <input
          id="uncontrolled-terms"
          className="registration-form__checkbox-input"
          type="checkbox"
          name="acceptTerms"
        />
        <label className="registration-form__checkbox" htmlFor="uncontrolled-terms">
          {FORM_LABELS.terms}
        </label>
      </div>
      <FieldError message={fieldErrors.acceptTerms} />
      <div className="registration-form__field">
        <label
          className="registration-form__label"
          htmlFor="uncontrolled-password"
        >
          {FORM_LABELS.password}
        </label>
        <input
          id="uncontrolled-password"
          className="registration-form__input"
          type="password"
          name="password"
          autoComplete="new-password"
          value={passwordValue}
          onChange={(event) => {
            setPasswordValue(event.target.value);
          }}
        />
        <PasswordStrengthIndicator password={passwordValue} />
        <FieldError message={fieldErrors.password} />
      </div>
      <div className="registration-form__field">
        <label
          className="registration-form__label"
          htmlFor="uncontrolled-confirm-password"
        >
          {FORM_LABELS.confirmPassword}
        </label>
        <input
          id="uncontrolled-confirm-password"
          className="registration-form__input"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
        />
        <FieldError message={fieldErrors.confirmPassword} />
      </div>
      <div className="registration-form__field">
        <label
          className="registration-form__label"
          htmlFor="uncontrolled-country"
        >
          {FORM_LABELS.country}
        </label>
        <CountryAutocomplete
          id="uncontrolled-country"
          variant="uncontrolled"
          name="country"
          error={fieldErrors.country}
        />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="uncontrolled-picture">
          {FORM_LABELS.picture}
        </label>
        <input
          id="uncontrolled-picture"
          className="registration-form__input"
          type="file"
          name="picture"
          accept="image/png,image/jpeg"
        />
        <FieldError message={fieldErrors.picture} />
      </div>
      <button type="submit" className="registration-form__submit">
        Submit
      </button>
    </form>
  );
}
