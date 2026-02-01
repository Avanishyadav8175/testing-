import { getCollection, type Category } from '@/lib/db';
import { generateUniqueSlug } from '@/lib/slug-utils';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const col = await getCollection<Category>('categories');
    const items = await col.find({}).sort({ sort_order: 1 }).toArray();
    return NextResponse.json({ data: items });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const col = await getCollection<Category>('categories');
    const now = new Date();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Generate unique slug if not provided or if provided slug already exists
    let slug = body.slug;
    if (!slug) {
      // Generate slug from name if not provided
      slug = body.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    // Ensure slug is unique
    const uniqueSlug = await generateUniqueSlug(slug, 'categories');

    // Prepare category data with all fields
    const categoryData = {
      name: body.name,
      slug: uniqueSlug,
      description: body.description || '',
      icon: body.icon || 'briefcase',
      image_url: body.image_url || '',
      button_color: body.button_color || '#1e3a8a',
      sort_order: body.sort_order || 0,
      active: body.active !== undefined ? body.active : true,
      created_at: now,
      updated_at: now,
    };

    await col.insertOne(categoryData as any);
    return NextResponse.json({
      ok: true,
      message: 'Category created successfully',
      category: categoryData
    });
  } catch (err: any) {
    console.error('Category creation error:', err);

    // Handle MongoDB duplicate key error specifically
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue || {})[0];
      const duplicateValue = err.keyValue?.[duplicateField];
      return NextResponse.json(
        { error: `Category with ${duplicateField} "${duplicateValue}" already exists. Please use a different ${duplicateField}.` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: err.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const col = await getCollection<Category>('categories');

    // Validate required fields
    if (!rest.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Generate unique slug if not provided
    let slug = rest.slug;
    if (!slug) {
      slug = rest.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    // Ensure slug is unique (excluding current category)
    const uniqueSlug = await generateUniqueSlug(slug, 'categories', id);

    // Prepare update data
    const updateData = {
      name: rest.name,
      slug: uniqueSlug,
      description: rest.description || '',
      icon: rest.icon || 'briefcase',
      image_url: rest.image_url || '',
      button_color: rest.button_color || '#1e3a8a',
      sort_order: rest.sort_order || 0,
      active: rest.active !== undefined ? rest.active : true,
      updated_at: new Date(),
    };

    const result = await col.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      message: 'Category updated successfully'
    });
  } catch (err: any) {
    console.error('Category update error:', err);

    // Handle MongoDB duplicate key error specifically
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue || {})[0];
      const duplicateValue = err.keyValue?.[duplicateField];
      return NextResponse.json(
        { error: `Category with ${duplicateField} "${duplicateValue}" already exists. Please use a different ${duplicateField}.` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: err.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const col = await getCollection<Category>('categories');
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete category' }, { status: 500 });
  }
}


