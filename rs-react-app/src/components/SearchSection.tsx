'use client';

import { type ChangeEvent, useActionState, useEffect, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import {
  searchPeopleAction,
  type SearchPeopleActionState,
} from '@/actions/searchPeople';
import { useSearchTermStorage } from '../hooks/useSearchTermStorage';
import type { SearchSectionProps } from '../types';
import './SearchSection.css';

export function SearchSection({
  initialSearchTerm,
  onSearchComplete,
  onSearchInputChange,
  onSearchPendingChange,
}: SearchSectionProps) {
  const t = useTranslations('SearchSection');
  const { searchTerm, setSearchTerm, persistSearchTerm } = useSearchTermStorage(
    initialSearchTerm
  );
  const [searchState, searchAction, isSearchPending] = useActionState<
    SearchPeopleActionState | null,
    FormData
  >(searchPeopleAction, null);
  const [, startSearchTransition] = useTransition();

  useEffect(() => {
    if (searchState === null) {
      return;
    }

    onSearchComplete(searchState);
  }, [onSearchComplete, searchState]);

  useEffect(() => {
    onSearchPendingChange?.(isSearchPending);
  }, [isSearchPending, onSearchPendingChange]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    onSearchInputChange();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const trimmed = persistSearchTerm(searchTerm);
    const formData = new FormData();
    formData.set('search-query', trimmed);
    startSearchTransition(() => {
      searchAction(formData);
    });
  };

  return (
    <section className="search-section" aria-label={t('sectionLabel')}>
      <div className="search-section__inner">
        <h2 className="search-section__title">{t('title')}</h2>
        <form
          className="search-section__form"
          onSubmit={handleFormSubmit}
          aria-busy={isSearchPending}
        >
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
          <button
            type="submit"
            className="search-section__submit"
            disabled={isSearchPending}
          >
            {t('submit')}
          </button>
        </form>
      </div>
    </section>
  );
}
