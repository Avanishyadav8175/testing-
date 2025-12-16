'use client';

import Link from 'next/link';

const categories = [
  { id: 'govt-jobs', name: 'Govt. Jobs', icon: '🏛️', slug: 'government-jobs' },
  { id: 'private-jobs', name: 'Private Jobs', icon: '🏢', slug: 'private-jobs' },
  { id: 'internships', name: 'Internships', icon: '🎓', slug: 'internships' },
  { id: 'scholarships', name: 'Scholarships', icon: '💰', slug: 'scholarships' },
  { id: 'admit-card', name: 'Admit Card', icon: '🎫', slug: 'admit-cards' },
  { id: 'results', name: 'Results', icon: '📊', slug: 'results' },
];

export default function CategoryFilters() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium text-gray-700">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}