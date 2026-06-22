import type { ReactNode } from 'react';
import type { PersonResultItem } from './person';

export type AppErrorBoundaryProps = {
  children: ReactNode;
};

export type AppErrorBoundaryState = {
  hasError: boolean;
  resetKey: number;
};

export type SearchSectionProps = {
  onSearch: (trimmedTerm: string) => void;
  onSearchInputChange: () => void;
};

export type PeoplePaginationProps = {
  page: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type ResultsSectionProps = {
  items: PersonResultItem[];
  hasSearched: boolean;
  isLoading: boolean;
  isFetching: boolean;
  errorMessage: string | null;
  onRefresh: (() => void) | null;
  isRefreshDisabled: boolean;
  pagination: PeoplePaginationProps | null;
  selectedItemId: string | null;
  onMainPanelClick: () => void;
};

export type CardProps = {
  id: string;
  name: string;
  isDetailsSelected: boolean;
  isChecked: boolean;
  onToggleCheck: () => void;
};

export type CardListProps = {
  items: PersonResultItem[];
  selectedItemId: string | null;
};
