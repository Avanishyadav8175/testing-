import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Helper function to upload image to Cloudinary
export async function uploadToCloudinary(
  file: File,
  folder: string = 'rozgaartrap'
): Promise<{ url: string; public_id: string }> {
  try {
    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Different transformations based on folder type
    let transformation;

    if (folder.includes('category')) {
      // Category images - square format, optimized for icons
      transformation = [
        { width: 200, height: 200, crop: 'fit', background: 'white' }, // Square with white background
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ];
    } else if (folder.includes('banner')) {
      // Banner images - wide format
      transformation = [
        { width: 1200, height: 400, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ];
    } else {
      // Default content images
      transformation = [
        { width: 1200, height: 630, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ];
    }

    // Upload to Cloudinary
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

// Helper function to delete image from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}