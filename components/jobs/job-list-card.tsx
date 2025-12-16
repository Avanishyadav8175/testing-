import { Building, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';

interface JobListCardProps {
  job: {
    id: string;
    title: string;
    company?: string;
    organization?: string;
    location?: string;
    last_date?: string;
    apply_date?: string;
    salary?: string;
    category?: { name: string };
    slug: string;
    featured?: boolean;
    tags?: string[];
    badge?: 'New' | 'Hot' | 'Urgent';
    created_at?: string;
  };
}

export default function JobListCard({ job }: JobListCardProps) {
  const getBadgeStyles = (badge?: string) => {
    switch (badge) {
      case 'New':
        return 'bg-green-500 text-white';
      case 'Hot':
        return 'bg-orange-500 text-white';
      case 'Urgent':
        return 'bg-red-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          {/* Left Section - Job Info */}
          <div className="flex-1">
            {/* Title and Badges */}
            <div className="flex items-start gap-3 mb-3">
              <Link
                href={`/job/${job.slug}`}
                className="flex-1"
              >
                <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                  {job.title}
                </h3>
              </Link>

              <div className="flex gap-2 flex-shrink-0">
                {job.badge && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyles(job.badge)}`}>
                    {job.badge}
                  </span>
                )}
                {job.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Organization */}
            {(job.company || job.organization) && (
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Building className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">{job.company || job.organization}</span>
              </div>
            )}

            {/* Dates Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {job.last_date && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">
                    <span className="font-medium">Last Date:</span> {formatDate(job.last_date)}
                  </span>
                </div>
              )}

              {job.created_at && (
                <div className="text-sm text-gray-500">
                  {formatDate(job.created_at)}
                </div>
              )}
            </div>

            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
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

          {/* Right Section - Category and Actions */}
          <div className="flex flex-col items-end gap-3 lg:min-w-[200px]">
            {job.category && (
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold">
                {job.category.name}
              </span>
            )}

            <div className="flex gap-2 w-full lg:w-auto">
              <Link
                href={`/job/${job.slug}`}
                className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>View</span>
              </Link>

              <Link
                href={`/job/${job.slug}`}
                className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <span>Apply Now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}