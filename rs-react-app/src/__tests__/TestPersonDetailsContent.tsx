'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PersonAvatar } from '@/components/PersonAvatar';
import { fetchPersonDetails } from '@/utils/fetchPersonDetails';
import type { SwapiPerson } from '@/types';

type TestPersonDetailsContentProps = {
  personId: string;
};

export function TestPersonDetailsContent({
  personId,
}: TestPersonDetailsContentProps) {
  const t = useTranslations('PersonDetails');
  const [person, setPerson] = useState<SwapiPerson | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      setIsLoading(true);
      const result = await fetchPersonDetails(personId);
      if (cancelled) {
        return;
      }
      setPerson(result.person);
      setErrorMessage(result.errorMessage);
      setIsLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [personId]);

  if (isLoading) {
    return (
      <p className="person-details__loading-text" role="status" aria-label="Loading">
        {t('detailsLoading')}
      </p>
    );
  }

  if (errorMessage !== null) {
    return (
      <div className="person-details__error" role="alert">
        {errorMessage}
      </div>
    );
  }

  if (person === null) {
    return null;
  }

  return (
    <>
      <PersonAvatar
        className="person-details__photo"
        name={person.name}
        dicebearSize={256}
        alt={t('photoAlt', { name: person.name })}
        width={160}
        height={160}
        sizes="160px"
        priority
      />
      <dl className="person-details__list">
        <div className="person-details__row">
          <dt>{t('name')}</dt>
          <dd>{person.name}</dd>
        </div>
        <div className="person-details__row">
          <dt>{t('gender')}</dt>
          <dd>{person.gender}</dd>
        </div>
      </dl>
    </>
  );
}
