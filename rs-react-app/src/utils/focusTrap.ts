import type { RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

function isHTMLElement(node: EventTarget | null): node is HTMLElement {
  return node instanceof HTMLElement;
}

export function trapTabKey(event: KeyboardEvent, container: HTMLElement): void {
  if (event.key !== 'Tab') {
    return;
  }
  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (event.shiftKey) {
    if (active === first || !container.contains(active)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }
  if (active === last || !container.contains(active)) {
    event.preventDefault();
    first.focus();
  }
}

export function focusFirstElement(container: HTMLElement): void {
  const focusable = getFocusableElements(container);
  if (focusable.length > 0) {
    focusable[0].focus();
    return;
  }
  if (isHTMLElement(container)) {
    container.focus();
  }
}

export function resolveReturnFocusTarget(
  returnFocusRef: RefObject<HTMLElement | null> | undefined,
  previousActive: HTMLElement | null
): HTMLElement | null {
  if (returnFocusRef?.current !== null && returnFocusRef?.current !== undefined) {
    return returnFocusRef.current;
  }
  return previousActive;
}
