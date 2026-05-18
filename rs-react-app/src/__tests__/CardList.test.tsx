import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CardList } from '../components/CardList';
import type { PersonResultItem } from '../types';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

describe('CardList', () => {
  beforeEach(() => {
    cleanup();
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
      const view = render(
        <CardList
          items={items}
          selectedItemId={null}
          onItemSelect={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getAllByRole('button')).toHaveLength(3);
    });
  });

  describe('data display', () => {
    it('correctly displays item names and descriptions', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: 'Leia Organa', description: 'Princess of Alderaan' },
      ];
      const view = render(
        <CardList
          items={items}
          selectedItemId={null}
          onItemSelect={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('button', { name: 'View details for Leia Organa' })
      ).toBeInTheDocument();
      expect(
        region.getByText('Princess of Alderaan')
      ).toBeInTheDocument();
    });

    it('handles missing textual fields without crashing', () => {
      const items: PersonResultItem[] = [
        { id: '1', name: '', description: '' },
      ];
      const view = render(
        <CardList
          items={items}
          selectedItemId={null}
          onItemSelect={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('list', { name: 'Search results' })
      ).toBeInTheDocument();
      expect(region.getAllByRole('button')).toHaveLength(1);
    });
  });
});
