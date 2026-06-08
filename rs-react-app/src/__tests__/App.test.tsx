import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { ReduxProvider } from '../store/ReduxProvider';

function renderApp() {
  return render(
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
}

describe('App', () => {
  it('opens the uncontrolled form modal from the main page', () => {
    renderApp();
    fireEvent.click(
      screen.getByRole('button', { name: 'Open Uncontrolled Form' })
    );
    expect(
      screen.getByRole('dialog', { name: 'Uncontrolled Form' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Uncontrolled form will be implemented here.')
    ).toBeInTheDocument();
  });

  it('opens the React Hook Form modal from the main page', () => {
    renderApp();
    fireEvent.click(
      screen.getByRole('button', { name: 'Open React Hook Form' })
    );
    expect(
      screen.getByRole('dialog', { name: 'React Hook Form' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('React Hook Form will be implemented here.')
    ).toBeInTheDocument();
  });

  it('uses the same modal component for both form types', () => {
    renderApp();
    fireEvent.click(
      screen.getByRole('button', { name: 'Open Uncontrolled Form' })
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));

    fireEvent.click(
      screen.getByRole('button', { name: 'Open React Hook Form' })
    );
    expect(
      screen.getByRole('dialog', { name: 'React Hook Form' })
    ).toBeInTheDocument();
  });
});
