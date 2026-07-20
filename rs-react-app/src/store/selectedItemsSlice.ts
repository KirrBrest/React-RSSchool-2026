import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PersonResultItem } from '../types';

export type SelectedItemsState = {
  items: PersonResultItem[];
};

const initialState: SelectedItemsState = {
  items: [],
};

function findItemIndex(items: PersonResultItem[], id: string): number {
  return items.findIndex((item) => item.id === id);
}

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelected(state, action: PayloadAction<PersonResultItem>) {
      const index = findItemIndex(state.items, action.payload.id);
      if (index === -1) {
        state.items.push(action.payload);
        return;
      }
      state.items.splice(index, 1);
    },
    clearSelected(state) {
      state.items = [];
    },
  },
});

export const { toggleSelected, clearSelected } = selectedItemsSlice.actions;
export const selectedItemsReducer = selectedItemsSlice.reducer;

export function selectSelectedItems(state: {
  selectedItems: SelectedItemsState;
}): PersonResultItem[] {
  return state.selectedItems.items;
}

export function selectSelectedCount(state: {
  selectedItems: SelectedItemsState;
}): number {
  return state.selectedItems.items.length;
}

export function selectIsItemSelected(
  state: { selectedItems: SelectedItemsState },
  id: string
): boolean {
  return state.selectedItems.items.some((item) => item.id === id);
}
