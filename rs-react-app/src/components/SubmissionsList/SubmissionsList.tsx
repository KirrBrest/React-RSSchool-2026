import { useAppSelector } from '../../store/hooks';
import { selectSubmissions } from '../../store';
import { SubmissionCard } from '../SubmissionCard/SubmissionCard';
import './SubmissionsList.css';

export function SubmissionsList() {
  const submissions = useAppSelector(selectSubmissions);

  if (submissions.length === 0) {
    return <p className="submissions-list__empty">No submissions yet.</p>;
  }

  return (
    <ul className="submissions-list">
      {submissions.map((submission) => (
        <li key={submission.id} className="submissions-list__item">
          <SubmissionCard submission={submission} />
        </li>
      ))}
    </ul>
  );
}
