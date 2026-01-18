import JobFilters from '@/components/jobs/job-filters';
import JobListCard from '@/components/jobs/job-list-card';
import { getCollection } from '@/lib/db';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Jobs - Government & Private Jobs | Rozgartap',
  description: 'Browse all government and private job opportunities. Find your dream job with latest openings across India.',
  keywords: 'jobs, government jobs, private jobs, employment, career opportunities, job listings',
};

export const revalidate = 300; // 5 minutes

// Helper to serialize MongoDB documents
function serializeDoc(doc: any) {
  if (!doc) return null;

  const serialized: any = {};
  for (const [key, value] of Object.entries(doc)) {
    if (key === '_id') {
      serialized._id = value?.toString();
      serialized.id = value?.toString();
    } else if (value instanceof Date) {
      serialized[key] = value.toISOString();
    } else if (typeof value === 'object' && value !== null && 'toString' in value) {
      serialized[key] = value.toString();
    } else {
      serialized[key] = value;
    }
  }
  return serialized;
}

export default async function JobsPage() {
  try {
    const contentCol = await getCollection('content');
    const categoriesCol = await getCollection('categories');

    const [jobsRaw, categoriesRaw] = await Promise.all([
      contentCol.find({
        content_type: 'job',
        active: true
      }).sort({ created_at: -1 }).toArray(),
      categoriesCol.find({ active: true }).sort({ name: 1 }).toArray()
    ]);

    const jobs = jobsRaw.map(serializeDoc).filter(Boolean);
    const categories = categoriesRaw.map(serializeDoc).filter(Boolean);
    const categoryMap = new Map(categories.map((c: any) => [c._id, c]));

    // Add category info to jobs
    const enrichedJobs = jobs.map((job: any, index: number) => {
      const category = categoryMap.get(job.category_id);

      return {
        ...job,
        category: category ? { name: category.name } : null,
        // Add badge from job data if exists
        badge: job.data?.badge || (index === 0 ? 'New' : index === 1 ? 'Hot' : index === 2 ? 'Urgent' : undefined),
        tags: job.data?.tags || ['Graduate', 'All India', 'Permanent'],
      };
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              All Jobs
            </h1>
            <p className="text-gray-600 text-lg">
              Browse {jobs.length} job opportunities across various categories
            </p>
          </div>

          {/* Filters */}
          <JobFilters categories={categories} />

          {/* Jobs List */}
          <div className="space-y-4">
            {enrichedJobs.map((job: any) => (
              <JobListCard key={job.id} job={job} />
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500">
                Check back later for new job opportunities.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Jobs page error:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Failed to load jobs. Please try again later.</p>
      </div>
    );
  }
}