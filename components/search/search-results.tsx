'use client';

import { Building, Calendar, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchResult {
  id: string;
  title: string;
  type: 'job' | 'post' | 'category';
  category?: string;
  location?: string;
  company?: string;
  date?: string;
  slug: string;
  excerpt?: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {query ? `Search Results for "${query}"` : 'Search'}
        </h1>

        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="flex-1 flex items-center px-4 py-3">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search jobs, results, admit cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          <p className="text-gray-600">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </p>

          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <Link href={`/${result.type}/${result.slug}`} className="block">
                <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-2">
                  {result.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-gray-100 px-2 py-1 rounded capitalize">
                    {result.type}
                  </span>

                  {result.category && (
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span>{result.category}</span>
                    </div>
                  )}

                  {result.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{result.location}</span>
                    </div>
                  )}

                  {result.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(result.date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {result.excerpt && (
                  <p className="text-gray-600 line-clamp-2">
                    {result.excerpt}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No results found
          </h3>
          <p className="text-gray-500">
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Start your search
          </h3>
          <p className="text-gray-500">
            Enter keywords to search for jobs, results, admit cards and more.
          </p>
        </div>
      )}
    </div>
  );
}