import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { SubmissionsList } from '../components/SubmissionsList/SubmissionsList';
import { addSubmission, clearSubmissions } from '../store';
import { store } from '../store/index';
import { ReduxProvider } from '../store/ReduxProvider';

describe('SubmissionsList', () => {
  beforeEach(() => {
    store.dispatch(clearSubmissions());
  });

  it('shows an empty message when there are no submissions', () => {
    render(
      <ReduxProvider>
        <SubmissionsList />
      </ReduxProvider>
    );
    expect(screen.getByText('No submissions yet.')).toBeInTheDocument();
  });

  it('renders submission cards for stored items', () => {
    store.dispatch(
      addSubmission({
        source: 'uncontrolled',
        name: 'Grace Hopper',
        age: 45,
        email: 'grace@example.com',
        gender: 'female',
        country: 'United States',
        pictureDataUrl: 'data:image/png;base64,abc',
      })
    );

    render(
      <ReduxProvider>
        <SubmissionsList />
      </ReduxProvider>
    );

    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(screen.getByText(/Submitted via Uncontrolled/)).toBeInTheDocument();
  });
});
