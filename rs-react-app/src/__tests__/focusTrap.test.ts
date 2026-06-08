import { describe, expect, it } from 'vitest';
import {
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
});
