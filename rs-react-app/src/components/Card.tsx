'use client';

import Image from 'next/image';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { CardProps } from '../types';
import { getPersonAvatarUrl } from '../utils/personAvatarUrl';
import './Card.css';

export function Card({
  id,
  name,
  isDetailsSelected,
  isChecked,
  onToggleCheck,
  onOpenDetails,
}: CardProps) {
  const t = useTranslations('Card');
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
        aria-label={t('selectPerson', { name: personLabel })}
      />
      <Image
        className="result-card__photo"
        src={getPersonAvatarUrl(personLabel, 96)}
        alt={t('personPhotoAlt', { name: personLabel })}
        width={48}
        height={48}
      />
      <button
        type="button"
        className="result-card__open"
        aria-pressed={isDetailsSelected}
        aria-label={t('viewDetails', { name: personLabel })}
        onClick={handleOpenDetails}
        onKeyDown={handleOpenDetailsKeyDown}
      >
        <span className="result-card__name">{name}</span>
      </button>
    </div>
  );
}
