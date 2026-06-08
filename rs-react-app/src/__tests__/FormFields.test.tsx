import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RhfForm } from '../components/forms/RhfForm';
import { UncontrolledForm } from '../components/forms/UncontrolledForm';
import { FORM_LABELS } from '../constants/formLabels';
import { ReduxProvider } from '../store/ReduxProvider';

const BASIC_FIELD_LABELS = [
  FORM_LABELS.name,
  FORM_LABELS.age,
  FORM_LABELS.email,
  FORM_LABELS.gender,
  FORM_LABELS.terms,
] as const;

function expectConnectedBasicFields(): void {
  for (const label of BASIC_FIELD_LABELS) {
    const field = screen.getByLabelText(label);
    expect(field).toBeInTheDocument();
    expect(field.id).not.toBe('');
  }
}

describe('Form basic fields', () => {
  it('renders connected basic fields in the uncontrolled form', () => {
    render(
      <ReduxProvider>
        <UncontrolledForm onSuccess={() => {}} />
      </ReduxProvider>
    );
    expectConnectedBasicFields();
    expect(screen.getByLabelText(FORM_LABELS.name)).toHaveAttribute(
      'id',
      'uncontrolled-name'
    );
    expect(screen.getByLabelText(FORM_LABELS.terms)).toHaveAttribute(
      'id',
      'uncontrolled-terms'
    );
  });

  it('renders connected basic fields in the React Hook Form', () => {
    render(
      <ReduxProvider>
        <RhfForm onSuccess={() => {}} />
      </ReduxProvider>
    );
    expectConnectedBasicFields();
    expect(screen.getByLabelText(FORM_LABELS.name)).toHaveAttribute(
      'id',
      'rhf-name'
    );
    expect(screen.getByLabelText(FORM_LABELS.gender)).toHaveAttribute(
      'id',
      'rhf-gender'
    );
  });
});
