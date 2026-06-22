'use client';

import { useTranslations } from 'next-intl';
import { SWAPI_PAGE_SIZE } from '../constants';
import type { PeoplePaginationProps } from '../types';
import './PeoplePagination.css';

export function PeoplePagination({
  page,
  totalCount,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}: PeoplePaginationProps) {
  const t = useTranslations('PeoplePagination');
  const totalPages = Math.max(1, Math.ceil(totalCount / SWAPI_PAGE_SIZE));

  return (
    <nav className="people-pagination" aria-label={t('navLabel')}>
      <button
        type="button"
        className="people-pagination__btn"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        {t('previous')}
      </button>
      <span className="people-pagination__status">
        {t('pageStatus', { page, totalPages })}
      </span>
      <button
        type="button"
        className="people-pagination__btn"
        disabled={!hasNext}
        onClick={onNext}
      >
        {t('next')}
      </button>
    </nav>
  );
}
