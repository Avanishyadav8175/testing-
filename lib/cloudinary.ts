import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Upload Image
export async function uploadToCloudinary(
  file: File,
  folder: string = 'rozgaartrap'
): Promise<{ url: string; public_id: string }> {
  try {

    // File → Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    let transformation;

    // Category Images (Icons / Square)
    if (folder.includes('category')) {
      transformation = [
        {
          width: 300,
          height: 300,
          crop: 'fit',
          background: 'white'
        },
        { quality: 'auto:best' },
        { fetch_format: 'auto' },
        { dpr: 'auto' }
      ];
    }

    // Banner Images (High Quality Wide)
    else if (folder.includes('banner')) {
      transformation = [
        {
          width: 2400,
          crop: 'limit'
        },
        { quality: 'auto:best' },
        { fetch_format: 'auto' },
        { dpr: 'auto' }
      ];
    }

    // Default Content Images
    else {
      transformation = [
        {
          width: 1600,
          crop: 'limit'
        },
        { quality: 'auto:best' },
        { fetch_format: 'auto' },
        { dpr: 'auto' }
      ];
    }

    // Upload
    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: 'auto',
      transformation
    });

    return {
      url: result.secure_url,
      public_id: result.public_id
    };

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}


// Delete Image
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}