import { useState, type ChangeEvent, type FormEvent } from 'react';
import { SearchTermStorage } from '../storage/searchTermStorage';
import type { SearchSectionProps } from '../types';
import './SearchSection.css';

export function SearchSection({ onSearch }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState(() => SearchTermStorage.read());

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    const stored = SearchTermStorage.read();
    if (trimmed !== stored) {
      SearchTermStorage.write(trimmed);
    }
    onSearch(trimmed);
  };

  return (
    <section className="search-section" aria-label="Search">
      <div className="search-section__inner">
        <h2 className="search-section__title">Search</h2>
        <form className="search-section__form" onSubmit={handleFormSubmit}>
          <div className="search-section__field">
            <input
              id="search-query"
              className="search-section__input"
              type="search"
              name="search-query"
              value={searchTerm}
              onChange={handleSearchChange}
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
