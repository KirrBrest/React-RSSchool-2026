import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CardList } from '../components/CardList';
import type { PersonResultItem } from '../types';
import { ReduxProvider } from '../store/ReduxProvider';
import { resetStoreState } from './renderWithRouter';
import { withinRenderedRoot } from './withinRenderedRoot';

function renderCardList(
  items: PersonResultItem[],
  selectedItemId: string | null = null
) {
  return render(
    <ReduxProvider>
      <CardList items={items} selectedItemId={selectedItemId} />
    </ReduxProvider>
  );
}

describe('CardList', () => {
  beforeEach(() => {
    cleanup();
    resetStoreState();
  });

  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('renders correct number of items when data is provided', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: 'A', description: 'Da' },
        { id: '2', name: 'B', description: 'Db' },
        { id: '3', name: 'C', description: 'Dc' },
      ];
      const view = renderCardList(items);
      const region = withinRenderedRoot(view);
      expect(region.getAllByRole('checkbox')).toHaveLength(3);
      expect(region.getAllByRole('link')).toHaveLength(3);
    });
  });

  describe('data display', () => {
    it('correctly displays item names', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: 'Leia Organa', description: 'Princess of Alderaan' },
      ];
      const view = renderCardList(items);
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('link', { name: 'View details for Leia Organa' })
      ).toBeInTheDocument();
      expect(region.getByText('Leia Organa')).toBeInTheDocument();
      expect(
        region.queryByText('Princess of Alderaan')
      ).not.toBeInTheDocument();
    });

    it('handles missing textual fields without crashing', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: '', description: '' },
      ];
      const view = renderCardList(items);
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('list', { name: 'Search results' })
      ).toBeInTheDocument();
      expect(region.getAllByRole('checkbox')).toHaveLength(1);
      expect(region.getAllByRole('link')).toHaveLength(1);
    });
  });
});
