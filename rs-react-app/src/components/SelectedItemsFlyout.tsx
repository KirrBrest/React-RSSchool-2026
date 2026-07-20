'use client';

import { useActionState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { generateSelectedItemsCsvAction } from '@/actions/generateSelectedItemsCsv';
import { useSelectedItemsStore } from '../hooks/useSelectedItemsStore';
import { downloadCsvFile } from '../utils/downloadCsvFile';
import './SelectedItemsFlyout.css';

export function SelectedItemsFlyout() {
  const t = useTranslations('SelectedItemsFlyout');
  const { count, items, clearItems } = useSelectedItemsStore();
  const [csvResult, requestCsvDownload, isPending] = useActionState(
    generateSelectedItemsCsvAction,
    null
  );

  useEffect(() => {
    if (csvResult === null) {
      return;
    }

    downloadCsvFile(csvResult.csv, csvResult.filename);
  }, [csvResult]);

  const handleUnselectAll = useCallback((): void => {
    clearItems();
  }, [clearItems]);

  const handleDownload = useCallback((): void => {
    requestCsvDownload({ items, origin: window.location.origin });
  }, [items, requestCsvDownload]);

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
          disabled={isPending}
        >
          {t('downloadLabel')}
        </button>
      </div>
    </aside>
  );
}
