'use client';

import { useCallback } from 'react';
import { SELECTED_ITEMS_FLYOUT } from '../constants';
import { useSelectedItemsStore } from '../hooks/useSelectedItemsStore';
import { formatSelectedItemsCount } from '../utils/formatSelectedItemsCount';
import { SelectedItemsCsvDownload } from '../utils/selectedItemsCsvDownload';
import './SelectedItemsFlyout.css';

export function SelectedItemsFlyout() {
  const { count, items, clearItems } = useSelectedItemsStore();

  const handleUnselectAll = useCallback((): void => {
    clearItems();
  }, [clearItems]);

  const handleDownload = useCallback((): void => {
    SelectedItemsCsvDownload.download(items);
  }, [items]);

  if (count === 0) {
    return null;
  }

  return (
    <aside
      className="selected-items-flyout"
      role="region"
      aria-label={SELECTED_ITEMS_FLYOUT.regionLabel}
    >
      <p className="selected-items-flyout__count">
        {formatSelectedItemsCount(count)}
      </p>
      <div className="selected-items-flyout__actions">
        <button
          type="button"
          className="selected-items-flyout__button selected-items-flyout__button--secondary"
          onClick={handleUnselectAll}
        >
          {SELECTED_ITEMS_FLYOUT.unselectAllLabel}
        </button>
        <button
          type="button"
          className="selected-items-flyout__button selected-items-flyout__button--primary"
          onClick={handleDownload}
        >
          {SELECTED_ITEMS_FLYOUT.downloadLabel}
        </button>
      </div>
    </aside>
  );
}
