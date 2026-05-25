import { useCallback } from 'react';
import {
  clearSelected,
  selectSelectedItems,
  toggleSelected,
} from '../store';
import type { PersonResultItem } from '../types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export function useSelectedItemsStore() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectSelectedItems);

  const toggleItem = useCallback(
    (item: PersonResultItem) => {
      dispatch(toggleSelected(item));
    },
    [dispatch]
  );

  const clearItems = useCallback(() => {
    dispatch(clearSelected());
  }, [dispatch]);

  return {
    items,
    count: items.length,
    toggleItem,
    clearItems,
  };
}
