import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useGetPersonQuery } from '../store/swapiApi';
import { closeDetailsLocation } from '../utils/detailsNavigation';
import { parseDetailsParam } from '../utils/extractPersonId';
import { rtkQueryErrorMessage } from '../utils/rtkQueryErrorMessage';
import type { PersonDetailsContentProps } from '../types';
import './PersonDetailsPanel.css';

function PersonDetailsContent({ personId }: PersonDetailsContentProps) {
  const { data: person, isLoading, isFetching, isError, error } =
    useGetPersonQuery(personId);

  const showLoading = isLoading || isFetching;
  const errorMessage = isError ? rtkQueryErrorMessage(error) : null;

  return (
    <>
      {showLoading && (
        <div className="person-details__loading">
          <LoadingIndicator />
          <p className="person-details__loading-text">Loading details…</p>
        </div>
      )}
      {!showLoading && errorMessage !== null && (
        <div className="person-details__error" role="alert">
          {errorMessage}
        </div>
      )}
      {!showLoading && errorMessage === null && person !== undefined && (
        <dl className="person-details__list">
          <div className="person-details__row">
            <dt>Name</dt>
            <dd>{person.name}</dd>
          </div>
          <div className="person-details__row">
            <dt>Gender</dt>
            <dd>{person.gender}</dd>
          </div>
          <div className="person-details__row">
            <dt>Birth year</dt>
            <dd>{person.birth_year}</dd>
          </div>
          <div className="person-details__row">
            <dt>Height</dt>
            <dd>{person.height} cm</dd>
          </div>
          <div className="person-details__row">
            <dt>Mass</dt>
            <dd>{person.mass} kg</dd>
          </div>
          <div className="person-details__row">
            <dt>Hair color</dt>
            <dd>{person.hair_color}</dd>
          </div>
          <div className="person-details__row">
            <dt>Eye color</dt>
            <dd>{person.eye_color}</dd>
          </div>
          <div className="person-details__row">
            <dt>Skin color</dt>
            <dd>{person.skin_color}</dd>
          </div>
        </dl>
      )}
    </>
  );
}

export function PersonDetailsPanel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const personId = parseDetailsParam(searchParams.get('details'));

  const closeDetails = useCallback((): void => {
    navigate(closeDetailsLocation(searchParams), { replace: true });
  }, [navigate, searchParams]);

  return (
    <section
      className="person-details"
      aria-label="Person details"
      aria-busy={personId !== null}
    >
      <div className="person-details__header">
        <h2 className="person-details__title">Details</h2>
        <button
          type="button"
          className="person-details__close"
          aria-label="Close details"
          onClick={closeDetails}
        >
          Close
        </button>
      </div>
      {personId === null && (
        <p className="person-details__placeholder">No person selected.</p>
      )}
      {personId !== null && (
        <PersonDetailsContent key={personId} personId={personId} />
      )}
    </section>
  );
}
