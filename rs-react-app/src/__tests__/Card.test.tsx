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
          onOpenDetails={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      ).toBeInTheDocument();
      expect(
        region.getByRole('button', { name: 'View details for Luke Skywalker' })
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
          onOpenDetails={vi.fn()}
        />
      );
      const region = withinRenderedRoot(view);
      expect(
        region.getByRole('checkbox', { name: 'Select person' })
      ).toBeInTheDocument();
      expect(
        region.getByRole('button', { name: 'View details for person' })
      ).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('toggles selection only when the checkbox is used', () => {
      const onToggleCheck = vi.fn();
      const onOpenDetails = vi.fn();
      const view = render(
        <Card
          id="https://swapi.py4e.com/api/people/1/"
          name="Luke Skywalker"
          isDetailsSelected={false}
          isChecked={false}
          onToggleCheck={onToggleCheck}
          onOpenDetails={onOpenDetails}
        />
      );
      const region = withinRenderedRoot(view);
      fireEvent.click(
        region.getByRole('checkbox', { name: 'Select Luke Skywalker' })
      );
      expect(onToggleCheck).toHaveBeenCalledTimes(1);
      expect(onOpenDetails).not.toHaveBeenCalled();
    });

    it('opens details without toggling selection when the card body is clicked', () => {
      const onToggleCheck = vi.fn();
      const onOpenDetails = vi.fn();
      const view = render(
        <Card
          id="https://swapi.py4e.com/api/people/1/"
          name="Luke Skywalker"
          isDetailsSelected={false}
          isChecked={true}
          onToggleCheck={onToggleCheck}
          onOpenDetails={onOpenDetails}
        />
      );
      const region = withinRenderedRoot(view);
      fireEvent.click(
        region.getByRole('button', { name: 'View details for Luke Skywalker' })
      );
      expect(onOpenDetails).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api/people/1/'
      );
      expect(onToggleCheck).not.toHaveBeenCalled();
    });
  });
});
