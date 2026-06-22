import { Suspense } from 'react';
import { SearchPage } from '@/components/SearchPage';

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
}
