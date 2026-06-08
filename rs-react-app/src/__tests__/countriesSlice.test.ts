import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';
import { COUNTRY_NAMES } from '../constants/countries';
import { countriesSlice, selectCountryNames } from '../store/countriesSlice';

describe('countriesSlice', () => {
  it('stores country names for autocomplete', () => {
    const store = configureStore({
      reducer: {
        countries: countriesSlice.reducer,
      },
    });

    expect(selectCountryNames(store.getState())).toEqual(COUNTRY_NAMES);
    expect(selectCountryNames(store.getState())).toContain('Belarus');
  });
});
