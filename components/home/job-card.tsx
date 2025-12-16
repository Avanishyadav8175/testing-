import { Building, Calendar, Clock, IndianRupee, Star } from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
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
  };
}

export default function JobCard({ job }: JobCardProps) {
  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'New':
        return 'bg-green-100 text-green-700';
      case 'Hot':
        return 'bg-orange-100 text-orange-700';
      case 'Urgent':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <Link
      href={`/job/${job.slug}`}
      className="group block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500 hover:border-indigo-600"
    >
      {/* Header with Icon and Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Building className="h-7 w-7 text-indigo-600" />
        </div>

        {job.badge && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(job.badge)}`}>
            {job.badge}
          </span>
        )}

        {job.featured && !job.badge && (
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        )}
      </div>

      {/* Job Title */}
      <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
        {job.title}
      </h3>

      {/* Organization */}
      {(job.company || job.organization) && (
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Building className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{job.company || job.organization}</span>
        </div>
      )}

      {/* Dates */}
      <div className="space-y-2 mb-4">
        {job.apply_date && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4 flex-shrink-0 text-blue-500" />
            <span className="text-sm">
              Apply: {new Date(job.apply_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
        )}

        {job.last_date && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 flex-shrink-0 text-red-500" />
            <span className="text-sm">
              Last: {new Date(job.last_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
        )}
      </div>

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {job.salary && (
          <div className="flex items-center gap-1 text-green-600 font-semibold">
            <IndianRupee className="h-4 w-4" />
            <span className="text-sm">{job.salary}</span>
          </div>
        )}

        {job.category && (
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
            {job.category.name}
          </span>
        )}

        <button className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Apply Now
        </button>
      </div>
    </Link>
  );
}