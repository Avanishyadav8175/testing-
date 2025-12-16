import { getCollection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, inquiryType } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Get contacts collection
    const contactsCol = await getCollection('contacts');

    // Create contact record
    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      subject: subject.trim(),
      message: message.trim(),
      inquiryType: inquiryType || 'general',
      status: 'new',
      created_at: new Date(),
      updated_at: new Date(),
      ip_address: request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown'
    };

    // Insert into database
    const result = await contactsCol.insertOne(contactData);

    // TODO: Send email notification to admin
    // You can integrate with services like SendGrid, Nodemailer, etc.

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully',
      id: result.insertedId
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve contact messages (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const inquiryType = searchParams.get('inquiryType');

    const skip = (page - 1) * limit;

    const contactsCol = await getCollection('contacts');

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (inquiryType) query.inquiryType = inquiryType;

    // Get contacts with pagination
    const [contacts, total] = await Promise.all([
      contactsCol
        .find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      contactsCol.countDocuments(query)
    ]);

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve contacts' },
      { status: 500 }
    );
  }
}