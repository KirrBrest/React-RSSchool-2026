import { useRef, useState, type FormEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store';
import { FORM_LABELS, GENDER_OPTIONS } from '../../constants/formLabels';
import { submissionInputSchema } from '../../validation/submissionSchema';
import { isTermsAccepted } from '../../utils/isTermsAccepted';
import { parseGenderValue } from '../../utils/parseGenderValue';
import './FormFields.css';

type UncontrolledFormProps = {
  onSuccess: () => void;
};

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

    if (!isTermsAccepted(formData)) {
      setSubmitError('You must accept the Terms and Conditions.');
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
          {FORM_LABELS.name}
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
          {FORM_LABELS.age}
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
          {FORM_LABELS.email}
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
