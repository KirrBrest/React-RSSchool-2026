import { useCallback } from 'react';
import { THEME_MODES, THEME_TOGGLE } from '../constants';
import { useTheme } from '../hooks/useTheme';
import type { ThemeMode } from '../types';
import './ThemeToggle.css';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleChange = useCallback(
    (nextTheme: ThemeMode): void => {
      setTheme(nextTheme);
    },
    [setTheme]
  );

  return (
    <fieldset className="theme-toggle">
      <legend className="theme-toggle__legend">{THEME_TOGGLE.groupLabel}</legend>
      <div className="theme-toggle__options">
        <label className="theme-toggle__option">
          <input
            type="radio"
            name="app-theme"
            className="theme-toggle__input"
            value={THEME_MODES.light}
            checked={theme === THEME_MODES.light}
            onChange={() => handleChange(THEME_MODES.light)}
          />
          <span className="theme-toggle__label">{THEME_TOGGLE.lightLabel}</span>
        </label>
        <label className="theme-toggle__option">
          <input
            type="radio"
            name="app-theme"
            className="theme-toggle__input"
            value={THEME_MODES.dark}
            checked={theme === THEME_MODES.dark}
            onChange={() => handleChange(THEME_MODES.dark)}
          />
          <span className="theme-toggle__label">{THEME_TOGGLE.darkLabel}</span>
        </label>
      </div>
    </fieldset>
  );
}
