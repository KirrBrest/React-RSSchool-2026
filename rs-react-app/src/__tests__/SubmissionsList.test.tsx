import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SUBMISSION_HIGHLIGHT_DURATION_MS } from '../constants/submissionHighlight';
import { SubmissionsList } from '../components/SubmissionsList/SubmissionsList';
import { addSubmission, clearSubmissions, selectLastSubmittedId } from '../store';
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
    expect(screen.getByAltText('Grace Hopper profile')).toBeInTheDocument();
    expect(document.querySelector('.submission-card--highlighted')).not.toBeNull();
  });

  it('clears the submission highlight after a timeout', () => {
    vi.useFakeTimers();

    store.dispatch(
      addSubmission({
        source: 'rhf',
        name: 'Alan Turing',
        age: 41,
        email: 'alan@example.com',
        gender: 'male',
        country: 'United Kingdom',
        pictureDataUrl: 'data:image/png;base64,abc',
      })
    );

    render(
      <ReduxProvider>
        <SubmissionsList />
      </ReduxProvider>
    );

    expect(selectLastSubmittedId(store.getState())).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(SUBMISSION_HIGHLIGHT_DURATION_MS);
    });

    expect(selectLastSubmittedId(store.getState())).toBeNull();
    expect(document.querySelector('.submission-card--highlighted')).toBeNull();

    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
