'use client';

import { Filter, Grid, List, Search, SortAsc, SortDesc, X } from 'lucide-react';
import { useState } from 'react';

interface ContentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filterBy: string;
  setFilterBy: (filter: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  organizations: string[];
  totalItems: number;
  filteredItems: number;
  onClearFilters: () => void;
  placeholder?: string;
  showFeaturedFilter?: boolean;
  featuredFilter?: string;
  setFeaturedFilter?: (filter: string) => void;
}

export default function ContentFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  viewMode,
  setViewMode,
  organizations,
  totalItems,
  filteredItems,
  onClearFilters,
  placeholder = "Search opportunities...",
  showFeaturedFilter = true,
  featuredFilter = 'all',
  setFeaturedFilter
}: ContentFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'deadline', label: 'Deadline Soon' },
  ];

  const hasActiveFilters = searchQuery || filterBy !== 'all' || sortBy !== 'newest' || (featuredFilter && featuredFilter !== 'all');

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 border rounded-lg transition-colors flex items-center gap-2 ${showFilters || hasActiveFilters
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-50'
              }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                Active
              </span>
            )}
          </button>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-3 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-3 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization
              </label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="all">All Organizations</option>
                {organizations.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
            </div>

            {showFeaturedFilter && setFeaturedFilter && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={featuredFilter}
                  onChange={(e) => setFeaturedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="all">All Items</option>
                  <option value="featured">Featured Only</option>
                  <option value="regular">Regular Only</option>
                </select>
              </div>
            )}

            {hasActiveFilters && (
              <div>
                <button
                  onClick={onClearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          <span className="font-medium">{filteredItems}</span> of <span className="font-medium">{totalItems}</span> items
          {searchQuery && (
            <span className="text-blue-600"> matching "{searchQuery}"</span>
          )}
        </p>

        {filteredItems > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {sortBy === 'newest' && <SortDesc className="h-4 w-4" />}
            {sortBy === 'oldest' && <SortAsc className="h-4 w-4" />}
            {sortBy === 'title' && <SortAsc className="h-4 w-4" />}
            Sorted by {sortOptions.find(opt => opt.value === sortBy)?.label}
          </div>
        )}
      </div>
    </div>
  );
}