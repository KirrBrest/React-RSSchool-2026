import { fireEvent, render, cleanup } from '@testing-library/react';
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
    it('displays item name and checkbox correctly', () => {
      const view = render(
        <Card
          id="1"
          name="Luke Skywalker"
          isDetailsSelected={false}
          isChecked={false}
          onToggleCheck={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      ).toBeInTheDocument();
      expect(
        region.getByRole('link', { name: 'View details for Luke Skywalker' })
      ).toBeInTheDocument();
      expect(region.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('handles missing name gracefully', () => {
      const view = render(
        <Card
          id="1"
          name=""
          isDetailsSelected={false}
          isChecked={false}
          onToggleCheck={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('checkbox', { name: 'Select person' })
      ).toBeInTheDocument();
      expect(
        region.getByRole('link', { name: 'View details for person' })
      ).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('toggles selection only when the checkbox is used', () => {
      const onToggleCheck = vi.fn();
      const view = render(
        <Card
          id="https://swapi.py4e.com/api/people/1/"
          name="Luke Skywalker"
          isDetailsSelected={false}
          isChecked={false}
          onToggleCheck={onToggleCheck}
        />
      );
      const region = withinRenderedRoot(view);
      fireEvent.click(
        region.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      expect(onToggleCheck).toHaveBeenCalledTimes(1);
    });

    it('links to the localized details route', () => {
      const view = render(
        <Card
          id="https://swapi.py4e.com/api/people/1/"
          name="Luke Skywalker"
          isDetailsSelected={false}
          isChecked={true}
          onToggleCheck={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('link', { name: 'View details for Luke Skywalker' })
      ).toHaveAttribute('href', '/details?page=1&details=1');
    });
  });

  describe('state classes', () => {
    it('applies selected and checked modifiers', () => {
      const view = render(
        <Card
          id="1"
          name="Luke Skywalker"
          isDetailsSelected={true}
          isChecked={true}
          onToggleCheck={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(region.getByRole('checkbox').closest('.result-card')).toHaveClass(
        'result-card--selected',
        'result-card--checked'
      );
    });
  });
});
