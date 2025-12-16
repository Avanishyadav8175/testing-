import { getCollection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const subscribersCol = await getCollection('newsletter_subscribers');

    // Check if email already exists
    const existingSubscriber = await subscribersCol.findOne({ email });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Add new subscriber
    await subscribersCol.insertOne({
      email,
      subscribed_at: new Date(),
      active: true,
      source: 'website_footer'
    });

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}