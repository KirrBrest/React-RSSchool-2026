import type { ReactNode } from 'react';

type SearchResultsLayoutProps = {
  isDetailsOpen: boolean;
  master: ReactNode;
  details: ReactNode;
};

export function SearchResultsLayout({
  isDetailsOpen,
  master,
  details,
}: SearchResultsLayoutProps) {
  return (
    <div
      className={
        isDetailsOpen ? 'app__split app__split--open' : 'app__split'
      }
    >
      <div className="app__master">{master}</div>
      <aside className="app__detail">{details}</aside>
    </div>
  );
}
