import { AppFetchErrorMessage } from './AppFetchErrorMessage';

export function rtkQueryErrorMessage(error: unknown): string {
  if (error === undefined || error === null) {
    return AppFetchErrorMessage.fromUnknown(undefined);
  }
  if (typeof error === 'object') {
    if ('error' in error && typeof error.error === 'string') {
      return AppFetchErrorMessage.fromUnknown(new Error(error.error));
    }
    if ('data' in error && typeof error.data === 'string') {
      return AppFetchErrorMessage.fromUnknown(new Error(error.data));
    }
  }
  return AppFetchErrorMessage.fromUnknown(error);
}
