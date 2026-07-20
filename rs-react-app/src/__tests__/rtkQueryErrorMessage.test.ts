import { describe, expect, it } from 'vitest';
import { rtkQueryErrorMessage } from '../utils/rtkQueryErrorMessage';

describe('rtkQueryErrorMessage', () => {
  it('maps RTK custom errors to user-facing messages', () => {
    expect(
      rtkQueryErrorMessage({ status: 'CUSTOM_ERROR', error: 'SWAPI_HTTP_500' })
    ).toContain('temporarily unavailable');
  });

  it('maps invalid response codes from query errors', () => {
    expect(
      rtkQueryErrorMessage({
        status: 'CUSTOM_ERROR',
        error: 'SWAPI_INVALID_RESPONSE',
      })
    ).toContain('unexpected format');
  });

  it('returns a generic message when the error is missing', () => {
    expect(rtkQueryErrorMessage(undefined)).toBe(
      'Something went wrong. Please try again.'
    );
  });
});
