import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Card } from '../components/Card';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

describe('Card', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('displays item name and description correctly', () => {
      const view = render(
        <Card name="Luke Skywalker" description="Moisture farmer" />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('heading', { name: 'Luke Skywalker' })
      ).toBeInTheDocument();
      expect(region.getByText('Moisture farmer')).toBeInTheDocument();
    });

    it('handles missing props gracefully', () => {
      const view = render(<Card name="" description="" />);
      const region = withinRenderedRoot(view);
      expect(region.getByRole('article')).toBeInTheDocument();
      expect(region.getByRole('heading', { level: 3 })).toHaveTextContent('');
      expect(region.getByRole('paragraph')).toHaveTextContent('');
    });
  });
});
