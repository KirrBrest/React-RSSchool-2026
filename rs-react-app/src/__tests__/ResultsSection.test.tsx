import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ResultsSection } from '../components/ResultsSection';
import type { PersonResultItem } from '../types';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

describe('ResultsSection', () => {
  beforeEach(() => {
    cleanup();
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
      const view = render(
        <ResultsSection
          items={items}
          hasSearched
          isLoading={false}
          errorMessage={null}
          pagination={null}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getAllByRole('article')).toHaveLength(2);
    });

    it('displays no results message when data array is empty', () => {
      const view = render(
        <ResultsSection
          items={[]}
          hasSearched
          isLoading={false}
          errorMessage={null}
          pagination={null}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByText('No matching people.')
      ).toBeInTheDocument();
    });

    it('shows loading state while fetching data', () => {
      const view = render(
        <ResultsSection
          items={[]}
          hasSearched={false}
          isLoading
          errorMessage={null}
          pagination={null}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getByText('Loading data…')).toBeInTheDocument();
      expect(
        region.getByRole('status', { name: 'Loading' })
      ).toBeInTheDocument();
    });
  });

  describe('data display', () => {
    it('correctly displays item names and descriptions from results', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: 'Han Solo', description: 'Smuggler' },
      ];
      const view = render(
        <ResultsSection
          items={items}
          hasSearched
          isLoading={false}
          errorMessage={null}
          pagination={null}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('heading', { name: 'Han Solo' })
      ).toBeInTheDocument();
      expect(region.getByText('Smuggler')).toBeInTheDocument();
    });

    it('handles empty item fields without crashing', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: '', description: '' },
      ];
      const view = render(
        <ResultsSection
          items={items}
          hasSearched
          isLoading={false}
          errorMessage={null}
          pagination={null}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getAllByRole('article')).toHaveLength(1);
    });
  });

  describe('error handling', () => {
    it('displays error message when API call fails', () => {
      const message = AppFetchErrorMessage.fromUnknown(new Error('SWAPI_HTTP_404'));
      const view = render(
        <ResultsSection
          items={[]}
          hasSearched
          isLoading={false}
          errorMessage={message}
          pagination={null}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getByRole('alert')).toHaveTextContent(message);
    });

    it('shows client-style message for HTTP 4xx responses', () => {
      const message = AppFetchErrorMessage.fromUnknown(
        new Error('SWAPI_HTTP_422')
      );
      const view = render(
        <ResultsSection
          items={[]}
          hasSearched
          isLoading={false}
          errorMessage={message}
          pagination={null}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getByRole('alert')).toHaveTextContent(
        'The server could not fulfill this request (HTTP 422). Try different keywords or try again later.'
      );
    });

    it('shows server-style message for HTTP 5xx responses', () => {
      const message = AppFetchErrorMessage.fromUnknown(
        new Error('SWAPI_HTTP_503')
      );
      const view = render(
        <ResultsSection
          items={[]}
          hasSearched
          isLoading={false}
          errorMessage={message}
          pagination={null}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getByRole('alert')).toHaveTextContent(
        'The service is temporarily unavailable (HTTP 503). Please try again in a few minutes.'
      );
    });
  });
});
