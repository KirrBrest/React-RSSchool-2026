import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import en from '../messages/en.json';
import ru from '../messages/ru.json';

type IntlTestProviderProps = {
  children: ReactNode;
  locale?: 'en' | 'ru';
};

export function IntlTestProvider({
  children,
  locale = 'en',
}: IntlTestProviderProps) {
  const messages = locale === 'ru' ? ru : en;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
