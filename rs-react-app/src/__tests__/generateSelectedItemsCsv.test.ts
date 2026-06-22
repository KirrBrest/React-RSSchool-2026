import { describe, it, expect } from 'vitest';
import { SELECTED_ITEMS_CSV } from '../constants';
import { generateSelectedItemsCsvAction } from '../actions/generateSelectedItemsCsv';
import type { PersonResultItem } from '../types';

const luke: PersonResultItem = {
  id: 'https://swapi.py4e.com/api/people/1/',
  name: 'Luke Skywalker',
  description: 'Gender: male',
};

describe('generateSelectedItemsCsvAction', () => {
  it('returns null when no items are selected', async () => {
    const result = await generateSelectedItemsCsvAction(null, {
      items: [],
      origin: 'https://example.com',
    });

    expect(result).toBeNull();
  });

  it('generates CSV content and filename on the server', async () => {
    const result = await generateSelectedItemsCsvAction(null, {
      items: [luke],
      origin: 'https://example.com',
    });

    expect(result).not.toBeNull();
    expect(result?.filename).toBe('1_items.csv');
    expect(result?.csv.startsWith(SELECTED_ITEMS_CSV.header)).toBe(true);
    expect(result?.csv).toContain('Luke Skywalker');
    expect(result?.csv).toContain('https://example.com/details?details=1&page=1');
  });

  it('uses the selected count in the generated filename', async () => {
    const result = await generateSelectedItemsCsvAction(null, {
      items: [luke, luke],
      origin: 'https://example.com',
    });

    expect(result?.filename).toBe('2_items.csv');
  });
});
