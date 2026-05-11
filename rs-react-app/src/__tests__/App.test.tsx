import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { AppErrorBoundary } from '../components/AppErrorBoundary';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { emptyPeopleList } from './emptyPeopleList';

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    pageSize: 10,
    fetchPeople: vi.fn(),
  },
}));

const fetchPeople = vi.mocked(SwapiPeopleApi.fetchPeople);

describe('App', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
    fetchPeople.mockResolvedValue(emptyPeopleList());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  describe('error button', () => {
    it('throws when simulate error is clicked and triggers error boundary fallback UI', async () => {
      const err = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      );
      await waitFor(() => {
        expect(screen.getByText('No matching people.')).toBeInTheDocument();
      });
      fireEvent.click(
        screen.getByRole('button', { name: 'Simulate error' })
      );
      expect(
        screen.getByRole('heading', { name: 'Something went wrong' })
      ).toBeInTheDocument();
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
