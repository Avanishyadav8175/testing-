import { ArrowRight, Star } from 'lucide-react';
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

export default function FeaturedJobs({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="main-container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Jobs
            </h2>
          </div>

          <Link
            href="/jobs?featured=true"
            className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={{ ...job, featured: true }} />
          ))}
        </div>
      </div>
    </section>
  );
}