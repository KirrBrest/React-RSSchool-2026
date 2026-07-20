import { SELECTED_ITEMS_FLYOUT } from '../constants';

export function formatSelectedItemsCount(count: number): string {
  if (count === 1) {
    return SELECTED_ITEMS_FLYOUT.singleItemCountLabel;
  }
  return `${count} ${SELECTED_ITEMS_FLYOUT.pluralCountSuffix}`;
}
