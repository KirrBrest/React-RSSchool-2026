'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSelectedItemsStore } from '../hooks/useSelectedItemsStore';
import { SelectedItemsCsvDownload } from '../utils/selectedItemsCsvDownload';
import './SelectedItemsFlyout.css';

export function SelectedItemsFlyout() {
  const t = useTranslations('SelectedItemsFlyout');
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

  const countLabel =
    count === 1
      ? t('singleItemCountLabel')
      : t('pluralCountLabel', { count });

  return (
    <aside
      className="selected-items-flyout"
      role="region"
      aria-label={t('regionLabel')}
    >
      <p className="selected-items-flyout__count">{countLabel}</p>
      <div className="selected-items-flyout__actions">
        <button
          type="button"
          className="selected-items-flyout__button selected-items-flyout__button--secondary"
          onClick={handleUnselectAll}
        >
          {t('unselectAllLabel')}
        </button>
        <button
          type="button"
          className="selected-items-flyout__button selected-items-flyout__button--primary"
          onClick={handleDownload}
        >
          {t('downloadLabel')}
        </button>
      </div>
    </aside>
  );
}
