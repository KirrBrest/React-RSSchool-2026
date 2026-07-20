'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useTransition, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { closeDetailsLocation } from '@/utils/detailsNavigation';
import { parseDetailsParam } from '@/utils/extractPersonId';
import '@/views/PersonDetailsPanel.css';

type PersonDetailsPanelShellProps = {
  personId: string | null;
  children: ReactNode;
};

export function PersonDetailsPanelShell({
  personId,
  children,
}: PersonDetailsPanelShellProps) {
  const t = useTranslations('PersonDetails');
  const readonlySearchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isRefreshing, startRefreshTransition] = useTransition();
  const resolvedPersonId =
    personId ?? parseDetailsParam(readonlySearchParams.get('details'));

  const closeDetails = useCallback((): void => {
    const next = new URLSearchParams(readonlySearchParams.toString());
    const location = closeDetailsLocation(next);
    router.replace(`${location.pathname}${location.search}`);
  }, [readonlySearchParams, router]);

  const handleRefresh = useCallback((): void => {
    startRefreshTransition(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <section
      className="person-details"
      aria-label={t('sectionLabel')}
      aria-busy={resolvedPersonId !== null && isRefreshing}
      aria-live="polite"
    >
      <div className="person-details__header">
        <h2 className="person-details__title">{t('title')}</h2>
        <div className="person-details__actions">
          {resolvedPersonId !== null && pathname === '/details' && (
            <button
              type="button"
              className="person-details__refresh"
              aria-label={t('detailsRefresh')}
              disabled={isRefreshing}
              onClick={handleRefresh}
            >
              {t('detailsRefresh')}
            </button>
          )}
          <button
            type="button"
            className="person-details__close"
            aria-label={t('closeDetails')}
            onClick={closeDetails}
          >
            {t('close')}
          </button>
        </div>
      </div>
      {resolvedPersonId === null && (
        <p className="person-details__placeholder">{t('noPersonSelected')}</p>
      )}
      {resolvedPersonId !== null && children}
    </section>
  );
}
