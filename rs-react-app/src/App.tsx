import { Component } from 'react';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { SwapiPeopleApi } from './api/fetchSwapiPeople';
import { SwapiPersonResultMapper } from './utils/mapSwapiPersonToResult';
import { SearchTermStorage } from './storage/searchTermStorage';
import { AppFetchErrorMessage } from './utils/AppFetchErrorMessage';
import type { PersonResultItem } from './types/personResultItem';
import './App.css';

type AppState = {
  results: PersonResultItem[];
  hasSearched: boolean;
  lastFetchedTerm: string | null;
  isLoading: boolean;
  errorMessage: string | null;
  listPage: number;
  listHasNext: boolean;
  listHasPrev: boolean;
  listTotalCount: number;
};

type FetchOptions = {
  skipIfUnchanged: boolean;
  page?: number;
};

export default class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      hasSearched: false,
      lastFetchedTerm: null,
      isLoading: true,
      errorMessage: null,
      listPage: 1,
      listHasNext: false,
      listHasPrev: false,
      listTotalCount: 0,
    };
  }

  componentDidMount(): void {
    void this.fetchAndSetResults(SearchTermStorage.read(), {
      skipIfUnchanged: false,
      page: 1,
    });
  }

  private fetchAndSetResults = async (
    trimmedTerm: string,
    options: FetchOptions
  ): Promise<void> => {
    const page = options.page ?? 1;
    if (
      options.skipIfUnchanged &&
      trimmedTerm === this.state.lastFetchedTerm &&
      page === this.state.listPage
    ) {
      return;
    }
    this.setState({ isLoading: true });
    try {
      const data = await SwapiPeopleApi.fetchPeople(trimmedTerm, page);
      this.setState({
        isLoading: false,
        hasSearched: true,
        errorMessage: null,
        results: data.results.map((person) =>
          SwapiPersonResultMapper.toItem(person)
        ),
        lastFetchedTerm: trimmedTerm,
        listPage: page,
        listHasNext: data.next !== null,
        listHasPrev: data.previous !== null,
        listTotalCount: data.count,
      });
    } catch (reason: unknown) {
      this.setState({
        isLoading: false,
        hasSearched: true,
        errorMessage: AppFetchErrorMessage.fromUnknown(reason),
        results: [],
        listHasNext: false,
        listHasPrev: false,
      });
    }
  };

  private handleSearch = async (trimmedTerm: string): Promise<void> => {
    await this.fetchAndSetResults(trimmedTerm, {
      skipIfUnchanged: true,
      page: 1,
    });
  };

  private handlePageNext = (): void => {
    const { listPage, listHasNext, lastFetchedTerm } = this.state;
    if (!listHasNext || lastFetchedTerm !== '') {
      return;
    }
    void this.fetchAndSetResults('', {
      skipIfUnchanged: false,
      page: listPage + 1,
    });
  };

  private handlePagePrev = (): void => {
    const { listPage, listHasPrev, lastFetchedTerm } = this.state;
    if (!listHasPrev || lastFetchedTerm !== '') {
      return;
    }
    void this.fetchAndSetResults('', {
      skipIfUnchanged: false,
      page: listPage - 1,
    });
  };

  render() {
    const {
      results,
      hasSearched,
      isLoading,
      errorMessage,
      lastFetchedTerm,
      listPage,
      listHasNext,
      listHasPrev,
      listTotalCount,
    } = this.state;

    const showPagination =
      hasSearched &&
      errorMessage === null &&
      lastFetchedTerm === '' &&
      (listHasNext || listHasPrev);

    return (
      <div className="app">
        <SearchSection onSearch={this.handleSearch} />
        <ResultsSection
          items={results}
          hasSearched={hasSearched}
          isLoading={isLoading}
          errorMessage={errorMessage}
          pagination={
            showPagination
              ? {
                  page: listPage,
                  totalCount: listTotalCount,
                  hasNext: listHasNext,
                  hasPrev: listHasPrev,
                  onNext: this.handlePageNext,
                  onPrev: this.handlePagePrev,
                }
              : null
          }
        />
      </div>
    );
  }
}
