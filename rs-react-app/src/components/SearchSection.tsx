import { Component, type ChangeEvent, type FormEvent } from 'react';
import { SearchTermStorage } from '../storage/searchTermStorage';
import type { SearchSectionProps, SearchSectionState } from '../types';
import './SearchSection.css';

export class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      searchTerm: SearchTermStorage.read(),
    };
  }

  private handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  private handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = this.state.searchTerm.trim();
    const stored = SearchTermStorage.read();
    if (trimmed !== stored) {
      SearchTermStorage.write(trimmed);
    }
    this.props.onSearch(trimmed);
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <section className="search-section" aria-label="Search">
        <div className="search-section__inner">
          <h2 className="search-section__title">Search</h2>
          <form
            className="search-section__form"
            onSubmit={this.handleFormSubmit}
          >
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
            <button type="submit" className="search-section__submit">
              Search
            </button>
          </form>
        </div>
      </section>
    );
  }
}
