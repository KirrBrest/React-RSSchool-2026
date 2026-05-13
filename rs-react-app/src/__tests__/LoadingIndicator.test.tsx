import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ResultsSection } from '../components/ResultsSection';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

describe('LoadingIndicator', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('renders loading indicator', () => {
      const view = render(<LoadingIndicator />);
      const region = withinRenderedRoot(view);
      const indicator = region.getByRole('status', { name: 'Loading' });
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass('loading-indicator');
    });

    it('shows when loading and hides when loading is off', () => {
      const view = render(
        <ResultsSection
          items={[]}
          hasSearched={false}
          isLoading
          errorMessage={null}
          pagination={null}
        />
      );
      expect(
        withinRenderedRoot(view).getByRole('status', { name: 'Loading' })
      ).toBeInTheDocument();

      view.rerender(
        <ResultsSection
          items={[]}
          hasSearched={false}
          isLoading={false}
          errorMessage={null}
          pagination={null}
        />
      );
      expect(
        withinRenderedRoot(view).queryByRole('status', { name: 'Loading' })
      ).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has appropriate ARIA labels for screen readers', () => {
      const view = render(<LoadingIndicator />);
      const region = withinRenderedRoot(view);
      expect(region.getByLabelText('Loading')).toBeInTheDocument();
      expect(
        region.getByRole('status', { name: 'Loading' })
      ).toBeInTheDocument();
    });
  });
});
