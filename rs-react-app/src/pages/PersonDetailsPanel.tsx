import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { QUERY_UI } from '../constants';
import { useGetPersonQuery } from '../store/swapiApi';
import { closeDetailsLocation } from '../utils/detailsNavigation';
import { parseDetailsParam } from '../utils/extractPersonId';
import { rtkQueryErrorMessage } from '../utils/rtkQueryErrorMessage';
import type { PersonDetailsContentProps } from '../types';
import './PersonDetailsPanel.css';

function PersonDetailsContent({ personId }: PersonDetailsContentProps) {
  const {
    data: person,
    currentData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPersonQuery(personId);

  const displayPerson = person ?? currentData;
  const isInitialLoading = isLoading && displayPerson === undefined;
  const isBackgroundFetching = isFetching && displayPerson !== undefined;
  const errorMessage = isError ? rtkQueryErrorMessage(error) : null;

  return (
    <>
      {isInitialLoading && (
        <div className="person-details__loading">
          <LoadingIndicator />
          <p className="person-details__loading-text">
            {QUERY_UI.detailsLoading}
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
                {QUERY_UI.detailsRefreshing}
              </p>
            </div>
          )}
          <dl className="person-details__list">
            <div className="person-details__row">
              <dt>Name</dt>
              <dd>{displayPerson.name}</dd>
            </div>
            <div className="person-details__row">
              <dt>Gender</dt>
              <dd>{displayPerson.gender}</dd>
            </div>
            <div className="person-details__row">
              <dt>Birth year</dt>
              <dd>{displayPerson.birth_year}</dd>
            </div>
            <div className="person-details__row">
              <dt>Height</dt>
              <dd>{displayPerson.height} cm</dd>
            </div>
            <div className="person-details__row">
              <dt>Mass</dt>
              <dd>{displayPerson.mass} kg</dd>
            </div>
            <div className="person-details__row">
              <dt>Hair color</dt>
              <dd>{displayPerson.hair_color}</dd>
            </div>
            <div className="person-details__row">
              <dt>Eye color</dt>
              <dd>{displayPerson.eye_color}</dd>
            </div>
            <div className="person-details__row">
              <dt>Skin color</dt>
              <dd>{displayPerson.skin_color}</dd>
            </div>
          </dl>
        </>
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
