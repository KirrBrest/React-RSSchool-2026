import { Suspense } from 'react';
import { SearchPage } from '@/components/SearchPage';

export default function DetailsPage() {
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
}
