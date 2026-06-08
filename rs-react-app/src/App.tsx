import { useRef, useState } from 'react';
import { Modal } from './components/Modal/Modal';
import { RhfForm } from './components/forms/RhfForm';
import { UncontrolledForm } from './components/forms/UncontrolledForm';
import { SubmissionsList } from './components/SubmissionsList/SubmissionsList';
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
        <SubmissionsList />
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
          <UncontrolledForm onSuccess={closeModal} />
        )}
        {activeModal === 'rhf' && <RhfForm onSuccess={closeModal} />}
      </Modal>
    </div>
  );
}
