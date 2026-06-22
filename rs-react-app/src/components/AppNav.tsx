'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import './AppNav.css';

function navLinkClassName(isActive: boolean): string {
  return isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link';
}

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="app-nav" aria-label="Main navigation">
      <div className="app-nav__links">
        <Link className={navLinkClassName(pathname === '/')} href="/">
          Home
        </Link>
        <Link className={navLinkClassName(pathname === '/about')} href="/about">
          About
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}
