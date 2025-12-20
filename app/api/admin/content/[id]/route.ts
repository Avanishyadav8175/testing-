import { getCollection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET - Get single content by ID
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    const contentCol = await getCollection('content');
    const { ObjectId } = await import('mongodb');

    const content = await contentCol.findOne({ _id: new ObjectId(id) });

    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Content GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
