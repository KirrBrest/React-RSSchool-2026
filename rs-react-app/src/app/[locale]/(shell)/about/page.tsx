import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutPage } from '@/views/AboutPage';

export const dynamic = 'force-static';

type AboutRoutePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutRoutePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return {
    title: t('title'),
  };
}

export default async function AboutRoutePage({ params }: AboutRoutePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
}
