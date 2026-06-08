import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CountryAutocomplete } from '../components/CountryAutocomplete/CountryAutocomplete';
import { ReduxProvider } from '../store/ReduxProvider';

describe('CountryAutocomplete', () => {
  it('lets the user pick a country from Redux state', async () => {
    const user = userEvent.setup();

    render(
      <ReduxProvider>
        <CountryAutocomplete
          id="test-country"
          variant="uncontrolled"
          name="country"
        />
      </ReduxProvider>
    );

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.click(screen.getByRole('option', { name: 'Belarus' }));

    expect(input).toHaveValue('Belarus');
  });

  it('closes the suggestion list when focus leaves the control', async () => {
    const user = userEvent.setup();

    render(
      <ReduxProvider>
        <div>
          <CountryAutocomplete
            id="blur-country"
            variant="uncontrolled"
            name="country"
          />
          <button type="button">Next field</button>
        </div>
      </ReduxProvider>
    );

    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next field' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
