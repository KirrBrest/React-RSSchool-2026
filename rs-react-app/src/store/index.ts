import { configureStore } from '@reduxjs/toolkit';
import { countriesSlice } from './countriesSlice';
import { submissionsSlice } from './submissionsSlice';

export const store = configureStore({
  reducer: {
    submissions: submissionsSlice.reducer,
    countries: countriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  addSubmission,
  clearSubmissionHighlight,
  clearSubmissions,
  selectLastSubmittedId,
  selectSubmissions,
} from './submissionsSlice';
export { selectCountryNames } from './countriesSlice';
