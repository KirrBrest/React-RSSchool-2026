import { fireEvent, render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SelectedItemsFlyout } from '../components/SelectedItemsFlyout';
import { ReduxProvider } from '../store/ReduxProvider';
import { store } from '../store';
import { toggleSelected } from '../store/selectedItemsSlice';
import { SelectedItemsCsvDownload } from '../utils/selectedItemsCsvDownload';
import type { PersonResultItem } from '../types';
import { resetStoreState } from './renderWithRouter.tsx';
import { withinRenderedRoot } from './withinRenderedRoot.ts';

const luke: PersonResultItem = {
  id: 'https://swapi.py4e.com/api/people/1/',
  name: 'Luke Skywalker',
  description: 'Gender: male',
};

function renderFlyout() {
  return render(
    <ReduxProvider>
      <SelectedItemsFlyout />
    </ReduxProvider>
  );
}

describe('SelectedItemsFlyout', () => {
  beforeEach(() => {
    cleanup();
    resetStoreState();
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

  it('downloads selected items when Download is clicked', () => {
    store.dispatch(toggleSelected(luke));
    const download = vi
      .spyOn(SelectedItemsCsvDownload, 'download')
      .mockImplementation(() => {});
    const view = renderFlyout();
    const region = withinRenderedRoot(view);
    fireEvent.click(region.getByRole('button', { name: 'Download' }));
    expect(download).toHaveBeenCalledWith([luke]);
  });
});
