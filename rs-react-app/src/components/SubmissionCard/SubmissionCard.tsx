import type { FormSubmission } from '../../types/formSubmission';
import './SubmissionCard.css';

type SubmissionCardProps = {
  submission: FormSubmission;
  isHighlighted?: boolean;
};

const SOURCE_LABELS: Record<FormSubmission['source'], string> = {
  uncontrolled: 'Uncontrolled',
  rhf: 'React Hook Form',
};

export function SubmissionCard({
  submission,
  isHighlighted = false,
}: SubmissionCardProps) {
  const cardClassName = isHighlighted
    ? 'submission-card submission-card--highlighted'
    : 'submission-card';

  return (
    <article
      className={cardClassName}
      aria-label={`Submission by ${submission.name}`}
    >
      <img
        className="submission-card__image"
        src={submission.pictureDataUrl}
        alt={`${submission.name} profile`}
      />
      <div className="submission-card__body">
        <h3 className="submission-card__name">{submission.name}</h3>
        <p className="submission-card__meta">
          <span>{submission.email}</span>
          <span>
            Age {submission.age} · {submission.gender}
          </span>
          <span>{submission.country}</span>
        </p>
        <p className="submission-card__source">
          Submitted via {SOURCE_LABELS[submission.source]}
        </p>
      </div>
    </article>
  );
}
