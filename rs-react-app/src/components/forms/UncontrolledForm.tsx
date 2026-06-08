import { useRef, useState, type FormEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store';
import { submissionInputSchema } from '../../validation/submissionSchema';
import { parseGenderValue } from '../../utils/parseGenderValue';
import { readFileAsDataUrl } from '../../utils/readFileAsDataUrl';
import { CountryAutocomplete } from '../CountryAutocomplete/CountryAutocomplete';
import './FormFields.css';
import '../CountryAutocomplete/CountryAutocomplete.css';

type UncontrolledFormProps = {
  onSuccess: () => void;
};

function getPictureFile(form: HTMLFormElement): File | null {
  const pictureField = form.elements.namedItem('picture');
  if (!(pictureField instanceof HTMLInputElement)) {
    return null;
  }
  const file = pictureField.files?.item(0);
  if (file === undefined || file === null) {
    return null;
  }
  return file;
}

export function UncontrolledForm({ onSuccess }: UncontrolledFormProps) {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setSubmitError(null);
    const form = formRef.current;
    if (form === null) {
      return;
    }

    const formData = new FormData(form);
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');
    if (password !== confirmPassword) {
      setSubmitError('Passwords must match.');
      return;
    }

    const pictureFile = getPictureFile(form);
    if (pictureFile === null) {
      setSubmitError('Profile picture is required.');
      return;
    }

    let pictureDataUrl = '';
    try {
      pictureDataUrl = await readFileAsDataUrl(pictureFile);
    } catch {
      setSubmitError('Profile picture could not be read.');
      return;
    }

    const gender = parseGenderValue(formData.get('gender'));
    if (gender === null) {
      setSubmitError('Choose a gender.');
      return;
    }

    const parsed = submissionInputSchema.safeParse({
      source: 'uncontrolled',
      name: String(formData.get('name') ?? ''),
      age: String(formData.get('age') ?? ''),
      email: String(formData.get('email') ?? ''),
      gender,
      country: String(formData.get('country') ?? ''),
      pictureDataUrl,
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setSubmitError(firstIssue?.message ?? 'Please check the form fields.');
      return;
    }

    dispatch(addSubmission(parsed.data));
    form.reset();
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
          Name
        </label>
        <input
          id="uncontrolled-name"
          className="registration-form__input"
          type="text"
          name="name"
          autoComplete="name"
        />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="uncontrolled-age">
          Age
        </label>
        <input
          id="uncontrolled-age"
          className="registration-form__input"
          type="number"
          name="age"
          min={1}
          max={120}
        />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="uncontrolled-email">
          Email
        </label>
        <input
          id="uncontrolled-email"
          className="registration-form__input"
          type="email"
          name="email"
          autoComplete="email"
        />
      </div>
      <div className="registration-form__field">
        <label
          className="registration-form__label"
          htmlFor="uncontrolled-password"
        >
          Password
        </label>
        <input
          id="uncontrolled-password"
          className="registration-form__input"
          type="password"
          name="password"
          autoComplete="new-password"
        />
      </div>
      <div className="registration-form__field">
        <label
          className="registration-form__label"
          htmlFor="uncontrolled-confirm-password"
        >
          Confirm password
        </label>
        <input
          id="uncontrolled-confirm-password"
          className="registration-form__input"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
        />
      </div>
      <fieldset className="registration-form__field">
        <legend className="registration-form__label">Gender</legend>
        <div className="registration-form__radios">
          <label className="registration-form__radio">
            <input type="radio" name="gender" value="male" />
            Male
          </label>
          <label className="registration-form__radio">
            <input type="radio" name="gender" value="female" />
            Female
          </label>
          <label className="registration-form__radio">
            <input type="radio" name="gender" value="other" />
            Other
          </label>
        </div>
      </fieldset>
      <div className="registration-form__field">
        <label
          className="registration-form__label"
          htmlFor="uncontrolled-country"
        >
          Country
        </label>
        <CountryAutocomplete
          id="uncontrolled-country"
          variant="uncontrolled"
          name="country"
        />
      </div>
      <div className="registration-form__field">
        <label className="registration-form__label" htmlFor="uncontrolled-picture">
          Profile picture
        </label>
        <input
          id="uncontrolled-picture"
          className="registration-form__input"
          type="file"
          name="picture"
          accept="image/png,image/jpeg,image/webp"
        />
      </div>
      {submitError !== null && (
        <p className="registration-form__error" role="alert">
          {submitError}
        </p>
      )}
      <button type="submit" className="registration-form__submit">
        Submit
      </button>
    </form>
  );
}
