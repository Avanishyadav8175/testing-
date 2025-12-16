import { NextRequest, NextResponse } from 'next/server';
import { getCollection, type Job, type Category } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get('category');
    const id = searchParams.get('id');
    const jobsCol = await getCollection<Job>('jobs');
    const categoriesCol = await getCollection<Category>('categories');

    if (id) {
      const job = await jobsCol.findOne({ _id: new ObjectId(id) } as any);
      if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ data: job });
    }

    const query: any = {};
    if (categoryFilter && categoryFilter !== 'all') {
      try {
        query.category_id = new ObjectId(categoryFilter);
      } catch {
        // ignore invalid id
      }
    }

    const jobs = await jobsCol
      .find(query)
      .sort({ created_at: -1 })
      .toArray();

    const categoryIds = Array.from(new Set(jobs.map(j => j.category_id?.toString()).filter(Boolean)));
    const categories = await categoriesCol
      .find({ _id: { $in: categoryIds.map(id => new ObjectId(id as string)) } })
      .project({ name: 1 })
      .toArray();
    const catMap = new Map(categories.map(c => [c._id.toString(), c]));

    const shaped = jobs.map(j => ({
      id: j._id?.toString() || '',
      title: j.title,
      slug: j.slug,
      last_date: j.last_date,
      views: j.views,
      active: j.active,
      featured: j.featured,
      category: j.category_id ? { id: j.category_id.toString(), name: catMap.get(j.category_id.toString())?.name || '' } : null,
    }));

    return NextResponse.json({ data: shaped });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const jobsCol = await getCollection<Job>('jobs');
    await jobsCol.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete job' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const jobsCol = await getCollection<Job>('jobs');
    const now = new Date();
    const toDate = (s: string) => (s ? new Date(s) : undefined);
    const doc: any = {
      ...body,
      category_id: body.category_id ? new ObjectId(body.category_id) : undefined,
      start_date: toDate(body.start_date),
      last_date: toDate(body.last_date),
      correction_date: toDate(body.correction_date),
      exam_date: toDate(body.exam_date),
      created_at: now,
      updated_at: now,
      views: body.views ?? 0,
    };
    await jobsCol.insertOne(doc);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create job' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const jobsCol = await getCollection<Job>('jobs');
    const toDate = (s: string) => (s ? new Date(s) : undefined);
    const $set: any = {
      ...rest,
      updated_at: new Date(),
    };
    if (rest.category_id) $set.category_id = new ObjectId(rest.category_id);
    if (rest.start_date !== undefined) $set.start_date = toDate(rest.start_date);
    if (rest.last_date !== undefined) $set.last_date = toDate(rest.last_date);
    if (rest.correction_date !== undefined) $set.correction_date = toDate(rest.correction_date);
    if (rest.exam_date !== undefined) $set.exam_date = toDate(rest.exam_date);
    await jobsCol.updateOne({ _id: new ObjectId(id) }, { $set });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update job' }, { status: 500 });
  }
}


