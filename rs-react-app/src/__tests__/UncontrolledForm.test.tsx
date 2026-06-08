import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MAX_PROFILE_IMAGE_SIZE_BYTES } from '../constants/imageUpload';
import { clearSubmissions, selectSubmissions } from '../store';
import { store } from '../store/index';
import { UncontrolledForm } from '../components/forms/UncontrolledForm';
import { ReduxProvider } from '../store/ReduxProvider';
import * as readFileModule from '../utils/readFileAsDataUrl';
import { fillAdvancedFormFields, fillBasicFormFields } from './formTestHelpers';

function renderUncontrolledForm(onSuccess = vi.fn()) {
  return {
    onSuccess,
    ...render(
      <ReduxProvider>
        <UncontrolledForm onSuccess={onSuccess} />
      </ReduxProvider>
    ),
  };
}

describe('UncontrolledForm', () => {
  beforeEach(() => {
    store.dispatch(clearSubmissions());
    vi.restoreAllMocks();
  });

  it('renders all form fields', () => {
    renderUncontrolledForm();

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

  it('stores a successful submission in Redux', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    renderUncontrolledForm(onSuccess);

    await fillBasicFormFields(user, { gender: 'female' });
    await fillAdvancedFormFields(user);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    const submissions = selectSubmissions(store.getState());
    expect(submissions).toHaveLength(1);
    expect(submissions[0]?.source).toBe('uncontrolled');
    expect(submissions[0]?.name).toBe('Grace Hopper');
    expect(submissions[0]?.email).toBe('grace@example.com');
    expect(submissions[0]?.gender).toBe('female');
  });

  it('requires accepting the Terms and Conditions', async () => {
    const user = userEvent.setup();
    renderUncontrolledForm();

    await fillBasicFormFields(user, {
      name: 'Ada Lovelace',
      age: '36',
      email: 'ada@example.com',
      gender: 'female',
      acceptTerms: false,
    });
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('You must accept the Terms and Conditions.')
    ).toBeInTheDocument();
  });

  it('shows field validation errors on submit', async () => {
    const user = userEvent.setup();
    renderUncontrolledForm();

    await user.type(screen.getByLabelText('Name'), 'john');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Name must start with an uppercase letter.')
    ).toBeInTheDocument();
  });

  it('shows validation errors for invalid email on submit', async () => {
    const user = userEvent.setup();
    renderUncontrolledForm();

    await fillBasicFormFields(user, {
      email: 'invalid-email',
      gender: 'female',
    });
    await fillAdvancedFormFields(user);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Enter a valid email address.')
    ).toBeInTheDocument();
  });

  it('shows validation for negative age on submit', async () => {
    const user = userEvent.setup();
    renderUncontrolledForm();

    await fillBasicFormFields(user, { age: '-3', gender: 'female' });
    await fillAdvancedFormFields(user);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('Age cannot be negative.')).toBeInTheDocument();
  });

  it('shows validation for an unknown country on submit', async () => {
    const user = userEvent.setup();
    renderUncontrolledForm();

    await fillBasicFormFields(user, { gender: 'female' });
    await user.type(screen.getByLabelText('Password'), 'Secret1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Secret1!');
    await user.type(screen.getByLabelText('Country'), 'Atlantis');
    await user.upload(
      screen.getByLabelText('Profile picture'),
      new File(['image-bytes'], 'profile.png', { type: 'image/png' })
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Choose a country from the list.')
    ).toBeInTheDocument();
  });

  it('shows validation for an oversized image on submit', async () => {
    const user = userEvent.setup();
    renderUncontrolledForm();

    await fillBasicFormFields(user, { gender: 'female' });
    await user.type(screen.getByLabelText('Password'), 'Secret1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Secret1!');
    await user.type(screen.getByLabelText('Country'), 'United States');
    await user.upload(
      screen.getByLabelText('Profile picture'),
      new File(
        [new Uint8Array(MAX_PROFILE_IMAGE_SIZE_BYTES + 1)],
        'large.png',
        { type: 'image/png' }
      )
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Profile picture must be 5 MB or smaller.')
    ).toBeInTheDocument();
  });

  it('shows an error when the profile picture cannot be read', async () => {
    const user = userEvent.setup();
    vi.spyOn(readFileModule, 'readFileAsDataUrl').mockRejectedValueOnce(
      new Error('read failed')
    );
    renderUncontrolledForm();

    await fillBasicFormFields(user, { gender: 'female' });
    await fillAdvancedFormFields(user);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Profile picture could not be read.')
    ).toBeInTheDocument();
  });

  it('requires matching passwords on submit', async () => {
    const user = userEvent.setup();
    renderUncontrolledForm();

    await fillBasicFormFields(user, { gender: 'female' });
    await user.type(screen.getByLabelText('Password'), 'Secret1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Different1!');
    await user.type(screen.getByLabelText('Country'), 'United States');
    await user.upload(
      screen.getByLabelText('Profile picture'),
      new File(['image-bytes'], 'profile.png', { type: 'image/png' })
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('Passwords must match.')).toBeInTheDocument();
  });
});
