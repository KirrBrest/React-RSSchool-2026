import { Component, type ErrorInfo } from 'react';
import { AppErrorBoundaryFallback } from './AppErrorBoundaryFallback';
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
      return <AppErrorBoundaryFallback onTryAgain={this.handleTryAgain} />;
    }

    return (
      <div className="error-boundary__root" key={this.state.resetKey}>
        {this.props.children}
      </div>
    );
  }
}
