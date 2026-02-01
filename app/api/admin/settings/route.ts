import connectToDatabase from '@/lib/mongodb';
import { validateSettings } from '@/lib/settings-validation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const settings = await db.collection('settings').findOne({ type: 'site_settings' });

    return NextResponse.json({
      success: true,
      settings: settings?.data || null
    });
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const settingsData = await request.json();

    // Validate settings
    const validation = validateSettings(settingsData);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    // Update or create settings document
    const result = await db.collection('settings').updateOne(
      { type: 'site_settings' },
      {
        $set: {
          type: 'site_settings',
          data: settingsData,
          updated_at: new Date()
        },
        $setOnInsert: {
          created_at: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Settings saved successfully',
      result
    });
  } catch (error) {
    console.error('Settings save error:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}