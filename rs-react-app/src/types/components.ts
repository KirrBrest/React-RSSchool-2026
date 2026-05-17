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
  onNext: () => void;
  onPrev: () => void;
};

export type ResultsSectionProps = {
  items: PersonResultItem[];
  hasSearched: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  pagination: PeoplePaginationProps | null;
  selectedItemId: string | null;
  onItemSelect: (id: string) => void;
  onMainPanelClick: () => void;
};

export type CardProps = {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export type CardListProps = {
  items: PersonResultItem[];
  selectedItemId: string | null;
  onItemSelect: (id: string) => void;
};
