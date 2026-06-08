import {
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type RefObject,
} from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useAppSelector } from '../../store/hooks';
import { selectCountryNames } from '../../store';
import './CountryAutocomplete.css';

type CountryAutocompleteBaseProps = {
  id: string;
  error?: string | null;
};

type UncontrolledCountryAutocompleteProps = CountryAutocompleteBaseProps & {
  variant: 'uncontrolled';
  name: string;
};

type RhfCountryAutocompleteProps = CountryAutocompleteBaseProps & {
  variant: 'rhf';
  registration: UseFormRegisterReturn<'country'>;
  setCountryValue: (value: string) => void;
};

export type CountryAutocompleteProps =
  | UncontrolledCountryAutocompleteProps
  | RhfCountryAutocompleteProps;

function assignInputRef(
  node: HTMLInputElement | null,
  localRef: RefObject<HTMLInputElement | null>,
  externalRef: UseFormRegisterReturn<'country'>['ref'] | undefined
): void {
  localRef.current = node;
  if (externalRef === undefined) {
    return;
  }
  if (typeof externalRef === 'function') {
    externalRef(node);
    return;
  }
  externalRef.current = node;
}

function applyCountryToInput(input: HTMLInputElement, country: string): void {
  input.value = country;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

export function CountryAutocomplete(props: CountryAutocompleteProps) {
  const { id, error } = props;
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const countries = useAppSelector(selectCountryNames);

  const suggestions = useMemo(() => {
    const normalizedFilter = filterText.trim().toLowerCase();
    if (normalizedFilter === '') {
      return [...countries];
    }
    return countries.filter((country) =>
      country.toLowerCase().includes(normalizedFilter)
    );
  }, [countries, filterText]);

  const handleInput = (): void => {
    const value = inputRef.current?.value ?? '';
    setFilterText(value);
    setIsOpen(true);
  };

  const handleFocus = (): void => {
    setFilterText(inputRef.current?.value ?? '');
    setIsOpen(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    const nextFocused = event.relatedTarget;
    if (
      nextFocused instanceof Node &&
      containerRef.current?.contains(nextFocused)
    ) {
      return;
    }
    setIsOpen(false);
  };

  const selectCountry = (country: string): void => {
    const input = inputRef.current;
    if (input !== null) {
      applyCountryToInput(input, country);
    }
    if (props.variant === 'rhf') {
      props.setCountryValue(country);
    }
    setFilterText(country);
    setIsOpen(false);
    input?.focus();
  };

  const registration =
    props.variant === 'rhf' ? props.registration : undefined;

  return (
    <div
      ref={containerRef}
      className="country-autocomplete"
      onBlur={handleBlur}
    >
      <input
        id={id}
        ref={(node) => {
          assignInputRef(node, inputRef, registration?.ref);
        }}
        className="registration-form__input"
        type="text"
        name={props.variant === 'uncontrolled' ? props.name : registration?.name}
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        onInput={registration === undefined ? handleInput : undefined}
        onFocus={handleFocus}
        onChange={
          registration === undefined
            ? undefined
            : (event) => {
                registration.onChange(event);
                handleInput();
              }
        }
        onBlur={
          registration === undefined
            ? undefined
            : (event) => {
                registration.onBlur(event);
              }
        }
      />
      {isOpen && suggestions.length > 0 && (
        <ul
          id={listboxId}
          className="country-autocomplete__list"
          role="listbox"
          aria-label="Country suggestions"
        >
          {suggestions.map((country) => (
            <li key={country} role="presentation">
              <button
                type="button"
                className="country-autocomplete__option"
                role="option"
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={() => {
                  selectCountry(country);
                }}
              >
                {country}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error !== null && error !== undefined && error !== '' && (
        <p className="registration-form__error">{error}</p>
      )}
    </div>
  );
}
