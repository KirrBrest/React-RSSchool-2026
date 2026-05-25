import type { KeyboardEvent, MouseEvent } from 'react';
import type { CardProps } from '../types';
import './Card.css';

export function Card({ id, name, isSelected, onSelect }: CardProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onSelect(id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <button
      type="button"
      className={
        isSelected
          ? 'result-card result-card--selected'
          : 'result-card'
      }
      aria-pressed={isSelected}
      aria-label={`View details for ${name || 'person'}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className="result-card__name">{name}</span>
    </button>
  );
}
