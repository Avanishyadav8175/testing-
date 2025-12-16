'use client';

import { Filter, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Search your own Mind
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex-1 flex items-center px-6 py-4">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search jobs, results, admit cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-2 pr-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Search
              </button>

              <button
                type="button"
                onClick={handleFilterToggle}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Filter"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}