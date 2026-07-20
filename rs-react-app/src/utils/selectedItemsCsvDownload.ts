import { SELECTED_ITEMS_CSV } from '../constants';
import type { PersonResultItem } from '../types';
import { openDetailsLocation } from './detailsNavigation';
import { extractPersonId } from './extractPersonId';

function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function buildDetailsUrl(item: PersonResultItem): string {
  const personId = extractPersonId(item.id);
  const { pathname, search } = openDetailsLocation(
    new URLSearchParams(),
    personId
  );
  const path = `${pathname}${search}`;
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  return path;
}

function toCsvRow(item: PersonResultItem): string {
  const fields = [
    item.name,
    item.description,
    buildDetailsUrl(item),
    item.id,
    extractPersonId(item.id),
  ];
  return fields.map(escapeCsvField).join(',');
}

function buildCsv(items: PersonResultItem[]): string {
  const rows = items.map(toCsvRow);
  return [SELECTED_ITEMS_CSV.header, ...rows].join('\n');
}

function buildFilename(itemCount: number): string {
  return `${itemCount}${SELECTED_ITEMS_CSV.filenameSuffix}`;
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
  link.download = buildFilename(items.length);
  link.click();
  URL.revokeObjectURL(objectUrl);
}

export const SelectedItemsCsvDownload = {
  buildCsv,
  buildFilename,
  download,
};
