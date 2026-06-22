import { getTranslations } from 'next-intl/server';
import { PersonAvatar } from '@/components/PersonAvatar';
import { fetchPersonDetails } from '@/utils/fetchPersonDetails';
import './PersonDetailsPanel.css';

type PersonDetailsPanelViewProps = {
  personId: string;
};

export async function PersonDetailsPanelView({
  personId,
}: PersonDetailsPanelViewProps) {
  const t = await getTranslations('PersonDetails');
  const { person, errorMessage } = await fetchPersonDetails(personId);

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
        <div className="person-details__row">
          <dt>{t('birthYear')}</dt>
          <dd>{person.birth_year}</dd>
        </div>
        <div className="person-details__row">
          <dt>{t('height')}</dt>
          <dd>{t('heightUnit', { value: person.height })}</dd>
        </div>
        <div className="person-details__row">
          <dt>{t('mass')}</dt>
          <dd>{t('massUnit', { value: person.mass })}</dd>
        </div>
        <div className="person-details__row">
          <dt>{t('hairColor')}</dt>
          <dd>{person.hair_color}</dd>
        </div>
        <div className="person-details__row">
          <dt>{t('eyeColor')}</dt>
          <dd>{person.eye_color}</dd>
        </div>
        <div className="person-details__row">
          <dt>{t('skinColor')}</dt>
          <dd>{person.skin_color}</dd>
        </div>
      </dl>
    </>
  );
}
