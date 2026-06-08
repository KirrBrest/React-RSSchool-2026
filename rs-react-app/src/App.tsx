import { useRef, useState } from 'react';
import { Modal } from './components/Modal/Modal';
import './App.css';

type ActiveFormModal = 'uncontrolled' | 'rhf' | null;

const MODAL_TITLES: Record<Exclude<ActiveFormModal, null>, string> = {
  uncontrolled: 'Uncontrolled Form',
  rhf: 'React Hook Form',
};

export default function App() {
  const [activeModal, setActiveModal] = useState<ActiveFormModal>(null);
  const uncontrolledTriggerRef = useRef<HTMLButtonElement>(null);
  const rhfTriggerRef = useRef<HTMLButtonElement>(null);

  const closeModal = (): void => {
    setActiveModal(null);
  };

  const returnFocusRef =
    activeModal === 'uncontrolled'
      ? uncontrolledTriggerRef
      : activeModal === 'rhf'
        ? rhfTriggerRef
        : undefined;

  const modalTitle =
    activeModal === null ? '' : MODAL_TITLES[activeModal];

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">React Forms</h1>
        <p className="app__subtitle">
          Compare uncontrolled and React Hook Form approaches.
        </p>
      </header>
      <section className="app__submissions" aria-label="Form submissions">
        <h2 className="app__section-title">Submissions</h2>
        <p className="app__placeholder">No submissions yet.</p>
      </section>
      <section className="app__actions" aria-label="Open forms">
        <button
          ref={uncontrolledTriggerRef}
          type="button"
          className="app__open-button"
          onClick={() => setActiveModal('uncontrolled')}
        >
          Open Uncontrolled Form
        </button>
        <button
          ref={rhfTriggerRef}
          type="button"
          className="app__open-button"
          onClick={() => setActiveModal('rhf')}
        >
          Open React Hook Form
        </button>
      </section>
      <Modal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={modalTitle}
        returnFocusRef={returnFocusRef}
      >
        {activeModal === 'uncontrolled' && (
          <p className="app__modal-placeholder">
            Uncontrolled form will be implemented here.
          </p>
        )}
        {activeModal === 'rhf' && (
          <p className="app__modal-placeholder">
            React Hook Form will be implemented here.
          </p>
        )}
      </Modal>
    </div>
  );
}
