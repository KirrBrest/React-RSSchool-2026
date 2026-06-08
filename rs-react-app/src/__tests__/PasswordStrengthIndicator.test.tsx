import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator/PasswordStrengthIndicator';

describe('PasswordStrengthIndicator', () => {
  it('shows password strength requirements', () => {
    render(<PasswordStrengthIndicator password="a" />);

    expect(screen.getByText('1 number')).toBeInTheDocument();
    expect(screen.getByText('1 uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 special character')).toBeInTheDocument();
  });

  it('marks satisfied requirements for a strong password', () => {
    render(<PasswordStrengthIndicator password="Secret1!" />);

    expect(screen.getByText('1 number').className).toContain('--passed');
    expect(screen.getByText('1 uppercase letter').className).toContain('--passed');
    expect(screen.getByText('1 lowercase letter').className).toContain('--passed');
    expect(screen.getByText('1 special character').className).toContain('--passed');
  });
});
