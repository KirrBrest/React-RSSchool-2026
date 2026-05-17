import { CardList } from './CardList';
import { LoadingIndicator } from './LoadingIndicator';
import { PeoplePagination } from './PeoplePagination';
import type { ResultsSectionProps } from '../types';
import './ResultsSection.css';

export function ResultsSection({
  items,
  hasSearched,
  isLoading,
  errorMessage,
  pagination,
}: ResultsSectionProps) {
  const hasItems = items.length > 0;
  const showError = Boolean(errorMessage);

  return (
    <section
      className="results-section"
      aria-label="Results"
      aria-busy={isLoading}
    >
      <div className="results-section__inner">
        <h2 className="results-section__title">Results</h2>
        {isLoading && (
          <div className="results-section__loading">
            <LoadingIndicator />
            <p className="results-section__loading-text">Loading data…</p>
          </div>
        )}
        {!isLoading && !hasSearched && (
          <p className="results-section__placeholder">
            Run a search to load people from SWAPI.
          </p>
        )}
        {!isLoading && hasSearched && showError && (
          <div className="results-section__error" role="alert">
            {errorMessage}
          </div>
        )}
        {!isLoading && hasSearched && !showError && !hasItems && (
          <p className="results-section__placeholder">No matching people.</p>
        )}
        {!isLoading && hasItems && <CardList items={items} />}
        {!isLoading && hasSearched && !showError && pagination && (
          <PeoplePagination
            page={pagination.page}
            totalCount={pagination.totalCount}
            hasNext={pagination.hasNext}
            hasPrev={pagination.hasPrev}
            onNext={pagination.onNext}
            onPrev={pagination.onPrev}
          />
        )}
      </div>
    </section>
  );
}
