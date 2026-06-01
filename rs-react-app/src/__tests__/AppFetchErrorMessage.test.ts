import { describe, it, expect } from 'vitest';
import { AppFetchErrorMessage } from '../utils/AppFetchErrorMessage';

describe('AppFetchErrorMessage.fromUnknown', () => {
  it('returns generic message when reason is not an Error', () => {
    const result = AppFetchErrorMessage.fromUnknown('not-an-error');
    expect(result).toBe('Something went wrong. Please try again.');
  });

  it('returns 4xx-specific message when HTTP status code is client error', () => {
    const result = AppFetchErrorMessage.fromUnknown(
      new Error('SWAPI_HTTP_404')
    );
    expect(result).toBe(
      'The server could not fulfill this request (HTTP 404). Try different keywords or try again later.'
    );
  });

  it('returns 5xx-specific message when HTTP status code is server error', () => {
    const result = AppFetchErrorMessage.fromUnknown(
      new Error('SWAPI_HTTP_503')
    );
    expect(result).toBe(
      'The service is temporarily unavailable (HTTP 503). Please try again in a few minutes.'
    );
  });

  it('returns network error message for TypeError and network-like messages', () => {
    const typeErrorResult = AppFetchErrorMessage.fromUnknown(
      new TypeError('Type mismatch')
    );
    const failedFetchResult = AppFetchErrorMessage.fromUnknown(
      new Error('Failed to fetch')
    );
    const networkErrorResult = AppFetchErrorMessage.fromUnknown(
      new Error('NetworkError: connection lost')
    );
    expect(typeErrorResult).toBe(
      'Could not reach the server. Check your connection and try again.'
    );
    expect(failedFetchResult).toBe(
      'Could not reach the server. Check your connection and try again.'
    );
    expect(networkErrorResult).toBe(
      'Could not reach the server. Check your connection and try again.'
    );
  });

  it('returns a message for invalid API payloads', () => {
    expect(
      AppFetchErrorMessage.fromUnknown(new Error('SWAPI_INVALID_RESPONSE'))
    ).toContain('unexpected format');
  });

  it('returns a message for invalid person ids', () => {
    expect(
      AppFetchErrorMessage.fromUnknown(new Error('SWAPI_INVALID_PERSON_ID'))
    ).toContain('invalid');
  });

  it('returns generic loading error message for other errors', () => {
    const result = AppFetchErrorMessage.fromUnknown(
      new Error('Unexpected error')
    );
    expect(result).toBe(
      'Something went wrong while loading data. Please try again.'
    );
  });
});

