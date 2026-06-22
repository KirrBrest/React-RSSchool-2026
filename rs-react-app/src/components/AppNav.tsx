'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import './AppNav.css';

function navLinkClassName(isActive: boolean): string {
  return isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link';
}

export function AppNav() {
  const pathname = usePathname();
  const t = useTranslations('AppNav');

  return (
    <nav className="app-nav" aria-label={t('mainNavigation')}>
      <div className="app-nav__links">
        <Link className={navLinkClassName(pathname === '/')} href="/">
          {t('home')}
        </Link>
        <Link className={navLinkClassName(pathname === '/about')} href="/about">
          {t('about')}
        </Link>
      </div>
      <div className="app-nav__controls">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
