'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="main-container py-6 px-4">
      
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-base md:text-2xl font-semibold text-gray-800">
         Find Your Dream Job  in just one tap
        </h2>
      </div>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch}>
          
          <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-md p-2">

            {/* Input */}
            <div className="flex items-center w-full px-3">
              <Search className="h-5 w-5 text-gray-400 mr-2" />

              <input
                type="text"
                placeholder="Search jobs, results, admit cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none py-2 text-gray-700 placeholder-gray-400 text-sm md:text-base"
              />
            </div>

            {/* Button */}
   <button
  type="submit"
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium ml-2 transition-all duration-200"
>
  Search
</button>

          </div>

        </form>
      </div>

    </div>
  );
}