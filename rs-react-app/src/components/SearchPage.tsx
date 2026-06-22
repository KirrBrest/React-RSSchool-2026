'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { SearchSection } from './SearchSection';
import { ResultsSection } from './ResultsSection';
import { useDetailsRouting } from '../hooks/useDetailsRouting';
import { usePeopleList } from '../hooks/usePeopleList';
import { PersonDetailsPanel } from '../views/PersonDetailsPanel';
import '../App.css';

export function SearchPage() {
  const t = useTranslations('SearchPage');
  const {
    pageInUrl,
    selectedDetailsId,
    isDetailsOpen,
    searchParams,
    updatePageInUrl,
    openDetails,
    closeDetails,
  } = useDetailsRouting();

  const {
    state,
    handleSearchInputChange,
    handleSearch,
    handlePageNext,
    handlePagePrev,
    handleRefreshList,
    triggerSimulatedCrash,
  } = usePeopleList({
    searchParams,
    pageInUrl,
    isDetailsOpen,
    updatePageInUrl,
    closeDetails,
  });

  const handleMainPanelClick = useCallback((): void => {
    if (isDetailsOpen) {
      closeDetails();
    }
  }, [closeDetails, isDetailsOpen]);

  const {
    results,
    hasSearched,
    isLoading,
    isFetching,
    errorMessage,
    listPage,
    listHasNext,
    listHasPrev,
    listTotalCount,
    simulateCrash,
  } = state;

  if (simulateCrash) {
    throw new Error('Simulated application error (error boundary test)');
  }

  const showPagination =
    hasSearched &&
    !isLoading &&
    errorMessage === null &&
    (listHasNext || listHasPrev);

  return (
    <div className="app">
      <SearchSection
        onSearch={handleSearch}
        onSearchInputChange={handleSearchInputChange}
      />
      <div
        className={
          isDetailsOpen
            ? 'app__split app__split--open'
            : 'app__split'
        }
      >
        <div className="app__master">
          <ResultsSection
            items={results}
            hasSearched={hasSearched}
            isLoading={isLoading}
            isFetching={isFetching}
            errorMessage={errorMessage}
            onRefresh={hasSearched ? handleRefreshList : null}
            isRefreshDisabled={isLoading || isFetching}
            pagination={
              showPagination
                ? {
                    page: listPage,
                    totalCount: listTotalCount,
                    hasNext: listHasNext,
                    hasPrev: listHasPrev,
                    onNext: handlePageNext,
                    onPrev: handlePagePrev,
                  }
                : null
            }
            selectedItemId={selectedDetailsId}
            onItemSelect={openDetails}
            onMainPanelClick={handleMainPanelClick}
          />
        </div>
        {isDetailsOpen && (
          <aside className="app__detail" onClick={(event) => event.stopPropagation()}>
            <PersonDetailsPanel />
          </aside>
        )}
      </div>
      <div className="app__error-test">
        <button
          type="button"
          className="app__error-test-button"
          onClick={triggerSimulatedCrash}
        >
          {t('simulateError')}
        </button>
      </div>
    </div>
  );
}
