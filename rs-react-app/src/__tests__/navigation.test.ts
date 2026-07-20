import { describe, it, expect } from 'vitest';
import { Link, getPathname, redirect, usePathname, useRouter } from '@/i18n/navigation';

describe('i18n navigation', () => {
  it('exports localized navigation helpers from createNavigation', () => {
    expect(Link).toBeDefined();
    expect(useRouter).toBeDefined();
    expect(usePathname).toBeDefined();
    expect(redirect).toBeDefined();
    expect(getPathname).toBeDefined();
  });
});
