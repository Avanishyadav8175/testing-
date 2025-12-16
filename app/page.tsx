import AchievementStats from '@/components/home/achievement-stats';
import CategoryFilters from '@/components/home/category-filters';
import FeaturedJobs from '@/components/home/featured-jobs';
import GovernmentJobsSection from '@/components/home/government-jobs-section';
import HeroBanner from '@/components/home/hero-banner';
import LatestJobs from '@/components/home/latest-jobs';
import SearchSection from '@/components/home/search-section';
import ServiceCards from '@/components/home/service-cards';
import { getCollection } from '@/lib/db';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RozgaarTrap - Latest Government & Private Jobs, Admit Cards, Results',
  description:
    'Find latest government jobs, private jobs, admit cards, results, answer keys and exam notifications. Apply online for sarkari naukri.',
  keywords: 'government jobs, private jobs, admit cards, results, sarkari naukri, job portal, employment',
  openGraph: {
    title: 'RozgaarTrap - Latest Government & Private Jobs',
    description: 'Find latest government jobs, private jobs, admit cards, results, answer keys and exam notifications.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const revalidate = 60;

// Helper to safely serialize MongoDB documents
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

export default async function HomePage() {
  try {
    const bannersCol = await getCollection('banners');
    const categoriesCol = await getCollection('categories');
    const contentCol = await getCollection('content');

    const [bannersRaw, categoriesRaw, featuredJobsRaw, govtJobsRaw, latestJobsRaw] = await Promise.all([
      bannersCol.find({ active: true }).sort({ sort_order: 1 }).limit(5).toArray(),
      categoriesCol.find({ active: true }).sort({ sort_order: 1 }).toArray(),
      contentCol.find({ content_type: 'job', active: true, featured: true }).sort({ created_at: -1 }).limit(6).toArray(),
      contentCol.find({ content_type: 'job', active: true }).sort({ created_at: -1 }).limit(6).toArray(),
      contentCol.find({ active: true }).sort({ created_at: -1 }).limit(6).toArray(),
    ]);

    // Safely serialize all data
    const banners = bannersRaw.map(serializeDoc).filter(Boolean);
    const categories = categoriesRaw.map(serializeDoc).filter(Boolean);

    // Create category lookup
    const categoryMap = new Map(categories.map(c => [c._id, c]));

    // Process jobs with category info
    const processJob = (job: any, index: number) => {
      const serialized = serializeDoc(job);
      if (serialized && serialized.category_id) {
        const category = categoryMap.get(serialized.category_id);
        serialized.category = category ? { name: category.name } : null;
      }

      // Add badge from data if exists
      if (serialized.data?.badge) {
        serialized.badge = serialized.data.badge;
      } else {
        if (index === 0) serialized.badge = 'New';
        if (index === 1) serialized.badge = 'Hot';
        if (index === 2) serialized.badge = 'Urgent';
      }

      // Add tags from data or use defaults
      serialized.tags = serialized.data?.tags || ['Graduate', 'All India', 'Permanent'];

      return serialized;
    };

    const featuredJobs = featuredJobsRaw.map((job, i) => processJob(job, i)).filter(Boolean);
    const govtJobs = govtJobsRaw.map((job, i) => processJob(job, i)).filter(Boolean);
    const latestJobs = latestJobsRaw.map((job, i) => processJob(job, i)).filter(Boolean);

    // Separate posts from jobs for latest section
    const latestPosts = latestJobs.filter((item: any) => item.content_type !== 'job');
    const latestJobsOnly = latestJobs.filter((item: any) => item.content_type === 'job');

    return (
      <div className="min-h-screen bg-gray-50">
        <HeroBanner banners={banners} />
        <SearchSection />
        <CategoryFilters />
        <ServiceCards categories={categories} />
        <AchievementStats />
        {featuredJobs.length > 0 && <FeaturedJobs jobs={featuredJobs} />}
        {govtJobs.length > 0 && <GovernmentJobsSection jobs={govtJobs} />}
        <LatestJobs jobs={latestJobsOnly} posts={latestPosts} />
      </div>
    );
  } catch (error) {
    console.error('Homepage error:', error);

    // Fallback to static content
    const staticCategories = [
      { id: '1', name: 'Govt. Jobs', slug: 'government-jobs', icon: 'briefcase' },
      { id: '2', name: 'Admit Card', slug: 'admit-cards', icon: 'credit-card' },
      { id: '3', name: 'Result', slug: 'results', icon: 'trophy' },
      { id: '4', name: 'Notification', slug: 'notifications', icon: 'bell' },
      { id: '5', name: 'Private Jobs', slug: 'private-jobs', icon: 'users' },
      { id: '6', name: 'Internships', slug: 'internships', icon: 'user-check' },
      { id: '7', name: 'Scholarships', slug: 'scholarships', icon: 'graduation-cap' },
      { id: '8', name: 'College Mitra', slug: 'college-mitra', icon: 'headphones' },
      { id: '9', name: 'Science Corner', slug: 'science-corner', icon: 'flask-conical' },
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <HeroBanner banners={[]} />
        <SearchSection />
        <CategoryFilters />
        <ServiceCards categories={staticCategories} />
        <AchievementStats />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">Loading dynamic content...</p>
        </div>
      </div>
    );
  }
}