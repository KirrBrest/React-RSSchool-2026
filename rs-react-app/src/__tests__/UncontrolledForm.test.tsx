import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSubmissions, selectSubmissions } from '../store';
import { store } from '../store/index';
import { UncontrolledForm } from '../components/forms/UncontrolledForm';
import { ReduxProvider } from '../store/ReduxProvider';
import { fillBasicFormFields } from './formTestHelpers';

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
  });

  it('stores a successful submission in Redux', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    renderUncontrolledForm(onSuccess);

    await fillBasicFormFields(user, { gender: 'female' });
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
      await screen.findByRole('alert')
    ).toHaveTextContent('You must accept the Terms and Conditions.');
  });
});
