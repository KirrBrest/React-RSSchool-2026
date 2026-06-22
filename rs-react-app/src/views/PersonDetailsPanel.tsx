'use client';

import { skipToken } from '@reduxjs/toolkit/query';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { PersonAvatar } from '../components/PersonAvatar';
import { useRouter } from '@/i18n/navigation';
import { invalidatePersonCache } from '../store';
import { useGetPersonQuery } from '../store/swapiApi';
import { closeDetailsLocation } from '../utils/detailsNavigation';
import { parseDetailsParam } from '../utils/extractPersonId';
import { rtkQueryErrorMessage } from '../utils/rtkQueryErrorMessage';
import type { PersonDetailsContentProps } from '../types';
import './PersonDetailsPanel.css';

function PersonDetailsContent({ personId }: PersonDetailsContentProps) {
  const t = useTranslations('PersonDetails');
  const {
    data: person,
    currentData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPersonQuery(personId);

  const displayPerson = isError ? undefined : (person ?? currentData);
  const isInitialLoading = isLoading && displayPerson === undefined;
  const isBackgroundFetching =
    !isError && isFetching && displayPerson !== undefined;
  const errorMessage = isError ? rtkQueryErrorMessage(error) : null;

  return (
    <>
      {isInitialLoading && (
        <div className="person-details__loading">
          <LoadingIndicator />
          <p className="person-details__loading-text">
            {t('detailsLoading')}
          </p>
        </div>
      )}
      {!isInitialLoading && errorMessage !== null && (
        <div className="person-details__error" role="alert">
          {errorMessage}
        </div>
      )}
      {!isInitialLoading && errorMessage === null && displayPerson !== undefined && (
        <>
          {isBackgroundFetching && (
            <div
              className="person-details__refreshing"
              aria-live="polite"
            >
              <LoadingIndicator />
              <p className="person-details__refreshing-text">
                {t('detailsRefreshing')}
              </p>
            </div>
          )}
          <PersonAvatar
            className="person-details__photo"
            name={displayPerson.name}
            dicebearSize={256}
            alt={t('photoAlt', { name: displayPerson.name })}
            width={160}
            height={160}
            sizes="160px"
            priority
          />
          <dl className="person-details__list">
            <div className="person-details__row">
              <dt>{t('name')}</dt>
              <dd>{displayPerson.name}</dd>
            </div>
            <div className="person-details__row">
              <dt>{t('gender')}</dt>
              <dd>{displayPerson.gender}</dd>
            </div>
            <div className="person-details__row">
              <dt>{t('birthYear')}</dt>
              <dd>{displayPerson.birth_year}</dd>
            </div>
            <div className="person-details__row">
              <dt>{t('height')}</dt>
              <dd>{t('heightUnit', { value: displayPerson.height })}</dd>
            </div>
            <div className="person-details__row">
              <dt>{t('mass')}</dt>
              <dd>{t('massUnit', { value: displayPerson.mass })}</dd>
            </div>
            <div className="person-details__row">
              <dt>{t('hairColor')}</dt>
              <dd>{displayPerson.hair_color}</dd>
            </div>
            <div className="person-details__row">
              <dt>{t('eyeColor')}</dt>
              <dd>{displayPerson.eye_color}</dd>
            </div>
            <div className="person-details__row">
              <dt>{t('skinColor')}</dt>
              <dd>{displayPerson.skin_color}</dd>
            </div>
          </dl>
        </>
      )}
    </>
  );
}

export function PersonDetailsPanel() {
  const t = useTranslations('PersonDetails');
  const readonlySearchParams = useSearchParams();
  const router = useRouter();
  const personId = parseDetailsParam(readonlySearchParams.get('details'));
  const { isLoading, isFetching } = useGetPersonQuery(
    personId ?? skipToken
  );
  const isRefreshDisabled = isLoading || isFetching;

  const closeDetails = useCallback((): void => {
    const next = new URLSearchParams(readonlySearchParams.toString());
    const location = closeDetailsLocation(next);
    router.replace(`${location.pathname}${location.search}`);
  }, [readonlySearchParams, router]);

  return (
    <section
      className="person-details"
      aria-label={t('sectionLabel')}
      aria-busy={personId !== null}
      aria-live="polite"
    >
      <div className="person-details__header">
        <h2 className="person-details__title">{t('title')}</h2>
        <div className="person-details__actions">
          {personId !== null && (
            <button
              type="button"
              className="person-details__refresh"
              aria-label={t('detailsRefresh')}
              disabled={isRefreshDisabled}
              onClick={() => invalidatePersonCache(personId)}
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
      {personId === null && (
        <p className="person-details__placeholder">{t('noPersonSelected')}</p>
      )}
      {personId !== null && (
        <PersonDetailsContent key={personId} personId={personId} />
      )}
    </section>
  );
}
