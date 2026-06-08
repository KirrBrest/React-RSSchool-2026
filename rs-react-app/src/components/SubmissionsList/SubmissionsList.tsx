import { useEffect } from 'react';
import { SUBMISSION_HIGHLIGHT_DURATION_MS } from '../../constants/submissionHighlight';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  clearSubmissionHighlight,
  selectLastSubmittedId,
  selectSubmissions,
} from '../../store';
import { SubmissionCard } from '../SubmissionCard/SubmissionCard';
import './SubmissionsList.css';

export function SubmissionsList() {
  const dispatch = useAppDispatch();
  const submissions = useAppSelector(selectSubmissions);
  const lastSubmittedId = useAppSelector(selectLastSubmittedId);

  useEffect(() => {
    if (lastSubmittedId === null) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(clearSubmissionHighlight());
    }, SUBMISSION_HIGHLIGHT_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [dispatch, lastSubmittedId]);

  if (submissions.length === 0) {
    return <p className="submissions-list__empty">No submissions yet.</p>;
  }

  return (
    <ul className="submissions-list">
      {submissions.map((submission) => (
        <li key={submission.id} className="submissions-list__item">
          <SubmissionCard
            submission={submission}
            isHighlighted={submission.id === lastSubmittedId}
          />
        </li>
      ))}
    </ul>
  );
}
