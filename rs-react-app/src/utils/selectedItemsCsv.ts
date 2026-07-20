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

function buildDetailsUrl(item: PersonResultItem, origin: string): string {
  const personId = extractPersonId(item.id);
  const { pathname, search } = openDetailsLocation(
    new URLSearchParams(),
    personId
  );
  const path = `${pathname}${search}`;
  return origin ? `${origin}${path}` : path;
}

function toCsvRow(item: PersonResultItem, origin: string): string {
  const fields = [
    item.name,
    item.description,
    buildDetailsUrl(item, origin),
    item.id,
    extractPersonId(item.id),
  ];
  return fields.map(escapeCsvField).join(',');
}

export function buildSelectedItemsCsv(
  items: PersonResultItem[],
  origin = ''
): string {
  const rows = items.map((item) => toCsvRow(item, origin));
  return [SELECTED_ITEMS_CSV.header, ...rows].join('\n');
}

export function buildSelectedItemsCsvFilename(itemCount: number): string {
  return `${itemCount}${SELECTED_ITEMS_CSV.filenameSuffix}`;
}
