import { Component, type ChangeEvent } from 'react';
import { readStoredSearchTerm } from '../storage/searchTermStorage';
import './SearchSection.css';

type SearchSectionState = {
  searchTerm: string;
};

export class SearchSection extends Component<Record<string, never>, SearchSectionState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: readStoredSearchTerm(),
    };
  }

  private handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <section className="search-section" aria-label="Search">
        <div className="search-section__inner">
          <h2 className="search-section__title">Search</h2>
          <div className="search-section__field">
            <input
              id="search-query"
              className="search-section__input"
              type="search"
              name="search-query"
              value={searchTerm}
              onChange={this.handleSearchChange}
              placeholder="e.g. skywalker, falcon, coruscant…"
              autoComplete="off"
              spellCheck={false}
              aria-label="Search query"
            />
          </div>
        </div>
      </section>
    );
  }
}
