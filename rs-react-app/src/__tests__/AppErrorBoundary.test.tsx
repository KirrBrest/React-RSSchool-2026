import { Component } from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AppErrorBoundary } from '../components/AppErrorBoundary';

class FlakyChild extends Component<{ shouldThrow: boolean }> {
  render() {
    if (this.props.shouldThrow) {
      throw new Error('child-boundary-test');
    }
    return <span>child-ok</span>;
  }
}

class BoundaryHarness extends Component<
  Record<string, never>,
  { fail: boolean }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { fail: false };
  }

  render() {
    return (
      <>
        <button
          type="button"
          onClick={() => this.setState({ fail: true })}
        >
          cause-child-error
        </button>
        <FlakyChild shouldThrow={this.state.fail} />
      </>
    );
  }
}

describe('AppErrorBoundary', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  describe('error catching', () => {
    it('catches and handles JavaScript errors in child components', () => {
      const err = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(
        <AppErrorBoundary>
          <BoundaryHarness />
        </AppErrorBoundary>
      );
      fireEvent.click(
        screen.getByRole('button', { name: 'cause-child-error' })
      );
      expect(
        screen.getByRole('heading', { name: 'Something went wrong' })
      ).toBeInTheDocument();
      err.mockRestore();
    });

    it('displays fallback UI when error occurs', () => {
      const err = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(
        <AppErrorBoundary>
          <BoundaryHarness />
        </AppErrorBoundary>
      );
      fireEvent.click(
        screen.getByRole('button', { name: 'cause-child-error' })
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(
        screen.getByText(
          'A part of the application failed. You can try again to keep using the app.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Try again' })
      ).toBeInTheDocument();
      err.mockRestore();
    });

    it('logs error to console', () => {
      const err = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(
        <AppErrorBoundary>
          <BoundaryHarness />
        </AppErrorBoundary>
      );
      fireEvent.click(
        screen.getByRole('button', { name: 'cause-child-error' })
      );
      expect(
        err.mock.calls.some(
          (args) =>
            args.length > 0 && args[0] === 'AppErrorBoundary caught an error:'
        )
      ).toBe(true);
      err.mockRestore();
    });
  });
});
