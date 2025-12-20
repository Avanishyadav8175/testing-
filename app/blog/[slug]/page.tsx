import { getCollection } from '@/lib/db';
import { Calendar, Eye, User } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const contentCol = await getCollection('content');
    const blog = await contentCol.findOne({
      slug: params.slug,
      content_type: 'blog',
      active: true
    });

    if (!blog) {
      return { title: 'Blog Not Found' };
    }

    return {
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.data?.excerpt || 'Read this blog post on Rozgaartap',
      keywords: blog.seo_keywords || blog.data?.tags?.join(', ') || '',
    };
  } catch (error) {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  try {
    const contentCol = await getCollection('content');
    const blogRaw = await contentCol.findOne({
      slug: params.slug,
      content_type: 'blog',
      active: true
    });

    if (!blogRaw) {
      notFound();
    }

    // Increment view count
    await contentCol.updateOne(
      { _id: blogRaw._id },
      { $inc: { views: 1 } }
    );

    const blog = JSON.parse(JSON.stringify(blogRaw, (key, value) => {
      if (key === '_id' && value && typeof value === 'object') {
        return value.toString();
      }
      return value;
    }));

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {blog.title}
              </h1>

              {blog.data?.excerpt && (
                <p className="text-xl text-gray-600 mb-6">
                  {blog.data.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-t pt-4">
                {blog.data?.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{blog.data.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blog.created_at).toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{blog.views || 0} views</span>
                </div>
              </div>

              {blog.data?.tags && blog.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.data.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            {blog.data?.featured_image && (
              <div className="mb-8">
                <img
                  src={blog.data.featured_image}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
                />
              </div>
            )}

            {/* Content */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.data?.content || '' }}
              />
            </div>

            {/* Back to Blog */}
            <div className="mt-8 text-center">
              <a
                href="/category/blog"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ← Back to All Blogs
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Blog page error:', error);
    notFound();
  }
}
