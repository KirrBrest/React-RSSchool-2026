import { Component } from 'react';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { SwapiPeopleApi } from './api/fetchSwapiPeople';
import { SwapiPersonResultMapper } from './utils/mapSwapiPersonToResult';
import { SearchTermStorage } from './storage/searchTermStorage';
import type { PersonResultItem } from './types/personResultItem';
import './App.css';

type AppState = {
  results: PersonResultItem[];
  hasSearched: boolean;
};

export default class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      hasSearched: false,
    };
  }

  componentDidMount(): void {
    void this.fetchAndSetResults(SearchTermStorage.read());
  }

  private fetchAndSetResults = async (trimmedTerm: string): Promise<void> => {
    try {
      const people = await SwapiPeopleApi.search(trimmedTerm);
      this.setState({
        hasSearched: true,
        results: people.map((person) => SwapiPersonResultMapper.toItem(person)),
      });
    } catch {
      this.setState({
        hasSearched: true,
        results: [],
      });
    }
  };

  private handleSearch = async (trimmedTerm: string): Promise<void> => {
    await this.fetchAndSetResults(trimmedTerm);
  };

  render() {
    const { results, hasSearched } = this.state;
    return (
      <div className="app">
        <SearchSection onSearch={this.handleSearch} />
        <ResultsSection items={results} hasSearched={hasSearched} />
      </div>
    );
  }
}
