import { describe, it, expect, vi } from 'vitest';
import { SELECTED_ITEMS_CSV } from '../constants';
import {
  buildSelectedItemsCsv,
  buildSelectedItemsCsvFilename,
} from '../utils/selectedItemsCsv';
import type { PersonResultItem } from '../types';

const luke: PersonResultItem = {
  id: 'https://swapi.py4e.com/api/people/1/',
  name: 'Luke Skywalker',
  description: 'Gender: male',
};

describe('selectedItemsCsv', () => {
  it('builds a CSV with required columns and escaped fields', () => {
    const csv = buildSelectedItemsCsv(
      [
        luke,
        {
          id: '2',
          name: 'Leia "Organa"',
          description: 'Line\nbreak',
        },
      ],
      'https://example.com'
    );
    const lines = csv.split('\n');
    expect(lines[0]).toBe(SELECTED_ITEMS_CSV.header);
    expect(lines[1]).toContain('Luke Skywalker');
    expect(lines[1]).toContain('Gender: male');
    expect(lines[1]).toContain('/details?');
    expect(lines[1]).toContain('details=1');
    expect(lines[1]).toContain('page=1');
    expect(lines[1]).toContain('https://swapi.py4e.com/api/people/1/');
    expect(lines[1]).toContain(',1');
    expect(csv).toContain('"Leia ""Organa"""');
    expect(csv).toContain('"Line\nbreak"');
    expect(csv).toContain('details=2');
    expect(csv).toContain('https://example.com/details?details=1&page=1');
  });

  it('builds a filename from the number of selected items', () => {
    expect(buildSelectedItemsCsvFilename(1)).toBe('1_items.csv');
    expect(buildSelectedItemsCsvFilename(15)).toBe('15_items.csv');
  });

  it('builds relative details URLs when origin is empty', () => {
    const csv = buildSelectedItemsCsv([luke]);
    expect(csv).toContain('/details?details=1&page=1');
    expect(csv).not.toMatch(/^https?:\/\//m);
  });
});

describe('downloadCsvFile', () => {
  it('downloads CSV content through native browser APIs', async () => {
    const { downloadCsvFile } = await import('../utils/downloadCsvFile');
    const createObjectURL = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:selected');
    const revokeObjectURL = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});
    const click = vi.fn();
    const link = document.createElement('a');
    link.click = click;
    const createElement = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(link);

    downloadCsvFile(buildSelectedItemsCsv([luke]), '1_items.csv');

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(createElement).toHaveBeenCalledWith('a');
    expect(link.href).toBe('blob:selected');
    expect(link.download).toBe('1_items.csv');
    expect(click).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:selected');

    createObjectURL.mockRestore();
    revokeObjectURL.mockRestore();
    createElement.mockRestore();
  });
});
