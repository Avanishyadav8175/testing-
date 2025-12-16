import { getCollection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim();
    const searchRegex = new RegExp(searchTerm, 'i');

    // Search in content (unified collection)
    const contentCol = await getCollection('content');
    const content = await contentCol.find({
      active: true,
      $or: [
        { title: { $regex: searchRegex } },
        { 'data.description': { $regex: searchRegex } },
        { 'data.company': { $regex: searchRegex } },
        { 'data.location': { $regex: searchRegex } },
        { 'data.content': { $regex: searchRegex } },
        { 'data.excerpt': { $regex: searchRegex } }
      ]
    }).limit(30).toArray();

    // Search in categories
    const categoriesCol = await getCollection('categories');
    const categories = await categoriesCol.find({
      active: true,
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } }
      ]
    }).limit(10).toArray();

    // Format results
    const results = [
      ...content.map((item: any) => ({
        id: item._id.toString(),
        title: item.title,
        type: item.content_type || 'content',
        category: item.category,
        location: item.data?.location,
        company: item.data?.company,
        date: item.created_at,
        slug: item.slug,
        excerpt: item.data?.description?.substring(0, 150) || item.data?.excerpt?.substring(0, 150) || item.data?.content?.substring(0, 150) || ''
      })),
      ...categories.map((category: any) => ({
        id: category._id.toString(),
        title: category.name,
        type: 'category' as const,
        slug: category.slug,
        excerpt: category.description,
        date: category.created_at || new Date().toISOString()
      }))
    ];

    // Sort by relevance (title matches first, then content matches)
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm.toLowerCase());
      const bTitle = b.title.toLowerCase().includes(searchTerm.toLowerCase());

      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;

      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
    });

    return NextResponse.json({
      results: results.slice(0, 50),
      total: results.length,
      query: searchTerm
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}