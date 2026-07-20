import { render, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    const region = withinRenderedRoot(view);
    expect(region.getByText('Page 2 of 4')).toBeInTheDocument();
  });

  it('disables previous button when there is no previous page', () => {
    const view = render(
      <PeoplePagination
        page={1}
        totalCount={SWAPI_PAGE_SIZE}
        hasNext
        hasPrev={false}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    const region = withinRenderedRoot(view);
    const previous = region.getByRole('button', { name: 'Previous' });
    const next = region.getByRole('button', { name: 'Next' });
    expect(previous).toBeDisabled();
    expect(next).not.toBeDisabled();
  });

  it('disables next button when there is no next page', () => {
    const view = render(
      <PeoplePagination
        page={3}
        totalCount={SWAPI_PAGE_SIZE * 3}
        hasNext={false}
        hasPrev
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    const region = withinRenderedRoot(view);
    const previous = region.getByRole('button', { name: 'Previous' });
    const next = region.getByRole('button', { name: 'Next' });
    expect(previous).not.toBeDisabled();
    expect(next).toBeDisabled();
  });

  it('invokes navigation callbacks when buttons are clicked', () => {
    const onNext = vi.fn();
    const onPrev = vi.fn();
    const view = render(
      <PeoplePagination
        page={2}
        totalCount={SWAPI_PAGE_SIZE * 3}
        hasNext
        hasPrev
        onNext={onNext}
        onPrev={onPrev}
      />
    );
    const region = withinRenderedRoot(view);
    fireEvent.click(region.getByRole('button', { name: 'Next' }));
    fireEvent.click(region.getByRole('button', { name: 'Previous' }));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});

