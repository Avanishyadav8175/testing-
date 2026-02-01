import { uploadToCloudinary } from '@/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'banner'; // banner, category, hero, etc.

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed for banners.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit for banners)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB for banners.' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary with banner-specific transformations
    const result = await uploadToCloudinary(file, `rozgaartrap/${type}`);

    return NextResponse.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      filename: file.name,
      size: file.size,
      type: file.type,
      upload_type: type,
      message: `${type} image uploaded successfully to Cloudinary`
    });

  } catch (error) {
    console.error('Banner upload error:', error);
    return NextResponse.json(
      { error: `Failed to upload ${formData.get('type') || 'banner'} image to Cloudinary` },
      { status: 500 }
    );
  }
}