import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSubmissions, selectSubmissions } from '../store';
import { store } from '../store/index';
import { UncontrolledForm } from '../components/forms/UncontrolledForm';
import { ReduxProvider } from '../store/ReduxProvider';
import { createTestImageFile } from './testImageFile';

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

    await user.type(screen.getByLabelText('Name'), 'Grace Hopper');
    await user.type(screen.getByLabelText('Age'), '45');
    await user.type(screen.getByLabelText('Email'), 'grace@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm password'), 'secret123');
    fireEvent.click(screen.getByLabelText('Female'));
    await user.type(screen.getByLabelText('Country'), 'United States');
    const fileInput = screen.getByLabelText('Profile picture');
    await user.upload(fileInput, createTestImageFile());
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    const submissions = selectSubmissions(store.getState());
    expect(submissions).toHaveLength(1);
    expect(submissions[0]?.source).toBe('uncontrolled');
    expect(submissions[0]?.name).toBe('Grace Hopper');
  });
});
