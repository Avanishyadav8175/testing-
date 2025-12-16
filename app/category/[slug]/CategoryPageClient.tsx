'use client';

import ContentFilters from '@/components/ui/content-filters';
import { Building, Calendar, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface CategoryPageClientProps {
  category: any;
  initialContent: any[];
}

export default function CategoryPageClient({ category, initialContent }: CategoryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Get unique organizations/companies for filter options
  const organizations = useMemo(() => {
    const orgs = new Set<string>();
    initialContent.forEach(item => {
      if (item.data?.organization) orgs.add(item.data.organization);
      if (item.data?.company) orgs.add(item.data.company);
    });
    return Array.from(orgs).sort();
  }, [initialContent]);

  // Filter and sort content
  const filteredContent = useMemo(() => {
    let filtered = initialContent.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.data?.organization && item.data.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.data?.company && item.data.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.data?.location && item.data.location.toLowerCase().includes(searchQuery.toLowerCase()));

      // Organization filter
      const matchesOrg = filterBy === 'all' ||
        (item.data?.organization === filterBy) ||
        (item.data?.company === filterBy);

      return matchesSearch && matchesOrg;
    });

    // Sort content
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'deadline':
          if (!a.data?.last_date && !b.data?.last_date) return 0;
          if (!a.data?.last_date) return 1;
          if (!b.data?.last_date) return -1;
          return new Date(a.data.last_date).getTime() - new Date(b.data.last_date).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialContent, searchQuery, sortBy, filterBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('newest');
    setFilterBy('all');
  };

  const ContentCard = ({ item }: { item: any }) => (
    <Link
      key={item._id}
      href={`/${item.content_type}/${item.slug}`}
      className={`block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${viewMode === 'grid' ? 'h-full' : ''
        }`}
    >
      <div className="p-6">
        <div className={`${viewMode === 'grid' ? 'flex flex-col' : 'flex flex-col lg:flex-row lg:items-start'} gap-4`}>
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <h3 className="flex-1 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              {item.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900">
                  Featured
                </span>
              )}
            </div>

            {(item.data?.organization || item.data?.company) && (
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Building className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {item.data.organization || item.data.company}
                </span>
              </div>
            )}

            {item.data?.location && (
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <span className="text-sm text-gray-500">📍 {item.data.location}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {item.data?.last_date && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-red-500" />
                  <span>
                    Last Date: {new Date(item.data.last_date).toLocaleDateString('en-GB')}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(item.created_at).toLocaleDateString('en-GB')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{item.views || 0} views</span>
              </div>
            </div>

            {/* Additional info for grid view */}
            {viewMode === 'grid' && (
              <div className="mt-3 space-y-2">
                {item.data?.salary && (
                  <div className="text-sm text-green-600 font-medium">
                    💰 {item.data.salary}
                  </div>
                )}
                {item.data?.stipend && (
                  <div className="text-sm text-green-600 font-medium">
                    💰 {item.data.stipend}
                  </div>
                )}
                {item.data?.qualification && (
                  <div className="text-sm text-gray-600">
                    🎓 {item.data.qualification}
                  </div>
                )}
              </div>
            )}
          </div>

          <button className={`${viewMode === 'grid' ? 'w-full mt-4' : 'w-full lg:w-auto'} bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors`}>
            View Details
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {category.image_url && (
              <img
                src={category.image_url}
                alt={category.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-gray-600 text-lg">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <ContentFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          organizations={organizations}
          totalItems={initialContent.length}
          filteredItems={filteredContent.length}
          onClearFilters={clearFilters}
          placeholder={`Search ${category.name.toLowerCase()}...`}
        />

        {/* Content Grid/List */}
        {filteredContent.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-6'}>
            {filteredContent.map((item: any) => (
              <ContentCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchQuery || filterBy !== 'all' ? 'No matching results found' : 'No content found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || filterBy !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Check back later for new updates.'
              }
            </p>
            {(searchQuery || filterBy !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}