import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  clearSelected,
  selectedItemsReducer,
  selectIsItemSelected,
  selectSelectedCount,
  selectSelectedItems,
  toggleSelected,
} from '../store/selectedItemsSlice';
import type { PersonResultItem } from '../types';

const luke: PersonResultItem = {
  id: 'https://swapi.py4e.com/api/people/1/',
  name: 'Luke Skywalker',
  description: 'Gender: male',
};

const leia: PersonResultItem = {
  id: 'https://swapi.py4e.com/api/people/2/',
  name: 'Leia Organa',
  description: 'Gender: female',
};

function createTestStore() {
  return configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
  });
}

describe('selectedItemsSlice', () => {
  it('starts with an empty selection', () => {
    const store = createTestStore();
    expect(selectSelectedItems(store.getState())).toEqual([]);
    expect(selectSelectedCount(store.getState())).toBe(0);
  });

  it('adds and removes items when toggled', () => {
    const store = createTestStore();
    store.dispatch(toggleSelected(luke));
    expect(selectSelectedItems(store.getState())).toEqual([luke]);
    expect(selectIsItemSelected(store.getState(), luke.id)).toBe(true);

    store.dispatch(toggleSelected(luke));
    expect(selectSelectedItems(store.getState())).toEqual([]);
    expect(selectIsItemSelected(store.getState(), luke.id)).toBe(false);
  });

  it('keeps multiple selected items', () => {
    const store = createTestStore();
    store.dispatch(toggleSelected(luke));
    store.dispatch(toggleSelected(leia));
    expect(selectSelectedCount(store.getState())).toBe(2);
    expect(selectSelectedItems(store.getState())).toEqual([luke, leia]);
  });

  it('clears all selected items', () => {
    const store = createTestStore();
    store.dispatch(toggleSelected(luke));
    store.dispatch(toggleSelected(leia));
    store.dispatch(clearSelected());
    expect(selectSelectedItems(store.getState())).toEqual([]);
    expect(selectSelectedCount(store.getState())).toBe(0);
  });
});
