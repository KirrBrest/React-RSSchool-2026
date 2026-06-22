import { vi } from 'vitest';
import en from '../messages/en.json';

type MessageValues = Record<string, string | number>;

function getNamespaceMessages(namespace: string): Record<string, string> {
  const messages = en[namespace as keyof typeof en];
  return messages ?? {};
}

function createTranslator(namespace: string) {
  const messages = getNamespaceMessages(namespace);

  return (key: string, values?: MessageValues): string => {
    let message = messages[key] ?? `${namespace}.${key}`;

    if (values) {
      for (const [name, value] of Object.entries(values)) {
        message = message.replace(`{${name}}`, String(value));
      }
    }

    return message;
  };
}

vi.mock('next-intl', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-intl')>();

  return {
    ...actual,
    useTranslations: (namespace: string) => createTranslator(namespace),
    useLocale: () => 'en',
  };
});

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(
    async (namespaceOrOpts: string | { locale?: string; namespace: string }) => {
      const namespace =
        typeof namespaceOrOpts === 'string'
          ? namespaceOrOpts
          : namespaceOrOpts.namespace;

      return createTranslator(namespace);
    }
  ),
  getMessages: vi.fn(async () => en),
  setRequestLocale: vi.fn(),
  getRequestConfig: vi.fn(),
  hasLocale: (locales: readonly string[], locale: string) =>
    locales.includes(locale),
}));
