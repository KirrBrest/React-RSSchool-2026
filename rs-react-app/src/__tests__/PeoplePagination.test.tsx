import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PeoplePagination } from '../components/PeoplePagination';
import { SWAPI_PAGE_SIZE } from '../constants';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

describe('PeoplePagination', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('computes total pages from total count and page size', () => {
    const view = render(
      <PeoplePagination
        page={2}
        totalCount={SWAPI_PAGE_SIZE * 3 + 1}
        hasNext
        hasPrev
      />
    );
    const region = withinRenderedRoot(view);
    expect(region.getByText('Page 2 of 4')).toBeInTheDocument();
  });

  it('renders a disabled previous control when there is no previous page', () => {
    const view = render(
      <PeoplePagination
        page={1}
        totalCount={SWAPI_PAGE_SIZE}
        hasNext
        hasPrev={false}
      />
    );
    const region = withinRenderedRoot(view);
    expect(region.queryByRole('link', { name: 'Previous' })).not.toBeInTheDocument();
    expect(region.getByText('Previous')).toHaveAttribute('aria-disabled', 'true');
    expect(region.getByRole('link', { name: 'Next' })).toHaveAttribute(
      'href',
      '/?page=2'
    );
  });

  it('renders a disabled next control when there is no next page', () => {
    const view = render(
      <PeoplePagination
        page={3}
        totalCount={SWAPI_PAGE_SIZE * 3}
        hasNext={false}
        hasPrev
      />
    );
    const region = withinRenderedRoot(view);
    expect(region.getByRole('link', { name: 'Previous' })).toHaveAttribute(
      'href',
      '/?page=2'
    );
    expect(region.queryByRole('link', { name: 'Next' })).not.toBeInTheDocument();
    expect(region.getByText('Next')).toHaveAttribute('aria-disabled', 'true');
  });
});
