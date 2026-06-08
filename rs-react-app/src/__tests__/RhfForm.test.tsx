import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSubmissions, selectSubmissions } from '../store';
import { store } from '../store/index';
import { RhfForm } from '../components/forms/RhfForm';
import { ReduxProvider } from '../store/ReduxProvider';
import * as readFileModule from '../utils/readFileAsDataUrl';
import {
  submissionInputSchema,
} from '../validation/submissionSchema';
import { fillAdvancedFormFields, fillBasicFormFields } from './formTestHelpers';

function renderRhfForm(onSuccess = vi.fn()) {
  return {
    onSuccess,
    ...render(
      <ReduxProvider>
        <RhfForm onSuccess={onSuccess} />
      </ReduxProvider>
    ),
  };
}

async function fillValidRhfForm(user: ReturnType<typeof userEvent.setup>) {
  await fillBasicFormFields(user, {
    name: 'Alan Turing',
    age: '41',
    email: 'alan@example.com',
    gender: 'male',
  });
  await fillAdvancedFormFields(user);
}

describe('RhfForm', () => {
  beforeEach(() => {
    store.dispatch(clearSubmissions());
    vi.restoreAllMocks();
  });

  it('renders all form fields', () => {
    renderRhfForm();

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('I accept the Terms and Conditions')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile picture')).toBeInTheDocument();
  });

  it('shows live validation errors for invalid email', async () => {
    const user = userEvent.setup();
    renderRhfForm();

    await user.type(screen.getByLabelText('Email'), 'invalid-email');

    expect(
      await screen.findByText('Enter a valid email address.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('stores a successful submission in Redux', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    renderRhfForm(onSuccess);

    await fillBasicFormFields(user, {
      name: 'Alan Turing',
      age: '41',
      email: 'alan@example.com',
      gender: 'male',
    });
    await fillAdvancedFormFields(user);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    const submissions = selectSubmissions(store.getState());
    expect(submissions).toHaveLength(1);
    expect(submissions[0]?.source).toBe('rhf');
    expect(submissions[0]?.name).toBe('Alan Turing');
    expect(submissions[0]?.email).toBe('alan@example.com');
    expect(submissions[0]?.gender).toBe('male');
  });

  it('requires accepting the Terms and Conditions', async () => {
    const user = userEvent.setup();
    renderRhfForm();

    await fillBasicFormFields(user, {
      name: 'Ada Lovelace',
      age: '36',
      email: 'ada@example.com',
      gender: 'female',
      acceptTerms: false,
    });

    const termsCheckbox = screen.getByLabelText('I accept the Terms and Conditions');
    await user.click(termsCheckbox);
    await user.click(termsCheckbox);

    expect(
      await screen.findByText('You must accept the Terms and Conditions.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('disables submit while the form is invalid', () => {
    renderRhfForm();

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('selects a country through the autocomplete control', async () => {
    const user = userEvent.setup();
    renderRhfForm();

    const countryInput = screen.getByLabelText('Country');
    await user.click(countryInput);
    await user.click(screen.getByRole('option', { name: 'Belarus' }));

    expect(countryInput).toHaveValue('Belarus');
  });

  it('shows live validation for an unknown country', async () => {
    const user = userEvent.setup();
    renderRhfForm();

    await user.type(screen.getByLabelText('Country'), 'Atlantis');

    expect(
      await screen.findByText('Choose a country from the list.')
    ).toBeInTheDocument();
  });

  it('keeps submit disabled until a profile picture is provided', async () => {
    const user = userEvent.setup();
    renderRhfForm();

    await fillBasicFormFields(user, {
      name: 'Alan Turing',
      age: '41',
      email: 'alan@example.com',
      gender: 'male',
    });
    await user.type(screen.getByLabelText('Password'), 'Secret1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Secret1!');
    await user.type(screen.getByLabelText('Country'), 'United States');

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('shows an error when the profile picture cannot be read', async () => {
    const user = userEvent.setup();
    vi.spyOn(readFileModule, 'readFileAsDataUrl').mockRejectedValueOnce(
      new Error('read failed')
    );
    renderRhfForm();

    await fillValidRhfForm(user);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Profile picture could not be read.')
    ).toBeInTheDocument();
  });

  it('maps submission schema errors back to form fields', async () => {
    const user = userEvent.setup();
    const invalidSubmission = submissionInputSchema.safeParse({
      source: 'rhf',
      name: 'Grace',
      age: '30',
      email: 'grace@example.com',
      gender: 'female',
      country: 'Atlantis',
      pictureDataUrl: 'data:image/png;base64,abc',
    });
    if (invalidSubmission.success) {
      throw new Error('Expected submission validation to fail.');
    }
    vi.spyOn(submissionInputSchema, 'safeParse').mockReturnValueOnce(
      invalidSubmission
    );
    renderRhfForm();

    await fillValidRhfForm(user);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Choose a country from the list.')
    ).toBeInTheDocument();
  });

  it('requires matching passwords', async () => {
    const user = userEvent.setup();
    renderRhfForm();

    await fillBasicFormFields(user, { gender: 'male' });
    await user.type(screen.getByLabelText('Password'), 'Secret1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Different1!');
    await user.type(screen.getByLabelText('Country'), 'United States');
    await user.upload(
      screen.getByLabelText('Profile picture'),
      new File(['image-bytes'], 'profile.png', { type: 'image/png' })
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    expect(await screen.findByText('Passwords must match.')).toBeInTheDocument();
  });
});
