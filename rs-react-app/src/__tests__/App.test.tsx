import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';
import { clearSubmissions } from '../store';
import { store } from '../store/index';
import { ReduxProvider } from '../store/ReduxProvider';
import { fillAdvancedFormFields, fillBasicFormFields } from './formTestHelpers';

function renderApp() {
  return render(
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
}

async function submitUncontrolledForm(user: ReturnType<typeof userEvent.setup>) {
  await fillBasicFormFields(user, { gender: 'female' });
  await fillAdvancedFormFields(user);
  await user.click(screen.getByRole('button', { name: 'Submit' }));
}

describe('App', () => {
  beforeEach(() => {
    store.dispatch(clearSubmissions());
  });

  it('opens the uncontrolled form modal from the main page', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(
      screen.getByRole('button', { name: 'Open Uncontrolled Form' })
    );
    expect(
      screen.getByRole('dialog', { name: 'Uncontrolled Form' })
    ).toBeInTheDocument();
  });

  it('opens the React Hook Form modal from the main page', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(
      screen.getByRole('button', { name: 'Open React Hook Form' })
    );
    expect(
      screen.getByRole('dialog', { name: 'React Hook Form' })
    ).toBeInTheDocument();
  });

  it('displays submission cards on the main page after successful submits', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      screen.getByRole('button', { name: 'Open Uncontrolled Form' })
    );
    await submitUncontrolledForm(user);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(screen.getByText(/Submitted via Uncontrolled/)).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Open React Hook Form' })
    );
    await fillBasicFormFields(user, {
      name: 'Alan Turing',
      age: '41',
      email: 'alan@example.com',
      gender: 'male',
    });
    await fillAdvancedFormFields(user);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Alan Turing')).toBeInTheDocument();
    });
    expect(screen.getByText(/Submitted via React Hook Form/)).toBeInTheDocument();
  });
});
