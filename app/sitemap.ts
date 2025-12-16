import { getCollection } from '@/lib/db';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://Rozgar Tap.com';

  try {
    const contentCol = await getCollection('content');
    const categoriesCol = await getCollection('categories');

    // Fetch all active content and categories
    const [content, categories] = await Promise.all([
      contentCol.find({ active: true }).toArray(),
      categoriesCol.find({ active: true }).toArray()
    ]);

    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/jobs`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ];

    // Generate URLs for all content items
    const contentPages = content.map((item: any) => ({
      url: `${baseUrl}/${item.content_type || 'job'}/${item.slug}`,
      lastModified: new Date(item.updated_at || item.created_at),
      changeFrequency: 'weekly' as const,
      priority: item.featured ? 0.9 : 0.8,
    }));

    const categoryPages = categories.map((category: any) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(category.updated_at || category.created_at),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...contentPages, ...categoryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
    ];
  }
}