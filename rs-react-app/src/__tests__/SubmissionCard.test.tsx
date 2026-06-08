import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SubmissionCard } from '../components/SubmissionCard/SubmissionCard';

const submission = {
  id: 'submission-1',
  source: 'uncontrolled',
  name: 'Grace Hopper',
  age: 45,
  email: 'grace@example.com',
  gender: 'female',
  country: 'United States',
  pictureDataUrl: 'data:image/png;base64,abc',
  submittedAt: '2026-05-19T00:00:00.000Z',
} as const;

describe('SubmissionCard', () => {
  it('highlights a newly submitted card', () => {
    const { container } = render(
      <SubmissionCard submission={submission} isHighlighted />
    );

    expect(container.querySelector('.submission-card--highlighted')).not.toBeNull();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
  });
});
