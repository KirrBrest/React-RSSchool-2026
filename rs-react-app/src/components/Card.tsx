'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, type ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { CardProps } from '../types';
import { buildDetailsPath } from '../utils/appNavigation';
import { PersonAvatar } from './PersonAvatar';
import './Card.css';

export function Card({
  id,
  name,
  isDetailsSelected,
  isChecked,
  onToggleCheck,
}: CardProps) {
  const t = useTranslations('Card');
  const readonlySearchParams = useSearchParams();
  const personLabel = name || 'person';
  const detailsHref = useMemo(
    () =>
      buildDetailsPath(
        new URLSearchParams(readonlySearchParams.toString()),
        id
      ),
    [id, readonlySearchParams]
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    onToggleCheck();
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
      <PersonAvatar
        className="result-card__photo"
        name={personLabel}
        dicebearSize={96}
        alt={t('personPhotoAlt', { name: personLabel })}
        width={48}
        height={48}
      />
      <Link
        className="result-card__open"
        href={detailsHref}
        aria-current={isDetailsSelected ? 'page' : undefined}
        aria-label={t('viewDetails', { name: personLabel })}
        onClick={(event) => event.stopPropagation()}
      >
        <span className="result-card__name">{name}</span>
      </Link>
    </div>
  );
}
