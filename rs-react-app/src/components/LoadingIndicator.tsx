import { Component } from 'react';
import './LoadingIndicator.css';

export class LoadingIndicator extends Component {
  render() {
    return (
      <div
        className="loading-indicator"
        role="status"
        aria-label="Loading"
      />
    );
  }
}
