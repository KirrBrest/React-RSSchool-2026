import { describe, it, expect } from 'vitest';
import { SELECTED_ITEMS_FLYOUT } from '../constants';
import { formatSelectedItemsCount } from '../utils/formatSelectedItemsCount';

describe('formatSelectedItemsCount', () => {
  it('formats a single selected item', () => {
    expect(formatSelectedItemsCount(1)).toBe(
      SELECTED_ITEMS_FLYOUT.singleItemCountLabel
    );
  });

  it('formats multiple selected items', () => {
    expect(formatSelectedItemsCount(3)).toBe('3 items selected');
  });
});
