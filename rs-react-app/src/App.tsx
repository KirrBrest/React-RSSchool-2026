import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { AppNav } from './components/AppNav';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { useDetailsRouting } from './hooks/useDetailsRouting';
import { usePeopleList } from './hooks/usePeopleList';
import './App.css';

export default function App() {
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
      <AppNav />
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
            <Outlet />
          </aside>
        )}
      </div>
      <div className="app__error-test">
        <button
          type="button"
          className="app__error-test-button"
          onClick={triggerSimulatedCrash}
        >
          Simulate error
        </button>
      </div>
    </div>
  );
}
