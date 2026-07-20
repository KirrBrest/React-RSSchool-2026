import { fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IntlTestProvider } from './IntlTestProvider';
import { PersonDetailsPanelShell } from '../components/PersonDetailsPanelShell';
import { TestPersonDetailsContent } from './TestPersonDetailsContent';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
import { onePersonSwapiList } from './onePersonSwapiList.ts';
import { setNavigationState, routerRefresh } from './nextNavigationMock';

vi.mock('../api/fetchSwapiPeople', () => ({
  SwapiPeopleApi: {
    fetchPerson: vi.fn(),
  },
}));

const fetchPerson = vi.mocked(SwapiPeopleApi.fetchPerson);

function renderDetailsAt(path: string) {
  const [pathname, search = ''] = path.split('?');
  setNavigationState(pathname, search === '' ? '' : `?${search}`);

  return render(
    <IntlTestProvider>
      <PersonDetailsPanelShell personId="1">
        <TestPersonDetailsContent personId="1" />
      </PersonDetailsPanelShell>
    </IntlTestProvider>
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

  it('triggers a router refresh when refresh is clicked', async () => {
    renderDetailsAt('/details?details=1');
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
    routerRefresh.mockClear();
    fireEvent.click(
      screen.getByRole('button', { name: 'Refresh details' })
    );
    expect(routerRefresh).toHaveBeenCalled();
  });
});
