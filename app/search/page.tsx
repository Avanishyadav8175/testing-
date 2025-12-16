import SearchResults from '@/components/search/search-results';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search Results - Rozgar Tap',
  description: 'Search for government jobs, private jobs, admit cards, results and more',
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}