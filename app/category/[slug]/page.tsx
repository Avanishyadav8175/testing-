import { getCollection } from '@/lib/db';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const categoriesCol = await getCollection('categories');
    const category = await categoriesCol.findOne({ slug });

    if (!category) {
      return { title: 'Not Found' };
    }

    return {
      title: `${category.name} - Rozgartap`,
      description: category.description || `Browse ${category.name} on Rozgartap`,
      keywords: `${category.name.toLowerCase()}, job portal, employment, career`,
    };
  } catch (error) {
    return { title: 'Category' };
  }
}

export default async function CategoryPage({ params }: PageProps) {
  try {
    const { slug } = await params;

    // Fetch category
    const categoriesCol = await getCollection('categories');
    const categoryRaw = await categoriesCol.findOne({ slug });

    if (!categoryRaw) {
      notFound();
    }

    const category = JSON.parse(JSON.stringify(categoryRaw, (key, value) => {
      if (key === '_id' && value && typeof value === 'object') {
        return value.toString();
      }
      return value;
    }));

    // Fetch content for this category
    const contentCol = await getCollection('content');
    const contentRaw = await contentCol
      .find({
        category_id: categoryRaw._id.toString(),
        active: true
      })
      .sort({ created_at: -1 })
      .toArray();

    const content = contentRaw.map(item =>
      JSON.parse(JSON.stringify(item, (key, value) => {
        if (key === '_id' && value && typeof value === 'object') {
          return value.toString();
        }
        return value;
      }))
    );

    return <CategoryPageClient category={category} initialContent={content} />;
  } catch (error) {
    console.error('Category page error:', error);
    notFound();
  }
}