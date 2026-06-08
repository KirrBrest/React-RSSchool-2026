import { createSlice } from '@reduxjs/toolkit';

type FormsAppState = {
  initialized: boolean;
};

const initialState: FormsAppState = {
  initialized: true,
};

export const formsAppSlice = createSlice({
  name: 'formsApp',
  initialState,
  reducers: {},
});
