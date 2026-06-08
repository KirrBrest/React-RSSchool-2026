import { useEffect, useId, useRef, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from '../../types/modal';
import {
  focusFirstElement,
  resolveReturnFocusTarget,
  trapTabKey,
} from '../../utils/focusTrap';
import './Modal.css';

function getPortalRoot(): HTMLElement | null {
  return document.getElementById('modal-root');
}

function captureActiveElement(): HTMLElement | null {
  const active = document.activeElement;
  if (active instanceof HTMLElement) {
    return active;
  }
  return null;
}

export function Modal({
  isOpen,
  onClose,
  title,
  returnFocusRef,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    previousFocusRef.current = captureActiveElement();
    const panel = panelRef.current;
    if (panel !== null) {
      focusFirstElement(panel);
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      const currentPanel = panelRef.current;
      if (currentPanel !== null) {
        trapTabKey(event, currentPanel);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const target = resolveReturnFocusTarget(
        returnFocusRef,
        previousFocusRef.current
      );
      target?.focus();
    };
  }, [isOpen, onClose, returnFocusRef]);

  if (!isOpen) {
    return null;
  }

  const portalRoot = getPortalRoot();
  if (portalRoot === null) {
    return null;
  }

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target !== event.currentTarget) {
      return;
    }
    onClose();
  };

  return createPortal(
    <div className="modal" onMouseDown={handleBackdropMouseDown}>
      <div
        ref={panelRef}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal__header">
          <h2 id={titleId} className="modal__title">
            {title}
          </h2>
          <button
            type="button"
            className="modal__close"
            aria-label="Close modal"
            onClick={onClose}
          >
            Close
          </button>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    portalRoot
  );
}
