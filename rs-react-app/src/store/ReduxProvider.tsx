import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { store } from './index';

type ReduxProviderProps = {
  children: ReactNode;
};

export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
