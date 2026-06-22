import { createElement, useSyncExternalStore, type ReactNode } from 'react';
import { vi } from 'vitest';

export type NavigationState = {
  pathname: string;
  search: string;
};

const navigation = vi.hoisted(() => {
  let state: NavigationState = {
    pathname: '/',
    search: '?page=1',
  };
  const listeners = new Set<() => void>();

  function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  let searchParamsSnapshot = new URLSearchParams('page=1');

  function updateSearchParamsSnapshot(): void {
    const query = state.search.startsWith('?') ? state.search.slice(1) : state.search;
    searchParamsSnapshot = new URLSearchParams(query);
  }

  function notifyNavigationChange(): void {
    listeners.forEach((listener) => listener());
  }

  function applyNavigationUrl(url: string): void {
    const [pathnamePart, searchPart = ''] = url.split('?');
    state = {
      pathname: pathnamePart === '' ? '/' : pathnamePart,
      search: searchPart === '' ? '' : `?${searchPart}`,
    };
    updateSearchParamsSnapshot();
    notifyNavigationChange();
  }

  const routerPush = vi.fn((url: string) => {
    applyNavigationUrl(url);
  });

  const routerReplace = vi.fn((url: string) => {
    applyNavigationUrl(url);
  });

  function setNavigationState(pathname: string, search = ''): void {
    state = {
      pathname,
      search:
        search === '' ? '' : search.startsWith('?') ? search : `?${search}`,
    };
    routerPush.mockClear();
    routerReplace.mockClear();
    updateSearchParamsSnapshot();
    notifyNavigationChange();
  }

  function getNavigationState(): NavigationState {
    return { ...state };
  }

  function getSearchParamsSnapshot(): URLSearchParams {
    return searchParamsSnapshot;
  }

  function useMockPathname(): string {
    return useSyncExternalStore(
      subscribe,
      () => state.pathname,
      () => state.pathname
    );
  }

  function useMockSearchParams(): URLSearchParams {
    return useSyncExternalStore(subscribe, getSearchParamsSnapshot, getSearchParamsSnapshot);
  }

  function useMockRouter() {
    return {
      push: routerPush,
      replace: routerReplace,
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
    };
  }

  return {
    applyNavigationUrl,
    routerPush,
    routerReplace,
    setNavigationState,
    getNavigationState,
    useMockPathname,
    useMockSearchParams,
    useMockRouter,
  };
});

export const routerPush = navigation.routerPush;
export const routerReplace = navigation.routerReplace;
export const setNavigationState = navigation.setNavigationState;
export const getNavigationState = navigation.getNavigationState;

vi.mock('next/navigation', () => ({
  useRouter: navigation.useMockRouter,
  usePathname: navigation.useMockPathname,
  useSearchParams: navigation.useMockSearchParams,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    className,
    onClick,
    ...rest
  }: {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: (event: { preventDefault: () => void }) => void;
    [key: string]: unknown;
  }) =>
    createElement(
      'a',
      {
        href,
        className,
        ...rest,
        onClick: (event: { preventDefault: () => void }) => {
          if (typeof href === 'string' && href.startsWith('/')) {
            event.preventDefault();
            navigation.applyNavigationUrl(href);
          }
          onClick?.(event);
        },
      },
      children
    ),
  useRouter: navigation.useMockRouter,
  usePathname: navigation.useMockPathname,
  redirect: vi.fn(),
  getPathname: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: (event: { preventDefault: () => void }) => void;
  }) =>
    createElement(
      'a',
      {
        href,
        className,
        onClick: (event: { preventDefault: () => void }) => {
          if (typeof href === 'string' && href.startsWith('/')) {
            event.preventDefault();
            navigation.applyNavigationUrl(href);
          }
          onClick?.(event);
        },
      },
      children
    ),
}));
