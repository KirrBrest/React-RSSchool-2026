'use client';

import { useTranslations } from 'next-intl';
import { CardList } from './CardList';
import { LoadingIndicator } from './LoadingIndicator';
import { PeoplePagination } from './PeoplePagination';
import type { ResultsSectionProps } from '../types';
import './ResultsSection.css';

export function ResultsSection({
  items,
  hasSearched,
  isLoading,
  isFetching,
  errorMessage,
  onRefresh,
  isRefreshDisabled,
  pagination,
  selectedItemId,
  onMainPanelClick,
}: ResultsSectionProps) {
  const t = useTranslations('ResultsSection');
  const hasItems = items.length > 0;
  const showError = Boolean(errorMessage);
  const isBusy = isLoading || isFetching;

  return (
    <section
      className="results-section"
      aria-label={t('sectionLabel')}
      aria-busy={isBusy}
      aria-live="polite"
    >
      <div className="results-section__inner">
        <div className="results-section__header">
          <h2 className="results-section__title">{t('title')}</h2>
          {onRefresh !== null && (
            <button
              type="button"
              className="results-section__refresh"
              aria-label={t('listRefresh')}
              disabled={isRefreshDisabled}
              onClick={(event) => {
                event.stopPropagation();
                onRefresh();
              }}
            >
              {t('listRefresh')}
            </button>
          )}
        </div>
        <div
          className="results-section__content"
          onClick={onMainPanelClick}
        >
          {isLoading && (
            <div className="results-section__loading">
              <LoadingIndicator />
              <p className="results-section__loading-text">
                {t('listLoading')}
              </p>
            </div>
          )}
          {!isLoading && !hasSearched && (
            <p className="results-section__placeholder">
              {t('initialPlaceholder')}
            </p>
          )}
          {!isLoading && hasSearched && showError && (
            <div className="results-section__error" role="alert">
              {errorMessage}
            </div>
          )}
          {!isLoading && hasSearched && !showError && !hasItems && (
            <p className="results-section__placeholder">{t('emptyResults')}</p>
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
                    {t('listRefreshing')}
                  </p>
                </div>
              )}
              <CardList
                items={items}
                selectedItemId={selectedItemId}
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
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
