import { configureStore } from '@reduxjs/toolkit';
import { formsAppSlice } from './formsAppSlice';

export const store = configureStore({
  reducer: {
    formsApp: formsAppSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
