'use server';

import {
  buildSelectedItemsCsv,
  buildSelectedItemsCsvFilename,
} from '@/utils/selectedItemsCsv';
import type { PersonResultItem } from '@/types';

export type GeneratedSelectedItemsCsv = {
  csv: string;
  filename: string;
};

export type SelectedItemsCsvRequest = {
  items: PersonResultItem[];
  origin: string;
};

export async function generateSelectedItemsCsvAction(
  _previousState: GeneratedSelectedItemsCsv | null,
  payload: SelectedItemsCsvRequest
): Promise<GeneratedSelectedItemsCsv | null> {
  const { items, origin } = payload;

  if (items.length === 0) {
    return null;
  }

  return {
    csv: buildSelectedItemsCsv(items, origin),
    filename: buildSelectedItemsCsvFilename(items.length),
  };
}
