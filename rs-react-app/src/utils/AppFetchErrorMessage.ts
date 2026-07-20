function fromUnknown(reason: unknown): string {
  if (!(reason instanceof Error)) {
    return 'Something went wrong. Please try again.';
  }
  const { message, name } = reason;
  if (message === 'SWAPI_INVALID_RESPONSE') {
    return 'The server returned data in an unexpected format. Please try again later.';
  }
  if (message === 'SWAPI_INVALID_PERSON_ID') {
    return 'This person could not be loaded because the link is invalid.';
  }
  const httpMatch = /^SWAPI_HTTP_(\d{3})$/.exec(message);
  if (httpMatch) {
    const code = Number(httpMatch[1]);
    if (code >= 400 && code < 500) {
      return `The server could not fulfill this request (HTTP ${code}). Try different keywords or try again later.`;
    }
    if (code >= 500) {
      return `The service is temporarily unavailable (HTTP ${code}). Please try again in a few minutes.`;
    }
  }
  if (
    name === 'TypeError' ||
    message.includes('Failed to fetch') ||
    message.includes('NetworkError')
  ) {
    return 'Could not reach the server. Check your connection and try again.';
  }
  return 'Something went wrong while loading data. Please try again.';
}

export const AppFetchErrorMessage = {
  fromUnknown,
};
