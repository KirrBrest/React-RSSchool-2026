import type { FormSubmission } from '../../types/formSubmission';
import './SubmissionCard.css';

type SubmissionCardProps = {
  submission: FormSubmission;
};

const SOURCE_LABELS: Record<FormSubmission['source'], string> = {
  uncontrolled: 'Uncontrolled',
  rhf: 'React Hook Form',
};

export function SubmissionCard({ submission }: SubmissionCardProps) {
  return (
    <article className="submission-card" aria-label={`Submission by ${submission.name}`}>
      <div className="submission-card__body">
        <h3 className="submission-card__name">{submission.name}</h3>
        <p className="submission-card__meta">
          <span>{submission.email}</span>
          <span>
            Age {submission.age} · {submission.gender}
          </span>
        </p>
        <p className="submission-card__source">
          Submitted via {SOURCE_LABELS[submission.source]}
        </p>
      </div>
    </article>
  );
}
