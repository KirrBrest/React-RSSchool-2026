'use client';

import { useTranslations } from 'next-intl';
import { THEME_MODES } from '../constants';
import { useTheme } from '../hooks/useTheme';
import type { ThemeMode } from '../types';
import './ThemeToggle.css';

export function ThemeToggle() {
  const t = useTranslations('ThemeToggle');
  const { theme, setTheme } = useTheme();

  const handleChange = (nextTheme: ThemeMode): void => {
    setTheme(nextTheme);
  };

  return (
    <fieldset className="theme-toggle">
      <legend className="theme-toggle__legend">{t('groupLabel')}</legend>
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
          <span className="theme-toggle__label">{t('lightLabel')}</span>
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
          <span className="theme-toggle__label">{t('darkLabel')}</span>
        </label>
      </div>
    </fieldset>
  );
}
