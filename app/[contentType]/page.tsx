import { CONTENT_TYPES } from '@/lib/content-types';
import { getCollection } from '@/lib/db';
import { Building, Calendar, Clock, Eye, MapPin } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    contentType: string;
  };
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const contentType = CONTENT_TYPES.find(ct => ct.slug === params.contentType);

  if (!contentType) {
    return { title: 'Not Found' };
  }

  return {
    title: `${contentType.name} - Rozgartap`,
    description: contentType.description,
    keywords: `${contentType.name.toLowerCase()}, job portal, employment, career`,
  };
}

export default async function ContentTypePage({ params }: PageProps) {
  try {
    // Find content type
    const contentType = CONTENT_TYPES.find(ct => ct.slug === params.contentType);

    if (!contentType) {
      notFound();
    }

    // Fetch content
    const contentCol = await getCollection('content');
    const contentRaw = await contentCol
      .find({
        content_type: contentType.id,
        active: true
      })
      .sort({ created_at: -1 })
      .toArray();

    // Serialize content
    const content = contentRaw.map(item =>
      JSON.parse(JSON.stringify(item, (key, value) => {
        if (key === '_id' && value && typeof value === 'object') {
          return value.toString();
        }
        return value;
      }))
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{contentType.icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {contentType.name}
                </h1>
                <p className="text-gray-600 text-lg">
                  {contentType.description}
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              {content.length} {contentType.name.toLowerCase()} available
            </p>
          </div>

          {/* Content Grid */}
          {content.length > 0 ? (
            <div className="grid gap-6">
              {content.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/${params.contentType}/${item.slug}`}
                  className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      {/* Left Section */}
                      <div className="flex-1">
                        {/* Title and Badges */}
                        <div className="flex items-start gap-3 mb-3">
                          <h3 className="flex-1 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                            {item.title}
                          </h3>

                          <div className="flex gap-2 flex-shrink-0">
                            {item.featured && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Organization/Company */}
                        {(item.data?.organization || item.data?.company) && (
                          <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <Building className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-medium">
                              {item.data.organization || item.data.company}
                            </span>
                          </div>
                        )}

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          {item.data?.location && (
                            <div className="flex items-center gap-1 text-gray-600 text-sm">
                              <MapPin className="h-4 w-4" />
                              <span>{item.data.location}</span>
                            </div>
                          )}

                          {item.data?.last_date && (
                            <div className="flex items-center gap-1 text-gray-600 text-sm">
                              <Clock className="h-4 w-4 text-red-500" />
                              <span>
                                Last Date: {new Date(item.data.last_date).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          )}

                          {item.data?.duration && (
                            <div className="flex items-center gap-1 text-gray-600 text-sm">
                              <Clock className="h-4 w-4" />
                              <span>{item.data.duration}</span>
                            </div>
                          )}

                          {item.data?.stipend && (
                            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                              <span>💰 {item.data.stipend}</span>
                            </div>
                          )}

                          {item.data?.salary && (
                            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                              <span>💰 {item.data.salary}</span>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        {item.data?.tags && item.data.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.data.tags.slice(0, 3).map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right Section */}
                      <div className="flex flex-col items-end gap-3 lg:min-w-[200px]">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(item.created_at).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{item.views || 0}</span>
                          </div>
                        </div>

                        <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <div className="text-6xl mb-4">{contentType.icon}</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No {contentType.name.toLowerCase()} found
              </h3>
              <p className="text-gray-500">
                Check back later for new {contentType.name.toLowerCase()}.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Content type page error:', error);
    notFound();
  }
}