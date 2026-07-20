import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import {
  AUTHOR_AVATAR_URL,
  AUTHOR_EMAIL,
  AUTHOR_GITHUB,
  AUTHOR_NAME,
  RS_SCHOOL_LOGO_PATH,
  RS_SCHOOL_REACT_COURSE_URL,
} from '../constants';
import './AboutPage.css';

export async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <div className="about-page">
      <main className="about-page__main">
        <h1 className="about-page__title">{t('title')}</h1>
        <section className="about-page__author" aria-labelledby="about-author-heading">
          <h2 id="about-author-heading" className="about-page__heading">
            {t('authorHeading')}
          </h2>
          <div className="about-page__author-profile">
            <Image
              className="about-page__author-photo"
              src={AUTHOR_AVATAR_URL}
              alt={t('authorPhotoAlt', { name: AUTHOR_NAME })}
              width={120}
              height={120}
              priority
              unoptimized
            />
            <div className="about-page__author-info">
              <p className="about-page__author-name">{AUTHOR_NAME}</p>
              <p className="about-page__bio">{t('bio')}</p>
            </div>
          </div>
        </section>
        <section className="about-page__links" aria-labelledby="about-links-heading">
          <h2 id="about-links-heading" className="about-page__heading">
            {t('linksHeading')}
          </h2>
          <Image
            className="about-page__school-logo"
            src={RS_SCHOOL_LOGO_PATH}
            alt={t('rsSchoolLogoAlt')}
            width={160}
            height={48}
          />
          <p className="about-page__link-item">
            <a
              className="about-page__external-link"
              href={AUTHOR_GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              {t('githubProfile')}
            </a>
          </p>
          <p className="about-page__link-item">
            <a
              className="about-page__external-link"
              href={`mailto:${AUTHOR_EMAIL}`}
            >
              {AUTHOR_EMAIL}
            </a>
          </p>
          <p className="about-page__link-item">
            <a
              className="about-page__external-link"
              href={RS_SCHOOL_REACT_COURSE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t('rsSchoolCourse')}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
