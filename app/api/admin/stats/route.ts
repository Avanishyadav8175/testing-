import { NextResponse } from 'next/server';
import { getCollection, type Job, type Category } from '@/lib/db';

export async function GET() {
  try {
    const jobsCol = await getCollection<Job>('jobs');
    const categoriesCol = await getCollection<Category>('categories');

    const [jobsCount, categoriesCount, jobs] = await Promise.all([
      jobsCol.countDocuments({}),
      categoriesCol.countDocuments({}),
      jobsCol.find({}, { projection: { views: 1, active: 1 } }).toArray(),
    ]);

    const totalViews = jobs.reduce((sum, j) => sum + (j.views || 0), 0);
    const activeJobs = jobs.filter(j => j.active).length;

    return NextResponse.json({
      totalJobs: jobsCount,
      activeJobs,
      totalCategories: categoriesCount,
      totalViews,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch stats' }, { status: 500 });
  }
}


