'use client';

import { useTranslations } from 'next-intl';

type AppErrorBoundaryFallbackProps = {
  onTryAgain: () => void;
};

export function AppErrorBoundaryFallback({
  onTryAgain,
}: AppErrorBoundaryFallbackProps) {
  const t = useTranslations('AppErrorBoundary');

  return (
    <div className="error-boundary" role="alert">
      <div className="error-boundary__card">
        <h1 className="error-boundary__title">{t('title')}</h1>
        <p className="error-boundary__text">{t('text')}</p>
        <button
          type="button"
          className="error-boundary__button"
          onClick={onTryAgain}
        >
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
