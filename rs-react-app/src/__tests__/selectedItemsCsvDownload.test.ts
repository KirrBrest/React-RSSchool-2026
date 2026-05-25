import { describe, it, expect, vi } from 'vitest';
import { SELECTED_ITEMS_CSV } from '../constants';
import { SelectedItemsCsvDownload } from '../utils/selectedItemsCsvDownload';
import type { PersonResultItem } from '../types';

const luke: PersonResultItem = {
  id: 'https://swapi.py4e.com/api/people/1/',
  name: 'Luke Skywalker',
  description: 'Gender: male',
};

describe('SelectedItemsCsvDownload', () => {
  it('builds a CSV with required columns and escaped fields', () => {
    const csv = SelectedItemsCsvDownload.buildCsv([
      luke,
      {
        id: '2',
        name: 'Leia "Organa"',
        description: 'Line\nbreak',
      },
    ]);
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
  });

  it('builds a filename from the number of selected items', () => {
    expect(SelectedItemsCsvDownload.buildFilename(1)).toBe('1_items.csv');
    expect(SelectedItemsCsvDownload.buildFilename(15)).toBe('15_items.csv');
  });

  it('downloads selected items through native browser APIs', () => {
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

    SelectedItemsCsvDownload.download([luke]);

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

  it('uses the selected count in the download filename', () => {
    const createObjectURL = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:selected');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    const link = document.createElement('a');
    link.click = vi.fn();
    vi.spyOn(document, 'createElement').mockReturnValue(link);

    SelectedItemsCsvDownload.download([luke, luke]);

    expect(link.download).toBe('2_items.csv');

    createObjectURL.mockRestore();
    vi.restoreAllMocks();
  });

  it('does nothing when the items list is empty', () => {
    const createObjectURL = vi.spyOn(URL, 'createObjectURL');
    SelectedItemsCsvDownload.download([]);
    expect(createObjectURL).not.toHaveBeenCalled();
    createObjectURL.mockRestore();
  });

  it('builds relative details URLs when window is unavailable', () => {
    const originalWindow = globalThis.window;
    Reflect.deleteProperty(globalThis, 'window');

    try {
      const csv = SelectedItemsCsvDownload.buildCsv([luke]);
      expect(csv).toContain('/details?details=1&page=1');
      expect(csv).not.toMatch(/^https?:\/\//m);
    } finally {
      globalThis.window = originalWindow;
    }
  });
});
