import { getCollection, type Banner } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const col = await getCollection<Banner>('banners');
    const items = await col.find({} as any).sort({ sort_order: 1 }).toArray();
    return NextResponse.json({ data: items });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const col = await getCollection<Banner>('banners');
    const now = new Date();

    const bannerData = {
      title: body.title,
      subtitle: body.subtitle || '',
      image_url: body.image_url || '',
      link: body.link || '',
      sort_order: body.sort_order || 0,
      active: body.active !== undefined ? body.active : true,
      created_at: now,
    };

    await col.insertOne(bannerData as any);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Banner creation error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create banner' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const col = await getCollection<Banner>('banners');

    const updateData = {
      title: rest.title,
      subtitle: rest.subtitle || '',
      image_url: rest.image_url || '',
      link: rest.link || '',
      sort_order: rest.sort_order || 0,
      active: rest.active !== undefined ? rest.active : true,
    };

    await col.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Banner update error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const col = await getCollection<Banner>('banners');
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete banner' }, { status: 500 });
  }
}


