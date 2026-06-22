'use client';

import { type ChangeEvent, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchTermStorage } from '../hooks/useSearchTermStorage';
import type { SearchSectionProps } from '../types';
import './SearchSection.css';

export function SearchSection({
  onSearch,
  onSearchInputChange,
}: SearchSectionProps) {
  const t = useTranslations('SearchSection');
  const { searchTerm, setSearchTerm, persistSearchTerm } = useSearchTermStorage();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearchInputChange();
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = persistSearchTerm(searchTerm);
    onSearch(trimmed);
  };

  return (
    <section className="search-section" aria-label={t('sectionLabel')}>
      <div className="search-section__inner">
        <h2 className="search-section__title">{t('title')}</h2>
        <form className="search-section__form" onSubmit={handleFormSubmit}>
          <div className="search-section__field">
            <input
              id="search-query"
              className="search-section__input"
              type="search"
              name="search-query"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t('placeholder')}
              autoComplete="off"
              spellCheck={false}
              aria-label={t('queryLabel')}
            />
          </div>
          <button type="submit" className="search-section__submit">
            {t('submit')}
          </button>
        </form>
      </div>
    </section>
  );
}
