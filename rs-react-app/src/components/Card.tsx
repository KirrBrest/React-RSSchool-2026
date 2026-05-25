import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import type { CardProps } from '../types';
import './Card.css';

export function Card({
  id,
  name,
  isDetailsSelected,
  isChecked,
  onToggleCheck,
  onOpenDetails,
}: CardProps) {
  const personLabel = name || 'person';

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    onToggleCheck();
  };

  const handleOpenDetails = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onOpenDetails(id);
  };

  const handleOpenDetailsKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>
  ): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpenDetails(id);
    }
  };

  const classNames = ['result-card'];
  if (isDetailsSelected) {
    classNames.push('result-card--selected');
  }
  if (isChecked) {
    classNames.push('result-card--checked');
  }

  return (
    <div
      className={classNames.join(' ')}
      onClick={(event) => event.stopPropagation()}
    >
      <input
        type="checkbox"
        className="result-card__checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        aria-label={`Select ${personLabel}`}
      />
      <button
        type="button"
        className="result-card__open"
        aria-pressed={isDetailsSelected}
        aria-label={`View details for ${personLabel}`}
        onClick={handleOpenDetails}
        onKeyDown={handleOpenDetailsKeyDown}
      >
        <span className="result-card__name">{name}</span>
      </button>
    </div>
  );
}
