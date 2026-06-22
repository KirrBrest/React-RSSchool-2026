'use client';

import { useTranslations } from 'next-intl';
import './LoadingIndicator.css';

export function LoadingIndicator() {
  const t = useTranslations('LoadingIndicator');

  return (
    <div className="loading-indicator" role="status" aria-label={t('label')} />
  );
}
