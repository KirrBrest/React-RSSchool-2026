import type { ReactNode, RefObject } from 'react';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
};
