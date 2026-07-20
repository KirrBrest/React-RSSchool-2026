import { fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QUERY_UI } from '../constants';
import { PersonDetailsPanel } from '../pages/PersonDetailsPanel';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
import { resetSwapiApiState } from '../store';
import { ReduxProvider } from '../store/ReduxProvider';
import { onePersonSwapiList } from './onePersonSwapiList.ts';

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    fetchPerson: vi.fn(),
  },
}));

const fetchPerson = vi.mocked(SwapiPeopleApi.fetchPerson);

function renderDetailsAt(path: string) {
  return render(
    <ReduxProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/details" element={<PersonDetailsPanel />} />
        </Routes>
      </MemoryRouter>
    </ReduxProvider>
  );
}

describe('PersonDetailsPanel', () => {
  beforeEach(() => {
    cleanup();
    resetSwapiApiState();
    vi.clearAllMocks();
    fetchPerson.mockResolvedValue(onePersonSwapiList().results[0]);
  });

  afterEach(() => {
    cleanup();
  });

  it('shows loading state while person details are fetched', () => {
    fetchPerson.mockReturnValue(new Promise(() => {}));
    renderDetailsAt('/details?details=1');
    expect(screen.getByText(QUERY_UI.detailsLoading)).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders person fields after a successful fetch', async () => {
    renderDetailsAt('/details?details=1');
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(fetchPerson).toHaveBeenCalledWith('1');
  });

  it('shows a readable error when the person request fails', async () => {
    fetchPerson.mockRejectedValue(new Error('SWAPI_HTTP_404'));
    renderDetailsAt('/details?details=1');
    const expected = AppFetchErrorMessage.fromUnknown(
      new Error('SWAPI_HTTP_404')
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(expected);
    });
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });

  it('refetches person details when refresh is clicked after cache is warm', async () => {
    renderDetailsAt('/details?details=1');
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
    fetchPerson.mockClear();
    fireEvent.click(
      screen.getByRole('button', { name: 'Refresh details' })
    );
    await waitFor(() => {
      expect(fetchPerson).toHaveBeenCalledWith('1');
    });
  });
});
