import { Component } from 'react';
import './SearchSection.css';

export class SearchSection extends Component {
  render() {
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
