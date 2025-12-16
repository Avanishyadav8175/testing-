import { getCollection, type Category } from '@/lib/db';
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

    // Prepare category data with all fields
    const categoryData = {
      name: body.name,
      slug: body.slug,
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
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Category creation error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const col = await getCollection<Category>('categories');

    // Prepare update data
    const updateData = {
      name: rest.name,
      slug: rest.slug,
      description: rest.description || '',
      icon: rest.icon || 'briefcase',
      image_url: rest.image_url || '',
      button_color: rest.button_color || '#1e3a8a',
      sort_order: rest.sort_order || 0,
      active: rest.active !== undefined ? rest.active : true,
      updated_at: new Date(),
    };

    await col.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Category update error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update category' }, { status: 500 });
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


