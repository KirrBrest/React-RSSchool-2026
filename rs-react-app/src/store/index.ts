import { configureStore } from '@reduxjs/toolkit';
import { submissionsSlice } from './submissionsSlice';

export const store = configureStore({
  reducer: {
    submissions: submissionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  addSubmission,
  clearSubmissions,
  selectSubmissions,
} from './submissionsSlice';
