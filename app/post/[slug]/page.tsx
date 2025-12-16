import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCollection, type Post } from '@/lib/db';
import { getSchemaForCategory } from '@/lib/post-schemas';
import { ArrowLeft, Calendar, ExternalLink, Eye } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postsCol = await getCollection<Post>('posts');
  const post = await postsCol.findOne({ slug: params.slug } as any);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.short_description,
    keywords: post.meta_keywords,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.short_description,
      type: 'article',
    },
  };
}

export default async function PostPage({ params }: Props) {
  const postsCol = await getCollection<Post>('posts');
  const post = await postsCol.findOne({ slug: params.slug } as any);

  if (!post || !post.active) {
    notFound();
  }

  // Increment views
  await postsCol.updateOne(
    { _id: post._id },
    { $inc: { views: 1 } }
  );

  // Get category info
  const categoriesCol = await getCollection('categories');
  const category = await categoriesCol.findOne({ _id: post.category_id } as any);

  // Get schema for this category
  const schema = getSchemaForCategory(post.category_slug);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2 mb-4">
            {category && (
              <Link href={`/category/${category.slug}`}>
                <Badge variant="secondary">{category.name}</Badge>
              </Link>
            )}
            {post.featured && (
              <Badge className="bg-amber-500">Featured</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>

          {post.short_description && (
            <p className="text-lg text-muted-foreground mb-4">
              {post.short_description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {post.views || 0} views
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Information Card */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Key Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schema?.fields.map((field) => {
                    const value = post.fields[field.name];
                    if (!value || field.name === 'full_description') return null;

                    return (
                      <div key={field.name} className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {field.label}
                        </p>
                        {field.type === 'url' ? (
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            View Link
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : field.type === 'date' ? (
                          <p className="text-sm font-semibold">
                            {new Date(value).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        ) : (
                          <p className="text-sm font-semibold whitespace-pre-wrap">
                            {value}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Full Description */}
            {post.fields.full_description && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Detailed Information
                  </h2>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">
                      {post.fields.full_description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold mb-4">Quick Actions</h3>

                {post.fields.apply_link && (
                  <a
                    href={post.fields.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full">
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}

                {post.fields.download_link && (
                  <a
                    href={post.fields.download_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full" variant="outline">
                      Download
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}

                {post.fields.check_result_link && (
                  <a
                    href={post.fields.check_result_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full">
                      Check Result
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}

                {post.fields.notification_pdf && (
                  <a
                    href={post.fields.notification_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full" variant="outline">
                      View Notification
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Important Dates */}
            {(post.fields.last_date || post.fields.exam_date || post.fields.result_date) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Important Dates</h3>
                  <div className="space-y-3">
                    {post.fields.start_date && (
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">
                          {new Date(post.fields.start_date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    )}
                    {post.fields.last_date && (
                      <div>
                        <p className="text-sm text-muted-foreground">Last Date</p>
                        <p className="font-medium text-red-600">
                          {new Date(post.fields.last_date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    )}
                    {post.fields.exam_date && (
                      <div>
                        <p className="text-sm text-muted-foreground">Exam Date</p>
                        <p className="font-medium">
                          {new Date(post.fields.exam_date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    )}
                    {post.fields.result_date && (
                      <div>
                        <p className="text-sm text-muted-foreground">Result Date</p>
                        <p className="font-medium">
                          {new Date(post.fields.result_date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Share */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Share This Post</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied!');
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
