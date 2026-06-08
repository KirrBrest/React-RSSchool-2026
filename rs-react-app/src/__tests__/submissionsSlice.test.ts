import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';
import { countriesSlice } from '../store/countriesSlice';
import {
  addSubmission,
  selectSubmissions,
  submissionsSlice,
} from '../store/submissionsSlice';

const sampleSubmission = {
  source: 'uncontrolled',
  name: 'Ada Lovelace',
  age: 36,
  email: 'ada@example.com',
  gender: 'female',
  country: 'United Kingdom',
  pictureDataUrl: 'data:image/png;base64,abc',
} satisfies Parameters<typeof addSubmission>[0];

describe('submissionsSlice', () => {
  it('stores successful submissions in history order', () => {
    const store = configureStore({
      reducer: {
        submissions: submissionsSlice.reducer,
        countries: countriesSlice.reducer,
      },
    });

    store.dispatch(addSubmission(sampleSubmission));
    store.dispatch(
      addSubmission({
        ...sampleSubmission,
        source: 'rhf',
        name: 'Alan Turing',
        email: 'alan@example.com',
      })
    );

    const submissions = selectSubmissions(store.getState());
    expect(submissions).toHaveLength(2);
    expect(submissions[0]?.name).toBe('Alan Turing');
    expect(submissions[1]?.name).toBe('Ada Lovelace');
    expect(submissions[0]?.source).toBe('rhf');
  });
});
