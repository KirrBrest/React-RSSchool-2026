import type { ReactNode } from 'react';

export type SwapiPerson = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
};

export type SwapiPeopleListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiPerson[];
};

export type PersonResultItem = {
  id: string;
  name: string;
  description: string;
};

export type AppState = {
  results: PersonResultItem[];
  hasSearched: boolean;
  lastFetchedTerm: string | null;
  isLoading: boolean;
  errorMessage: string | null;
  listPage: number;
  listHasNext: boolean;
  listHasPrev: boolean;
  listTotalCount: number;
  simulateCrash: boolean;
};

export type FetchOptions = {
  skipIfUnchanged: boolean;
  page?: number;
};

export type AppErrorBoundaryProps = {
  children: ReactNode;
};

export type AppErrorBoundaryState = {
  hasError: boolean;
  resetKey: number;
};

export type SearchSectionProps = {
  onSearch: (trimmedTerm: string) => void;
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
};

export type CardProps = {
  name: string;
  description: string;
};

export type CardListProps = {
  items: PersonResultItem[];
};
