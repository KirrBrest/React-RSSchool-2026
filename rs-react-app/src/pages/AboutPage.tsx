import { AppNav } from '../components/AppNav';
import './AboutPage.css';

const RS_SCHOOL_REACT_COURSE_URL = 'https://rs.school/courses/reactjs';
const AUTHOR_NAME = 'Kiryl Lukashchuk';
const AUTHOR_BIO = 'I run a construction company and am the father of a large family, where patience and multitasking skills are cultivated—ideal qualities for development. In this project, I tried to prove that I can work equally confidently with both building architecture and application architecture.';
const AUTHOR_GITHUB = 'https://github.com/KirrBrest';
const AUTHOR_EMAIL = 'Lukashchuk.Kiryl@gmail.com';

export function AboutPage() {
  return (
    <div className="about-page">
      <AppNav />
      <main className="about-page__main">
        <h1 className="about-page__title">About</h1>
        <section className="about-page__author" aria-labelledby="about-author-heading">
          <h2 id="about-author-heading" className="about-page__heading">
            Author
          </h2>
          <p className="about-page__author-name">{AUTHOR_NAME}</p>
          <p className="about-page__bio">
            {AUTHOR_BIO}
          </p>
        </section>
        <section className="about-page__links" aria-labelledby="about-links-heading">
          <h2 id="about-links-heading" className="about-page__heading">
            Links
          </h2>
          <p className="about-page__link-item">
            <a
              className="about-page__external-link"
              href={AUTHOR_GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile
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
              RS School React course
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
