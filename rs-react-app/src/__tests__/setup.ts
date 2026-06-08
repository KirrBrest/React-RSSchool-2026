import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

function ensureModalRoot(): void {
  if (document.getElementById('modal-root') !== null) {
    return;
  }
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
}

function clearModalRoot(): void {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot !== null) {
    modalRoot.replaceChildren();
  }
}

beforeEach(() => {
  ensureModalRoot();
  clearModalRoot();
});

afterEach(() => {
  cleanup();
  clearModalRoot();
});
