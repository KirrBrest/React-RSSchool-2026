import { Component, type ChangeEvent } from 'react';
import { SearchTermStorage } from '../storage/searchTermStorage';
import './SearchSection.css';

export type SearchSectionProps = {
  onSearch: (trimmedTerm: string) => void;
};

type SearchSectionState = {
  searchTerm: string;
};

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

  private handleSearchClick = () => {
    this.props.onSearch(this.state.searchTerm.trim());
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <section className="search-section" aria-label="Search">
        <div className="search-section__inner">
          <h2 className="search-section__title">Search</h2>
          <div className="search-section__row">
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
            <button
              type="button"
              className="search-section__submit"
              onClick={this.handleSearchClick}
            >
              Search
            </button>
          </div>
        </div>
      </section>
    );
  }
}
