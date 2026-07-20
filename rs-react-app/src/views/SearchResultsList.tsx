import { getTranslations } from 'next-intl/server';
import { CardList } from '@/components/CardList';
import { PeoplePagination } from '@/components/PeoplePagination';
import type { PersonResultItem } from '@/types';
import type { PeoplePaginationProps } from '@/types';
import '../components/ResultsSection.css';

type SearchResultsListProps = {
  items: PersonResultItem[];
  hasSearched: boolean;
  errorMessage: string | null;
  pagination: PeoplePaginationProps | null;
  selectedItemId: string | null;
};

export async function SearchResultsList({
  items,
  hasSearched,
  errorMessage,
  pagination,
  selectedItemId,
}: SearchResultsListProps) {
  const t = await getTranslations('ResultsSection');
  const hasItems = items.length > 0;
  const showError = Boolean(errorMessage);

  return (
    <section
      className="results-section"
      aria-label={t('sectionLabel')}
      aria-live="polite"
    >
      <div className="results-section__inner">
        <div className="results-section__header">
          <h2 className="results-section__title">{t('title')}</h2>
        </div>
        <div className="results-section__content">
          {!hasSearched && (
            <p className="results-section__placeholder">
              {t('initialPlaceholder')}
            </p>
          )}
          {hasSearched && showError && (
            <div className="results-section__error" role="alert">
              {errorMessage}
            </div>
          )}
          {hasSearched && !showError && !hasItems && (
            <p className="results-section__placeholder">{t('emptyResults')}</p>
          )}
          {hasSearched && !showError && hasItems && (
            <CardList items={items} selectedItemId={selectedItemId} />
          )}
          {hasSearched && !showError && pagination !== null && (
            <PeoplePagination
              page={pagination.page}
              totalCount={pagination.totalCount}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
            />
          )}
        </div>
      </div>
    </section>
  );
}
