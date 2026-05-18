import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PersonDetailsPanel } from '../pages/PersonDetailsPanel';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { onePersonSwapiList } from './onePersonSwapiList.ts';

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    fetchPerson: vi.fn(),
  },
}));

const fetchPerson = vi.mocked(SwapiPeopleApi.fetchPerson);

function renderDetailsAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/details" element={<PersonDetailsPanel />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('PersonDetailsPanel', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    fetchPerson.mockResolvedValue(onePersonSwapiList().results[0]);
  });

  afterEach(() => {
    cleanup();
  });

  it('shows loading state while person details are fetched', () => {
    fetchPerson.mockReturnValue(new Promise(() => {}));
    renderDetailsAt('/details?details=1');
    expect(screen.getByText('Loading details…')).toBeInTheDocument();
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
});
