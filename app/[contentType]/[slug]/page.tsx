import { CONTENT_TYPES } from '@/lib/content-types';
import { getCollection } from '@/lib/db';
import { Building, Calendar, Clock, Download, ExternalLink, Eye, IndianRupee, MapPin } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    contentType: string;
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const contentCol = await getCollection('content');
    const content = await contentCol.findOne({ slug });

    if (!content) {
      return {
        title: 'Not Found',
      };
    }

    return {
      title: content.seo_title || content.title,
      description: content.seo_description || content.data?.excerpt || '',
      keywords: content.seo_keywords || '',
      openGraph: {
        title: content.seo_title || content.title,
        description: content.seo_description || '',
        images: content.data?.featured_image ? [content.data.featured_image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Content',
    };
  }
}

export default async function ContentPage({ params }: PageProps) {
  try {
    const { contentType, slug } = await params;
    const contentCol = await getCollection('content');

    // Find content by slug
    const contentRaw = await contentCol.findOne({
      slug,
      active: true
    });

    if (!contentRaw) {
      notFound();
    }

    // Serialize the content
    const content = JSON.parse(JSON.stringify(contentRaw, (key, value) => {
      if (key === '_id' && value && typeof value === 'object') {
        return value.toString();
      }
      return value;
    }));

    // Increment view count
    await contentCol.updateOne(
      { _id: contentRaw._id },
      { $inc: { views: 1 } }
    );

    // Get content type info
    const contentTypeInfo = CONTENT_TYPES.find(ct => ct.id === content.content_type);

    // Get category info for breadcrumb
    const categoriesCol = await getCollection('categories');
    const category = content.category_id
      ? await categoriesCol.findOne({ _id: content.category_id } as any)
      : null;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              {category ? (
                <Link href={`/category/${category.slug}`} className="hover:text-blue-600">
                  {category.name}
                </Link>
              ) : (
                <Link href={`/${contentType}`} className="hover:text-blue-600 capitalize">
                  {contentTypeInfo?.name || contentType}
                </Link>
              )}
              <span>/</span>
              <span className="text-gray-900">{content.title}</span>
            </div>

            {/* Header Card - Same as Blog Design */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                {contentTypeInfo && (
                  <span className="text-3xl">{contentTypeInfo.icon}</span>
                )}
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {contentTypeInfo?.name || content.content_type}
                </span>
                {content.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {content.title}
              </h1>

              {/* Excerpt or Short Description */}
              {content.data?.excerpt && (
                <p className="text-xl text-gray-600 mb-6">
                  {content.data.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(content.created_at).toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{content.views || 0} views</span>
                </div>
                {content.data?.organization && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{content.data.organization}</span>
                  </div>
                )}
                {content.data?.company && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{content.data.company}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {content.data?.tags && content.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {content.data.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image - Same as Blog Design */}
            {content.data?.featured_image && (
              <div className="mb-8">
                <img
                  src={content.data.featured_image}
                  alt={content.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
                />
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Key Information Cards */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.data?.location && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 mb-1">
                          <MapPin className="h-5 w-5" />
                          <span className="font-semibold">Location</span>
                        </div>
                        <p className="text-gray-900">{content.data.location}</p>
                      </div>
                    )}

                    {content.data?.last_date && (
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2 text-red-700 mb-1">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">Last Date</span>
                        </div>
                        <p className="text-gray-900">
                          {new Date(content.data.last_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    )}

                    {content.data?.salary && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 mb-1">
                          <IndianRupee className="h-5 w-5" />
                          <span className="font-semibold">Salary</span>
                        </div>
                        <p className="text-gray-900">{content.data.salary}</p>
                      </div>
                    )}

                    {content.data?.stipend && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 mb-1">
                          <IndianRupee className="h-5 w-5" />
                          <span className="font-semibold">Stipend</span>
                        </div>
                        <p className="text-gray-900">{content.data.stipend}</p>
                      </div>
                    )}

                    {content.data?.duration && (
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2 text-purple-700 mb-1">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">Duration</span>
                        </div>
                        <p className="text-gray-900">{content.data.duration}</p>
                      </div>
                    )}

                    {content.data?.work_mode && (
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <div className="flex items-center gap-2 text-indigo-700 mb-1">
                          <Building className="h-5 w-5" />
                          <span className="font-semibold">Work Mode</span>
                        </div>
                        <p className="text-gray-900">{content.data.work_mode}</p>
                      </div>
                    )}

                    {content.data?.qualification && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-700 mb-1">
                          <Building className="h-5 w-5" />
                          <span className="font-semibold">Qualification</span>
                        </div>
                        <p className="text-gray-900">{content.data.qualification}</p>
                      </div>
                    )}

                    {content.data?.age_limit && (
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2 text-orange-700 mb-1">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">Age Limit</span>
                        </div>
                        <p className="text-gray-900">{content.data.age_limit}</p>
                      </div>
                    )}

                    {content.data?.application_fee && (
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-700 mb-1">
                          <IndianRupee className="h-5 w-5" />
                          <span className="font-semibold">Application Fee</span>
                        </div>
                        <p className="text-gray-900">{content.data.application_fee}</p>
                      </div>
                    )}

                    {content.data?.total_posts && (
                      <div className="p-4 bg-teal-50 rounded-lg">
                        <div className="flex items-center gap-2 text-teal-700 mb-1">
                          <Building className="h-5 w-5" />
                          <span className="font-semibold">Total Posts</span>
                        </div>
                        <p className="text-gray-900">{content.data.total_posts}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Full Description */}
                {content.data?.description && (
                  <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Full Description</h2>
                    <div
                      className="prose prose-lg max-w-none prose-blue"
                      dangerouslySetInnerHTML={{ __html: content.data.description }}
                    />
                  </div>
                )}

                {/* Important Dates */}
                {content.data?.important_dates && (
                  <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Important Dates</h2>
                    <div
                      className="prose prose-lg max-w-none prose-blue"
                      dangerouslySetInnerHTML={{ __html: content.data.important_dates }}
                    />
                  </div>
                )}

                {/* Vacancy Details */}
                {content.data?.vacancy_details && (
                  <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Vacancy Details</h2>
                    <div
                      className="prose prose-lg max-w-none prose-blue"
                      dangerouslySetInnerHTML={{ __html: content.data.vacancy_details }}
                    />
                  </div>
                )}

                {/* Eligibility Criteria */}
                {content.data?.eligibility && (
                  <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Eligibility Criteria</h2>
                    <div
                      className="prose prose-lg max-w-none prose-blue"
                      dangerouslySetInnerHTML={{ __html: content.data.eligibility }}
                    />
                  </div>
                )}

                {/* How to Apply */}
                {content.data?.how_to_apply && (
                  <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">How to Apply</h2>
                    <div
                      className="prose prose-lg max-w-none prose-blue"
                      dangerouslySetInnerHTML={{ __html: content.data.how_to_apply }}
                    />
                  </div>
                )}

                {/* Selection Process */}
                {content.data?.selection_process && (
                  <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Selection Process</h2>
                    <div
                      className="prose prose-lg max-w-none prose-blue"
                      dangerouslySetInnerHTML={{ __html: content.data.selection_process }}
                    />
                  </div>
                )}

                {/* Advance Information */}
                {content.data?.advance_info && (
                  <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Advance Information</h2>
                    <div
                      className="prose prose-lg max-w-none prose-blue"
                      dangerouslySetInnerHTML={{ __html: content.data.advance_info }}
                    />
                  </div>
                )}

                {/* Skills Required (legacy support) */}
                {content.data?.skills_required && !content.data?.eligibility && (
                  <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Skills Required</h2>
                    <div
                      className="prose prose-lg max-w-none prose-blue"
                      dangerouslySetInnerHTML={{ __html: content.data.skills_required }}
                    />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  {/* Action Buttons */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      {content.data?.apply_link && (
                        <a
                          href={content.data.apply_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                          Apply Now
                        </a>
                      )}

                      {content.data?.download_link && (
                        <a
                          href={content.data.download_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                        >
                          <Download className="h-5 w-5" />
                          Download
                        </a>
                      )}

                      {content.data?.result_link && (
                        <a
                          href={content.data.result_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                          Check Result
                        </a>
                      )}

                      {content.data?.notification_pdf && (
                        <a
                          href={content.data.notification_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                        >
                          <Download className="h-5 w-5" />
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Information</h3>
                    <div className="space-y-3 text-sm">
                      {content.data?.exam_date && (
                        <div>
                          <span className="font-semibold text-gray-700">Exam Date:</span>
                          <p className="text-gray-600">
                            {new Date(content.data.exam_date).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                      )}
                      {content.data?.result_date && (
                        <div>
                          <span className="font-semibold text-gray-700">Result Date:</span>
                          <p className="text-gray-600">
                            {new Date(content.data.result_date).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                      )}
                      {content.data?.selection_process && (
                        <div>
                          <span className="font-semibold text-gray-700">Selection Process:</span>
                          <p className="text-gray-600">{content.data.selection_process}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Category */}
            <div className="mt-8 text-center">
              <Link
                href={category ? `/category/${category.slug}` : `/${contentType}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ← Back to {category?.name || contentTypeInfo?.name || contentType}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Content page error:', error);
    notFound();
  }
}