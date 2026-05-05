import { Component } from 'react';
import { SwapiPeopleApi } from '../api/fetchSwapiPeople';
import type { PeoplePaginationProps } from '../types';
import './PeoplePagination.css';

export class PeoplePagination extends Component<PeoplePaginationProps> {
  render() {
    const { page, totalCount, hasNext, hasPrev, onNext, onPrev } = this.props;
    const totalPages = Math.max(
      1,
      Math.ceil(totalCount / SwapiPeopleApi.pageSize)
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
}
