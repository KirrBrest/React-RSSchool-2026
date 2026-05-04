import { Component } from 'react';
import './ResultsSection.css';

export class ResultsSection extends Component {
  render() {
    return (
      <section className="results-section" aria-label="Results">
        <div className="results-section__inner">
          <h2 className="results-section__title">Results</h2>
          <p className="results-section__placeholder">No results yet.</p>
        </div>
      </section>
    );
  }
}
