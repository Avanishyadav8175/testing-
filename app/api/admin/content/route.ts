import { getCollection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET - List all content with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('type');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const contentCol = await getCollection('content');

    // Build query
    const query: any = {};
    if (contentType) query.content_type = contentType;
    if (category) query.category_id = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [content, total] = await Promise.all([
      contentCol
        .find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      contentCol.countDocuments(query),
    ]);

    return NextResponse.json({
      content,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Content GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      content_type,
      category_id,
      title,
      slug,
      data,
      featured,
      active,
      seo_title,
      seo_description,
      seo_keywords,
    } = body;

    if (!content_type || !title || !slug) {
      return NextResponse.json(
        { error: 'Content type, title, and slug are required' },
        { status: 400 }
      );
    }

    const contentCol = await getCollection('content');

    // Check if slug already exists
    const existing = await contentCol.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      );
    }

    const newContent = {
      content_type,
      category_id: category_id || null,
      title,
      slug,
      data: data || {}, // All dynamic fields stored here
      featured: featured || false,
      active: active !== false,
      views: 0,
      seo_title: seo_title || title,
      seo_description: seo_description || '',
      seo_keywords: seo_keywords || '',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await contentCol.insertOne(newContent);

    return NextResponse.json({
      message: 'Content created successfully',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Content POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}

// PUT - Update content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    const contentCol = await getCollection('content');
    const { ObjectId } = await import('mongodb');

    const result = await contentCol.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updated_at: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Content PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    const contentCol = await getCollection('content');
    const { ObjectId } = await import('mongodb');

    const result = await contentCol.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Content DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}