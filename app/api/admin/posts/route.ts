import { getCollection, type Post } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const col = await getCollection<Post>('posts');

    let query: any = {};
    if (category && category !== 'all') {
      query.category_slug = category;
    }

    const items = await col
      .find(query)
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ data: items });
  } catch (err: any) {
    console.error('Posts fetch error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const col = await getCollection<Post>('posts');
    const now = new Date();

    const postData = {
      title: body.title,
      slug: body.slug,
      category_id: new ObjectId(body.category_id),
      category_slug: body.category_slug,
      short_description: body.short_description || '',
      full_description: body.full_description || '',
      fields: body.fields || {},
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || body.short_description,
      meta_keywords: body.meta_keywords || '',
      active: body.active !== undefined ? body.active : true,
      featured: body.featured !== undefined ? body.featured : false,
      views: 0,
      created_at: now,
      updated_at: now,
    };

    await col.insertOne(postData as any);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Post creation error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const col = await getCollection<Post>('posts');

    const updateData = {
      title: rest.title,
      slug: rest.slug,
      category_id: new ObjectId(rest.category_id),
      category_slug: rest.category_slug,
      short_description: rest.short_description || '',
      full_description: rest.full_description || '',
      fields: rest.fields || {},
      meta_title: rest.meta_title || rest.title,
      meta_description: rest.meta_description || rest.short_description,
      meta_keywords: rest.meta_keywords || '',
      active: rest.active !== undefined ? rest.active : true,
      featured: rest.featured !== undefined ? rest.featured : false,
      updated_at: new Date(),
    };

    await col.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Post update error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const col = await getCollection<Post>('posts');
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Post deletion error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to delete post' },
      { status: 500 }
    );
  }
}
