import { Component } from 'react';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { SwapiPeopleApi } from './api/fetchSwapiPeople';
import { SwapiPersonResultMapper } from './utils/mapSwapiPersonToResult';
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

  private handleSearch = async (trimmedTerm: string): Promise<void> => {
    this.setState({ hasSearched: true });
    try {
      const people = await SwapiPeopleApi.search(trimmedTerm);
      this.setState({
        results: people.map((person) => SwapiPersonResultMapper.toItem(person)),
      });
    } catch {
      this.setState({ results: [] });
    }
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
