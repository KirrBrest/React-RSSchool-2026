import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAppSelector } from '../hooks/useAppSelector';
import { ReduxProvider } from '../store/ReduxProvider';
import { selectSelectedCount } from '../store';

function SelectedCountProbe() {
  const count = useAppSelector(selectSelectedCount);
  return <span>{count}</span>;
}

describe('Redux store', () => {
  it('provides configured state to React components', () => {
    render(
      <ReduxProvider>
        <SelectedCountProbe />
      </ReduxProvider>
    );
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
