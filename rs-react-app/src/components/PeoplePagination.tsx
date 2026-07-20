'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { SWAPI_PAGE_SIZE } from '../constants';
import type { PeoplePaginationProps } from '../types';
import { buildPagePath } from '../utils/appNavigation';
import './PeoplePagination.css';

export function PeoplePagination({
  page,
  totalCount,
  hasNext,
  hasPrev,
}: PeoplePaginationProps) {
  const t = useTranslations('PeoplePagination');
  const pathname = usePathname();
  const readonlySearchParams = useSearchParams();
  const searchParams = useMemo(
    () => new URLSearchParams(readonlySearchParams.toString()),
    [readonlySearchParams]
  );
  const totalPages = Math.max(1, Math.ceil(totalCount / SWAPI_PAGE_SIZE));
  const previousHref = buildPagePath(pathname, searchParams, page - 1);
  const nextHref = buildPagePath(pathname, searchParams, page + 1);

  return (
    <nav className="people-pagination" aria-label={t('navLabel')}>
      {hasPrev ? (
        <Link className="people-pagination__btn" href={previousHref}>
          {t('previous')}
        </Link>
      ) : (
        <span
          className="people-pagination__btn people-pagination__btn--disabled"
          aria-disabled="true"
        >
          {t('previous')}
        </span>
      )}
      <span className="people-pagination__status">
        {t('pageStatus', { page, totalPages })}
      </span>
      {hasNext ? (
        <Link className="people-pagination__btn" href={nextHref}>
          {t('next')}
        </Link>
      ) : (
        <span
          className="people-pagination__btn people-pagination__btn--disabled"
          aria-disabled="true"
        >
          {t('next')}
        </span>
      )}
    </nav>
  );
}
