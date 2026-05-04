import { Component } from 'react';
import { CardList } from './CardList';
import type { PersonResultItem } from '../types/personResultItem';
import './ResultsSection.css';

export type ResultsSectionProps = {
  items: PersonResultItem[];
  hasSearched: boolean;
};

export class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    const { items, hasSearched } = this.props;
    const hasItems = items.length > 0;

    return (
      <section className="results-section" aria-label="Results">
        <div className="results-section__inner">
          <h2 className="results-section__title">Results</h2>
          {!hasSearched && (
            <p className="results-section__placeholder">
              Run a search to load people from SWAPI.
            </p>
          )}
          {hasSearched && !hasItems && (
            <p className="results-section__placeholder">No matching people.</p>
          )}
          {hasItems && <CardList items={items} />}
        </div>
      </section>
    );
  }
}
