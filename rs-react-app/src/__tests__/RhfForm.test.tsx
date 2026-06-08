import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSubmissions, selectSubmissions } from '../store';
import { store } from '../store/index';
import { RhfForm } from '../components/forms/RhfForm';
import { ReduxProvider } from '../store/ReduxProvider';
import { createTestImageFile } from './testImageFile';

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

    await user.type(screen.getByLabelText('Name'), 'Alan Turing');
    await user.type(screen.getByLabelText('Age'), '41');
    await user.type(screen.getByLabelText('Email'), 'alan@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm password'), 'secret123');
    await user.click(screen.getByLabelText('Male'));
    await user.type(screen.getByLabelText('Country'), 'United Kingdom');
    const fileInput = screen.getByLabelText('Profile picture');
    await user.upload(fileInput, createTestImageFile());
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    const submissions = selectSubmissions(store.getState());
    expect(submissions).toHaveLength(1);
    expect(submissions[0]?.source).toBe('rhf');
    expect(submissions[0]?.name).toBe('Alan Turing');
  });
});
