import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSubmissions, selectSubmissions } from '../store';
import { store } from '../store/index';
import { RhfForm } from '../components/forms/RhfForm';
import { ReduxProvider } from '../store/ReduxProvider';
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

describe('RhfForm', () => {
  beforeEach(() => {
    store.dispatch(clearSubmissions());
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
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('You must accept the Terms and Conditions.')
    ).toBeInTheDocument();
  });
});
