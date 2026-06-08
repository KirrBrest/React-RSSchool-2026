import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from '../components/Modal/Modal';

describe('Modal', () => {
  it('renders through a portal when open', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Test modal">
        <p>Modal body</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog', { name: 'Test modal' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Modal body')).toBeInTheDocument();
    expect(dialog.closest('#modal-root')).not.toBeNull();
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Hidden modal">
        <p>Hidden body</p>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when Escape is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Escape modal">
        <p>Body</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Backdrop modal">
        <p>Body</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog', { name: 'Backdrop modal' });
    const backdrop = dialog.parentElement;
    if (backdrop === null) {
      throw new Error('Backdrop element not found');
    }
    fireEvent.mouseDown(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when the panel content is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Panel modal">
        <p>Inner content</p>
      </Modal>
    );
    fireEvent.mouseDown(screen.getByText('Inner content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Close button modal">
        <p>Body</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog', { name: 'Close button modal' });
    fireEvent.click(
      within(dialog).getByRole('button', { name: 'Close modal' })
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus inside the dialog', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Focus trap modal">
        <button type="button">First</button>
        <button type="button">Second</button>
      </Modal>
    );

    const dialog = screen.getByRole('dialog', { name: 'Focus trap modal' });
    const buttons = dialog.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(1);
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('does not render when the portal root is missing', () => {
    const portalRoot = document.getElementById('modal-root');
    portalRoot?.remove();

    render(
      <Modal isOpen onClose={vi.fn()} title="Missing portal">
        <p>Body</p>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('returns focus to the trigger after close', () => {
    const onClose = vi.fn();
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.textContent = 'Trigger';
    document.body.appendChild(trigger);
    trigger.focus();

    const { unmount } = render(
      <Modal
        isOpen
        onClose={onClose}
        title="Focus modal"
        returnFocusRef={{ current: trigger }}
      >
        <p>Body</p>
      </Modal>
    );

    unmount();
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });
});
