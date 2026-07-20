'use client';

import type { ReactNode } from 'react';
import { AppErrorBoundary } from './AppErrorBoundary';
import { ThemeProvider } from '../context/ThemeProvider';
import { ReduxProvider } from '../store/ReduxProvider';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <AppErrorBoundary>{children}</AppErrorBoundary>
      </ThemeProvider>
    </ReduxProvider>
  );
}
