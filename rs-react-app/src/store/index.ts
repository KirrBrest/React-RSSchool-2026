import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { selectedItemsReducer } from './selectedItemsSlice';
import { swapiApi } from './swapiApi';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [swapiApi.reducerPath]: swapiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapiApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  clearSelected,
  selectIsItemSelected,
  selectSelectedCount,
  selectSelectedItems,
  toggleSelected,
} from './selectedItemsSlice';

export type { SelectedItemsState } from './selectedItemsSlice';

export { useGetPeopleQuery, useGetPersonQuery } from './swapiApi';

export function invalidatePeopleListCache(): void {
  store.dispatch(swapiApi.util.invalidateTags(['PeopleList']));
}

export function invalidatePersonCache(personId?: string): void {
  if (personId !== undefined) {
    store.dispatch(
      swapiApi.util.invalidateTags([{ type: 'Person', id: personId }])
    );
    return;
  }
  store.dispatch(swapiApi.util.invalidateTags(['Person']));
}

export function invalidateAllSwapiCache(): void {
  store.dispatch(swapiApi.util.invalidateTags(['PeopleList', 'Person']));
}

export function resetSwapiApiState(): void {
  store.dispatch(swapiApi.util.resetApiState());
}
