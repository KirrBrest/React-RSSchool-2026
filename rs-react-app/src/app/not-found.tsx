import { NextIntlClientProvider } from 'next-intl';
import { NotFoundPage } from '@/views/NotFoundPage';
import en from '@/messages/en.json';
import './globals.css';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider locale="en" messages={en}>
          <NotFoundPage />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
