import { Component, type ErrorInfo } from 'react';
import type { AppErrorBoundaryProps, AppErrorBoundaryState } from '../types';
import './AppErrorBoundary.css';

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, resetKey: 0 };
  }

  static getDerivedStateFromError(): Partial<AppErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  private handleTryAgain = (): void => {
    this.setState((prev) => ({
      hasError: false,
      resetKey: prev.resetKey + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <div className="error-boundary__card">
            <h1 className="error-boundary__title">Something went wrong</h1>
            <p className="error-boundary__text">
              A part of the application failed. You can try again to keep using
              the app.
            </p>
            <button
              type="button"
              className="error-boundary__button"
              onClick={this.handleTryAgain}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="error-boundary__root" key={this.state.resetKey}>
        {this.props.children}
      </div>
    );
  }
}
