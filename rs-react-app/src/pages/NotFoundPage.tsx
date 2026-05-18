import { Link } from 'react-router-dom';
import { AppNav } from '../components/AppNav';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <AppNav />
      <main className="not-found-page__main">
        <h1 className="not-found-page__title">Page not found</h1>
        <p className="not-found-page__message">
          Ooops! The page you are looking for does not exist or has been moved.
        </p>
        <p>
          <Link className="not-found-page__home-link" to="/">
            Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
