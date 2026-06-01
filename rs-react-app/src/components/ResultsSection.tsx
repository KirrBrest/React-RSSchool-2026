import { CardList } from './CardList';
import { LoadingIndicator } from './LoadingIndicator';
import { PeoplePagination } from './PeoplePagination';
import { QUERY_UI } from '../constants';
import type { ResultsSectionProps } from '../types';
import './ResultsSection.css';

export function ResultsSection({
  items,
  hasSearched,
  isLoading,
  isFetching,
  errorMessage,
  pagination,
  selectedItemId,
  onItemSelect,
  onMainPanelClick,
}: ResultsSectionProps) {
  const hasItems = items.length > 0;
  const showError = Boolean(errorMessage);
  const isBusy = isLoading || isFetching;

  return (
    <section
      className="results-section"
      aria-label="Results"
      aria-busy={isBusy}
      aria-live="polite"
    >
      <div className="results-section__inner">
        <h2 className="results-section__title">Results</h2>
        <div
          className="results-section__content"
          onClick={onMainPanelClick}
        >
          {isLoading && (
            <div className="results-section__loading">
              <LoadingIndicator />
              <p className="results-section__loading-text">
                {QUERY_UI.listLoading}
              </p>
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
          {!isLoading && hasItems && !showError && (
            <>
              {isFetching && (
                <div
                  className="results-section__refreshing"
                  aria-live="polite"
                >
                  <LoadingIndicator />
                  <p className="results-section__refreshing-text">
                    {QUERY_UI.listRefreshing}
                  </p>
                </div>
              )}
              <CardList
                items={items}
                selectedItemId={selectedItemId}
                onItemSelect={onItemSelect}
              />
            </>
          )}
          {!isLoading && hasSearched && !showError && pagination && (
            <div onClick={(event) => event.stopPropagation()}>
              <PeoplePagination
                page={pagination.page}
                totalCount={pagination.totalCount}
                hasNext={pagination.hasNext}
                hasPrev={pagination.hasPrev}
                onNext={pagination.onNext}
                onPrev={pagination.onPrev}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
