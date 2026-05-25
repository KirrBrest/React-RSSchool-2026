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
  it('builds a CSV with header and escaped fields', () => {
    const csv = SelectedItemsCsvDownload.buildCsv([
      luke,
      {
        id: '2',
        name: 'Leia "Organa"',
        description: 'Line\nbreak',
      },
    ]);
    expect(csv).toBe(
      [
        SELECTED_ITEMS_CSV.header,
        'https://swapi.py4e.com/api/people/1/,Luke Skywalker,Gender: male',
        '2,"Leia ""Organa""","Line\nbreak"',
      ].join('\n')
    );
  });

  it('downloads selected items through a temporary link', () => {
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
    expect(link.download).toBe(SELECTED_ITEMS_CSV.filename);
    expect(click).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:selected');

    createObjectURL.mockRestore();
    revokeObjectURL.mockRestore();
    createElement.mockRestore();
  });

  it('does nothing when the items list is empty', () => {
    const createObjectURL = vi.spyOn(URL, 'createObjectURL');
    SelectedItemsCsvDownload.download([]);
    expect(createObjectURL).not.toHaveBeenCalled();
    createObjectURL.mockRestore();
  });
});
