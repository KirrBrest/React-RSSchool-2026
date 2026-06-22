'use client';

import { type ChangeEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';
import './LanguageSwitcher.css';

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const nextLocale = event.target.value as AppLocale;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <label className="language-switcher">
      <span className="language-switcher__label">{t('label')}</span>
      <select
        className="language-switcher__select"
        value={locale}
        onChange={handleChange}
        aria-label={t('label')}
      >
        {routing.locales.map((entry) => (
          <option key={entry} value={entry}>
            {t(entry)}
          </option>
        ))}
      </select>
    </label>
  );
}
