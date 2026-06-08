import { createSlice } from '@reduxjs/toolkit';
import { COUNTRY_NAMES } from '../constants/countries';

type CountriesState = {
  names: readonly string[];
};

const initialState: CountriesState = {
  names: COUNTRY_NAMES,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

type CountriesRootState = {
  countries: CountriesState;
};

export const selectCountryNames = (state: CountriesRootState): readonly string[] =>
  state.countries.names;
