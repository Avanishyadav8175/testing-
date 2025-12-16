import { ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';
import JobCard from './job-card';

interface Job {
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
}

export default function GovernmentJobsSection({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Government Jobs
            </h2>
          </div>

          <Link
            href="/category/government-jobs"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 6).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}