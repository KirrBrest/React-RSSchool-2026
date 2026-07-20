'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import './NotFoundPage.css';

export function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="not-found-page">
      <main className="not-found-page__main">
        <h1 className="not-found-page__title">{t('title')}</h1>
        <p className="not-found-page__message">{t('message')}</p>
        <p>
          <Link className="not-found-page__home-link" href="/">
            {t('backToHome')}
          </Link>
        </p>
      </main>
    </div>
  );
}
