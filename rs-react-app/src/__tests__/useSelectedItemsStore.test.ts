import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ReduxProvider } from '../store/ReduxProvider';
import { useSelectedItemsStore } from '../hooks/useSelectedItemsStore';
import type { PersonResultItem } from '../types';

const luke: PersonResultItem = {
  id: 'https://swapi.py4e.com/api/people/1/',
  name: 'Luke Skywalker',
  description: 'Gender: male',
};

function renderSelectedItemsHook() {
  return renderHook(() => useSelectedItemsStore(), {
    wrapper: ReduxProvider,
  });
}

describe('useSelectedItemsStore', () => {
  it('reads and updates selected items through the store', () => {
    const { result } = renderSelectedItemsHook();

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.toggleItem(luke);
    });

    expect(result.current.count).toBe(1);
    expect(result.current.items).toEqual([luke]);

    act(() => {
      result.current.clearItems();
    });

    expect(result.current.count).toBe(0);
    expect(result.current.items).toEqual([]);
  });
});
