import { fireEvent, render, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SelectedItemsFlyout } from '../components/SelectedItemsFlyout';
import { ReduxProvider } from '../store/ReduxProvider';
import { store } from '../store';
import { toggleSelected } from '../store/selectedItemsSlice';
import type { PersonResultItem } from '../types';
import { resetStoreState } from './renderWithRouter';
import { withinRenderedRoot } from './withinRenderedRoot';

const luke: PersonResultItem = {
  id: 'https://swapi.py4e.com/api/people/1/',
  name: 'Luke Skywalker',
  description: 'Gender: male',
};

const generatedCsv = {
  csv: 'Name,Description,Details URL,SWAPI URL,Person ID\nLuke,Gender: male,/details,url,1',
  filename: '1_items.csv',
};

vi.mock('../actions/generateSelectedItemsCsv', () => ({
  generateSelectedItemsCsvAction: vi.fn(async () => generatedCsv),
}));

vi.mock('../utils/downloadCsvFile', () => ({
  downloadCsvFile: vi.fn(),
}));

function renderFlyout() {
  return render(
    <ReduxProvider>
      <SelectedItemsFlyout />
    </ReduxProvider>
  );
}

describe('SelectedItemsFlyout', () => {
  beforeEach(async () => {
    cleanup();
    resetStoreState();
    const { generateSelectedItemsCsvAction } = await import(
      '../actions/generateSelectedItemsCsv'
    );
    vi.mocked(generateSelectedItemsCsvAction).mockResolvedValue(generatedCsv);
    const { downloadCsvFile } = await import('../utils/downloadCsvFile');
    vi.mocked(downloadCsvFile).mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('is hidden when no items are selected', () => {
    const view = renderFlyout();
    const region = withinRenderedRoot(view);
    expect(
      region.queryByRole('region', { name: 'Selected items' })
    ).not.toBeInTheDocument();
  });

  it('shows a sticky flyout with the selected count', () => {
    store.dispatch(toggleSelected(luke));
    const view = renderFlyout();
    const region = withinRenderedRoot(view);
    const flyout = region.getByRole('region', { name: 'Selected items' });
    expect(flyout).toHaveClass('selected-items-flyout');
    expect(flyout).toHaveTextContent('1 item selected');
  });

  it('clears all selected items when Unselect all is clicked', () => {
    store.dispatch(toggleSelected(luke));
    const view = renderFlyout();
    const region = withinRenderedRoot(view);
    fireEvent.click(region.getByRole('button', { name: 'Unselect all' }));
    expect(
      region.queryByRole('region', { name: 'Selected items' })
    ).not.toBeInTheDocument();
  });

  it('downloads selected items when Download is clicked', async () => {
    const { generateSelectedItemsCsvAction } = await import(
      '../actions/generateSelectedItemsCsv'
    );
    const { downloadCsvFile } = await import('../utils/downloadCsvFile');

    store.dispatch(toggleSelected(luke));
    const view = renderFlyout();
    const region = withinRenderedRoot(view);
    fireEvent.click(region.getByRole('button', { name: 'Download' }));

    await waitFor(() => {
      expect(generateSelectedItemsCsvAction).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(downloadCsvFile).toHaveBeenCalledWith(
        generatedCsv.csv,
        generatedCsv.filename
      );
    });
  });
});
