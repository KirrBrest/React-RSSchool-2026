import { SWAPI_PAGE_SIZE } from '../constants';
import type { PeoplePaginationProps } from '../types';
import './PeoplePagination.css';

export function PeoplePagination({
  page,
  totalCount,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}: PeoplePaginationProps) {
  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / SWAPI_PAGE_SIZE)
  );
  return (
    <nav className="people-pagination" aria-label="People list pages">
      <button
        type="button"
        className="people-pagination__btn"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        Previous
      </button>
      <span className="people-pagination__status">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        className="people-pagination__btn"
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
      </button>
    </nav>
  );
}
