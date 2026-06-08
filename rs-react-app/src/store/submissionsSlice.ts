import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSubmission, SubmissionInput } from '../types/formSubmission';
import { createSubmissionId } from '../utils/createSubmissionId';
type SubmissionsState = {
  items: FormSubmission[];
};

const initialState: SubmissionsState = {
  items: [],
};

export const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission(state, action: PayloadAction<SubmissionInput>) {
      const submission: FormSubmission = {
        ...action.payload,
        id: createSubmissionId(),
        submittedAt: new Date().toISOString(),
      };
      state.items.unshift(submission);
    },
    clearSubmissions(state) {
      state.items = [];
    },
  },
});

export const { addSubmission, clearSubmissions } = submissionsSlice.actions;

type SubmissionsRootState = {
  submissions: SubmissionsState;
};

export const selectSubmissions = (state: SubmissionsRootState): FormSubmission[] =>
  state.submissions.items;
