import { ArrowRight, Briefcase, Clock } from 'lucide-react';
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
  created_at?: string;
}

interface Post {
  _id?: string;
  id?: string;
  title: string;
  category?: string;
  slug: string;
  created_at?: string;
  excerpt?: string;
}

export default function LatestJobs({
  jobs,
  posts = []
}: {
  jobs: Job[];
  posts?: Post[]
}) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Latest Updates
            </h2>
          </div>

          <Link
            href="/jobs"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors group"
          >
            <Briefcase className="h-5 w-5" />
            <span>View All Jobs</span>
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