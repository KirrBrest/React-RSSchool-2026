import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
import { buildSearchParamsString } from '../utils/buildSearchParamsString';
import { parseDetailsParam } from '../utils/extractPersonId';
import type { SwapiPerson } from '../types';
import './PersonDetailsPanel.css';

type DetailsState = {
  person: SwapiPerson | null;
  isLoading: boolean;
  errorMessage: string | null;
};

type PersonDetailsContentProps = {
  personId: string;
};

function PersonDetailsContent({ personId }: PersonDetailsContentProps) {
  const [state, setState] = useState<DetailsState>({
    person: null,
    isLoading: true,
    errorMessage: null,
  });

  useEffect(() => {
    let cancelled = false;
    void SwapiPeopleApi.fetchPerson(personId)
      .then((person) => {
        if (!cancelled) {
          setState({ person, isLoading: false, errorMessage: null });
        }
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setState({
            person: null,
            isLoading: false,
            errorMessage: AppFetchErrorMessage.fromUnknown(reason),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [personId]);

  const { person, isLoading, errorMessage } = state;

  return (
    <>
      {isLoading && (
        <div className="person-details__loading">
          <LoadingIndicator />
          <p className="person-details__loading-text">Loading details…</p>
        </div>
      )}
      {!isLoading && errorMessage !== null && (
        <div className="person-details__error" role="alert">
          {errorMessage}
        </div>
      )}
      {!isLoading && errorMessage === null && person !== null && (
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
    const next = new URLSearchParams(searchParams);
    next.delete('details');
    navigate(
      { pathname: '/', search: buildSearchParamsString(next) },
      { replace: true }
    );
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
