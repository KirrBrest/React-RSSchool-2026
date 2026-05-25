import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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
    it('displays item name correctly', () => {
      const view = render(
        <Card
          id="1"
          name="Luke Skywalker"
          isSelected={false}
          onSelect={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('button', { name: 'View details for Luke Skywalker' })
      ).toBeInTheDocument();
      expect(region.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('handles missing name gracefully', () => {
      const view = render(
        <Card id="1" name="" isSelected={false} onSelect={vi.fn()} />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('button', { name: 'View details for person' })
      ).toBeInTheDocument();
    });
  });
});
