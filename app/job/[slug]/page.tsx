import { getCollection, type Job as JobType, type Category as CatType } from '@/lib/db';
import { formatDate, formatNumber } from '@/lib/slug';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calendar,
  ExternalLink,
  Download,
  Briefcase,
  Users,
  IndianRupee,
  Clock,
  FileText,
  Eye,
} from 'lucide-react';

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const jobsCol = await getCollection<JobType>('jobs');
  const categoriesCol = await getCollection<CatType>('categories');
  const job = await jobsCol.findOne({ slug: params.slug } as any);
  let category: any = null;
  if (job?.category_id) {
    category = await categoriesCol.findOne({ _id: job.category_id } as any);
  }

  if (!job) {
    return { title: 'Job Not Found' };
  }

  return {
    title: job.meta_title || `${job.title} - Apply Online | Job Portal`,
    description:
      job.meta_description ||
      job.short_description ||
      `${job.title} - Apply online for latest job notification. Check eligibility, fees, important dates and how to apply.`,
    openGraph: {
      title: job.meta_title || job.title,
      description: job.meta_description || job.short_description,
      type: 'article',
      publishedTime: (job as any).created_at,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const jobsCol = await getCollection<JobType>('jobs');
  const categoriesCol = await getCollection<CatType>('categories');
  const jobDoc: any = await jobsCol.findOne({ slug: params.slug } as any);
  if (!jobDoc) {
    notFound();
  }

  const category = jobDoc.category_id
    ? await categoriesCol.findOne({ _id: jobDoc.category_id } as any)
    : null;

  // Increment views (non-blocking)
  try {
    await jobsCol.updateOne({ _id: jobDoc._id } as any, { $inc: { views: 1 } });
    jobDoc.views = (jobDoc.views || 0) + 1;
  } catch {}

  const job: any = {
    ...jobDoc,
    id: jobDoc._id?.toString?.() || jobDoc.id,
    start_date: jobDoc.start_date ? new Date(jobDoc.start_date).toISOString() : null,
    last_date: jobDoc.last_date ? new Date(jobDoc.last_date).toISOString() : null,
    correction_date: jobDoc.correction_date ? new Date(jobDoc.correction_date).toISOString() : null,
    exam_date: jobDoc.exam_date ? new Date(jobDoc.exam_date).toISOString() : null,
    category: category ? { name: category.name, slug: category.slug } : null,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href={`/category/${job.category.slug}`}>
              <Badge variant="secondary">{job.category.name}</Badge>
            </Link>
            {job.featured && (
              <Badge className="bg-amber-500">Featured</Badge>
            )}
            <Badge variant="outline" className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatNumber(job.views)} views
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
          {job.short_description && (
            <p className="text-lg text-muted-foreground">
              {job.short_description}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {job.full_description && (
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{job.full_description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {job.eligibility && (
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{job.eligibility}</p>
                </CardContent>
              </Card>
            )}

            {(job.fee_general > 0 ||
              job.fee_obc > 0 ||
              job.fee_sc_st >= 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Application Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        General / OBC
                      </span>
                      <span className="font-medium flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {job.fee_general}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">SC / ST / PWD</span>
                      <span className="font-medium flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {job.fee_sc_st}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {job.apply_link && (
                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full" size="lg">
                      Apply Online
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}
                {job.notification_link && (
                  <a
                    href={job.notification_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Notification
                    </Button>
                  </a>
                )}
                {job.syllabus_link && (
                  <a
                    href={job.syllabus_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Syllabus
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {job.start_date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Start Date</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(job.start_date)}
                      </div>
                    </div>
                  </div>
                )}
                {job.last_date && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-600">Last Date</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(job.last_date)}
                      </div>
                    </div>
                  </div>
                )}
                {job.correction_date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Correction Date</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(job.correction_date)}
                      </div>
                    </div>
                  </div>
                )}
                {job.exam_date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Exam Date</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(job.exam_date)}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {job.total_posts > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>Total Posts</span>
                    </div>
                    <span className="font-medium">{formatNumber(job.total_posts)}</span>
                  </div>
                )}
                {job.age_limit && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Age Limit</span>
                    </div>
                    <span className="font-medium">{job.age_limit}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
