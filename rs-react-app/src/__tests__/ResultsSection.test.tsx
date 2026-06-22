import { fireEvent, render, cleanup } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IntlTestProvider } from './IntlTestProvider';
import { ResultsSection } from '../components/ResultsSection';
import type { PersonResultItem } from '../types';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
import { ReduxProvider } from '../store/ReduxProvider';
import { resetStoreState } from './renderWithRouter.tsx';
import { testDetailHandlers } from './testDetailHandlers.ts';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

function renderResultsSection(
  props: ComponentProps<typeof ResultsSection>
) {
  return render(
    <IntlTestProvider>
      <ReduxProvider>
        <ResultsSection {...props} />
      </ReduxProvider>
    </IntlTestProvider>
  );
}

describe('ResultsSection', () => {
  beforeEach(() => {
    cleanup();
    resetStoreState();
  });

  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('renders correct number of items when data is provided', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: 'One', description: 'D1' },
        { id: '2', name: 'Two', description: 'D2' },
      ];
      const view = renderResultsSection({
        items,
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: null,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(region.getAllByRole('button')).toHaveLength(2);
    });

    it('displays no results message when data array is empty', () => {
      const view = renderResultsSection({
        items: [],
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: null,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(
        region.getByText('No matching people.')
      ).toBeInTheDocument();
    });

    it('shows loading state while fetching data', () => {
      const view = renderResultsSection({
        items: [],
        hasSearched: false,
        isLoading: true,
        isFetching: false,
        errorMessage: null,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(region.getByText('Loading data…')).toBeInTheDocument();
      expect(
        region.getByRole('status', { name: 'Loading' })
      ).toBeInTheDocument();
    });

    it('keeps cached items visible while a background fetch runs', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: 'Han Solo', description: 'Smuggler' },
      ];
      const view = renderResultsSection({
        items,
        hasSearched: true,
        isLoading: false,
        isFetching: true,
        errorMessage: null,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(region.getByText('Han Solo')).toBeInTheDocument();
      expect(region.getByText('Updating results…')).toBeInTheDocument();
      expect(region.queryByText('Loading data…')).not.toBeInTheDocument();
    });
  });

  describe('data display', () => {
    it('correctly displays item names from results', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: 'Han Solo', description: 'Smuggler' },
      ];
      const view = renderResultsSection({
        items,
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: null,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('button', { name: 'View details for Han Solo' })
      ).toBeInTheDocument();
      expect(region.getByText('Han Solo')).toBeInTheDocument();
      expect(region.queryByText('Smuggler')).not.toBeInTheDocument();
    });

    it('handles empty item fields without crashing', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: '', description: '' },
      ];
      const view = renderResultsSection({
        items,
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: null,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(region.getAllByRole('button')).toHaveLength(1);
    });
  });

  describe('manual refresh', () => {
    it('calls onRefresh when the refresh button is clicked', () => {
      const onRefresh = vi.fn();
      const view = renderResultsSection({
        items: [],
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: null,
        pagination: null,
        ...testDetailHandlers,
        isRefreshDisabled: false,
        onRefresh,
      });
      const region = withinRenderedRoot(view);
      fireEvent.click(
        region.getByRole('button', { name: 'Refresh results' })
      );
      expect(onRefresh).toHaveBeenCalledTimes(1);
    });

    it('does not render a refresh button when onRefresh is null', () => {
      const view = renderResultsSection({
        items: [],
        hasSearched: false,
        isLoading: false,
        isFetching: false,
        errorMessage: null,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(
        region.queryByRole('button', { name: 'Refresh results' })
      ).not.toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('hides result cards when an error message is shown', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: 'Han Solo', description: 'Smuggler' },
      ];
      const view = renderResultsSection({
        items,
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: 'Request failed.',
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(region.getByRole('alert')).toHaveTextContent('Request failed.');
      expect(region.queryByText('Han Solo')).not.toBeInTheDocument();
    });
    it('displays error message when API call fails', () => {
      const message = AppFetchErrorMessage.fromUnknown(new Error('SWAPI_HTTP_404'));
      const view = renderResultsSection({
        items: [],
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: message,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(region.getByRole('alert')).toHaveTextContent(message);
    });

    it('shows client-style message for HTTP 4xx responses', () => {
      const message = AppFetchErrorMessage.fromUnknown(
        new Error('SWAPI_HTTP_422')
      );
      const view = renderResultsSection({
        items: [],
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: message,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(region.getByRole('alert')).toHaveTextContent(
        'The server could not fulfill this request (HTTP 422). Try different keywords or try again later.'
      );
    });

    it('shows server-style message for HTTP 5xx responses', () => {
      const message = AppFetchErrorMessage.fromUnknown(
        new Error('SWAPI_HTTP_503')
      );
      const view = renderResultsSection({
        items: [],
        hasSearched: true,
        isLoading: false,
        isFetching: false,
        errorMessage: message,
        pagination: null,
        ...testDetailHandlers,
      });
      const region = withinRenderedRoot(view);
      expect(region.getByRole('alert')).toHaveTextContent(
        'The service is temporarily unavailable (HTTP 503). Please try again in a few minutes.'
      );
    });
  });
});
