import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSubmission, SubmissionInput } from '../types/formSubmission';
import { createSubmissionId } from '../utils/createSubmissionId';

type SubmissionsState = {
  items: FormSubmission[];
  lastSubmittedId: string | null;
};

const initialState: SubmissionsState = {
  items: [],
  lastSubmittedId: null,
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
      state.lastSubmittedId = submission.id;
    },
    clearSubmissionHighlight(state) {
      state.lastSubmittedId = null;
    },
    clearSubmissions(state) {
      state.items = [];
      state.lastSubmittedId = null;
    },
  },
});

export const {
  addSubmission,
  clearSubmissionHighlight,
  clearSubmissions,
} = submissionsSlice.actions;

type SubmissionsRootState = {
  submissions: SubmissionsState;
};

export const selectSubmissions = (state: SubmissionsRootState): FormSubmission[] =>
  state.submissions.items;

export const selectLastSubmittedId = (
  state: SubmissionsRootState
): string | null => state.submissions.lastSubmittedId;
