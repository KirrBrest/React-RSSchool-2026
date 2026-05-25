import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeStorage } from '../storage/themeStorage';
import type { ThemeContextValue, ThemeMode } from '../types';
import { ThemeContext } from './ThemeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

function applyThemeToDocument(theme: ThemeMode): void {
  if (typeof document === 'undefined') {
    return;
  }
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => ThemeStorage.read());

  const setTheme = useCallback((nextTheme: ThemeMode): void => {
    setThemeState(nextTheme);
    ThemeStorage.write(nextTheme);
    applyThemeToDocument(nextTheme);
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const value = useMemo(
    (): ThemeContextValue => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
