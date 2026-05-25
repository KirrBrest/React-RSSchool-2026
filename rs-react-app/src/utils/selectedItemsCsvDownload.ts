import { SELECTED_ITEMS_CSV } from '../constants';
import type { PersonResultItem } from '../types';

function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function buildCsv(items: PersonResultItem[]): string {
  const rows = items.map((item) =>
    [item.id, item.name, item.description]
      .map(escapeCsvField)
      .join(',')
  );
  return [SELECTED_ITEMS_CSV.header, ...rows].join('\n');
}

function download(items: PersonResultItem[]): void {
  if (items.length === 0) {
    return;
  }
  const csv = buildCsv(items);
  const blob = new Blob([csv], { type: SELECTED_ITEMS_CSV.mimeType });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = SELECTED_ITEMS_CSV.filename;
  link.click();
  URL.revokeObjectURL(objectUrl);
}

export const SelectedItemsCsvDownload = {
  buildCsv,
  download,
};
