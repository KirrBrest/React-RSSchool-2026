import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CountryAutocomplete } from '../components/CountryAutocomplete/CountryAutocomplete';
import { ReduxProvider } from '../store/ReduxProvider';

describe('CountryAutocomplete', () => {
  it('lets the user change the selected country', async () => {
    const user = userEvent.setup();
    const setCountryValue = vi.fn();

    render(
      <ReduxProvider>
        <CountryAutocomplete
          id="test-country"
          variant="rhf"
          registration={{
            name: 'country',
            onChange: vi.fn(),
            onBlur: vi.fn(),
            ref: vi.fn(),
          }}
          setCountryValue={setCountryValue}
        />
      </ReduxProvider>
    );

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.click(screen.getByRole('option', { name: 'Belarus' }));
    expect(setCountryValue).toHaveBeenCalledWith('Belarus');

    await user.clear(input);
    await user.type(input, 'Pol');
    await user.click(screen.getByRole('option', { name: 'Poland' }));
    expect(setCountryValue).toHaveBeenLastCalledWith('Poland');
  });

  it('keeps suggestion clicks inside the field container', () => {
    const onClose = vi.fn();

    render(
      <ReduxProvider>
        <div className="modal" onMouseDown={onClose}>
          <div className="modal__panel" onMouseDown={(event) => event.stopPropagation()}>
            <CountryAutocomplete
              id="modal-country"
              variant="uncontrolled"
              name="country"
            />
          </div>
        </div>
      </ReduxProvider>
    );

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Belarus' }));
    expect(onClose).not.toHaveBeenCalled();
  });
});
