import { describe, expect, it } from 'vitest';
import {
  focusFirstElement,
  getFocusableElements,
  resolveReturnFocusTarget,
  trapTabKey,
} from '../utils/focusTrap';

describe('focusTrap', () => {
  it('collects focusable elements inside a container', () => {
    const container = document.createElement('div');
    container.innerHTML =
      '<button type="button">One</button><input /><a href="/">Link</a>';
    expect(getFocusableElements(container)).toHaveLength(3);
  });

  it('wraps focus from last to first on Tab', () => {
    const container = document.createElement('div');
    container.innerHTML =
      '<button type="button" id="first">One</button><button type="button" id="last">Two</button>';
    document.body.appendChild(container);
    const last = container.querySelector('#last');
    if (!(last instanceof HTMLButtonElement)) {
      throw new Error('Last button not found');
    }
    last.focus();

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });
    trapTabKey(event, container);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement?.id).toBe('first');
    container.remove();
  });

  it('prefers returnFocusRef over the previous active element', () => {
    const trigger = document.createElement('button');
    const previous = document.createElement('button');
    const result = resolveReturnFocusTarget({ current: trigger }, previous);
    expect(result).toBe(trigger);
  });

  it('falls back to the previous active element when returnFocusRef is missing', () => {
    const previous = document.createElement('button');
    expect(resolveReturnFocusTarget(undefined, previous)).toBe(previous);
  });

  it('wraps focus from first to last on Shift+Tab', () => {
    const container = document.createElement('div');
    container.innerHTML =
      '<button type="button" id="first">One</button><button type="button" id="last">Two</button>';
    document.body.appendChild(container);
    const first = container.querySelector('#first');
    if (!(first instanceof HTMLButtonElement)) {
      throw new Error('First button not found');
    }
    first.focus();

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    trapTabKey(event, container);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement?.id).toBe('last');
    container.remove();
  });

  it('prevents tabbing when there are no focusable elements', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });
    trapTabKey(event, container);
    expect(event.defaultPrevented).toBe(true);
    container.remove();
  });

  it('focuses the container when it has no focusable children', () => {
    const container = document.createElement('div');
    container.tabIndex = 0;
    document.body.appendChild(container);
    focusFirstElement(container);
    expect(document.activeElement).toBe(container);
    container.remove();
  });
});
