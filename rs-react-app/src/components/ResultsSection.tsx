import { Component } from 'react';
import { CardList } from './CardList';
import { LoadingIndicator } from './LoadingIndicator';
import { PeoplePagination } from './PeoplePagination';
import type { PersonResultItem } from '../types/personResultItem';
import type { PeoplePaginationProps } from './PeoplePagination';
import './ResultsSection.css';

export type ResultsSectionProps = {
  items: PersonResultItem[];
  hasSearched: boolean;
  isLoading: boolean;
  pagination: PeoplePaginationProps | null;
};

export class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    const { items, hasSearched, isLoading, pagination } = this.props;
    const hasItems = items.length > 0;

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
          {!isLoading && hasSearched && !hasItems && (
            <p className="results-section__placeholder">No matching people.</p>
          )}
          {!isLoading && hasItems && <CardList items={items} />}
          {!isLoading && hasSearched && pagination && (
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
}
