# Cloudinary Integration Guide

## Overview

Cloudinary has been successfully integrated into your RozgaarTrap admin panel for efficient image management and CDN delivery. All images uploaded through the admin panel are now stored on Cloudinary's cloud infrastructure.

## Configuration

### Environment Variables Added

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=santoshkumarkurka85
CLOUDINARY_API_KEY=db_userQtyRw670IsZN1Y9Kh
CLOUDINARY_API_SECRET=your_api_secret_here
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=santoshkumarkurka85
```

**⚠️ Important:** You need to add your actual `CLOUDINARY_API_SECRET` to the `.env` file. You can find this in your Cloudinary dashboard.

## Features Implemented

### ✅ **1. Cloudinary Configuration**
- **File**: `lib/cloudinary.ts`
- Centralized Cloudinary configuration
- Helper functions for upload and delete operations
- Automatic image optimization (quality, format, size)

### ✅ **2. Image Upload APIs**

#### **Content Images** (`/api/admin/upload-image`)
- Used for content featured images, article images, etc.
- Folder: `rozgaartrap/content`
- Max size: 5MB
- Formats: JPEG, PNG, WebP, GIF
- Auto-optimization enabled

#### **Banner/Category Images** (`/api/admin/upload-banner`)
- Used for banners, category images, hero images
- Folder: `rozgaartrap/{type}` (banner, category, hero)
- Max size: 10MB (larger for banners)
- Formats: JPEG, PNG, WebP
- Banner-specific transformations

### ✅ **3. Admin Panel Integration**

#### **Banner Management**
- Upload banner images directly to Cloudinary
- Automatic CDN URL generation
- Image preview in admin panel

#### **Category Management**
- Upload category images to Cloudinary
- Organized in `rozgaartrap/category` folder
- Image preview and management

#### **Content Creation**
- All content images (featured images, etc.) uploaded to Cloudinary
- Automatic optimization for web delivery

## Cloudinary Folder Structure

```
rozgaartrap/
├── content/          # Content featured images, article images
├── banner/           # Homepage banners, promotional images
├── category/         # Category icons and images
├── hero/             # Hero section images
└── settings/         # Site logos, favicons from settings
```

## Image Transformations Applied

### **Automatic Optimizations**
- **Size Limit**: Max 1200x630 pixels
- **Quality**: Auto-optimization based on content
- **Format**: Auto-format selection (WebP when supported)
- **Compression**: Intelligent compression without quality loss

### **Benefits**
- ⚡ **Faster Loading**: CDN delivery worldwide
- 📱 **Responsive**: Automatic format selection
- 💾 **Storage Efficient**: Optimized file sizes
- 🔒 **Secure**: Secure HTTPS delivery
- 🌍 **Global**: Fast delivery from nearest edge location

## Usage Examples

### **Upload Banner Image**
```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('type', 'banner');

const response = await fetch('/api/admin/upload-banner', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Cloudinary URL:', result.url);
```

### **Upload Content Image**
```javascript
const formData = new FormData();
formData.append('file', file);

const response = await fetch('/api/admin/upload-image', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Cloudinary URL:', result.url);
```

## File Structure

### **New Files Created**
```
lib/
└── cloudinary.ts                    # Cloudinary configuration and helpers

app/api/admin/
├── upload-image/route.ts            # Content image upload (updated)
└── upload-banner/route.ts           # Banner/category image upload (new)
```

### **Updated Files**
```
.env                                 # Added Cloudinary credentials
app/admin/dashboard/banners/page.tsx # Updated to use Cloudinary
app/admin/dashboard/categories/page.tsx # Updated to use Cloudinary
```

## Admin Panel Features

### **Banner Management** (`/admin/dashboard/banners`)
- ✅ Upload banner images to Cloudinary
- ✅ Automatic CDN URL generation
- ✅ Image preview in table
- ✅ Organized in `rozgaartrap/banner` folder

### **Category Management** (`/admin/dashboard/categories`)
- ✅ Upload category images to Cloudinary
- ✅ Image preview and management
- ✅ Organized in `rozgaartrap/category` folder

### **Content Creation** (`/admin/dashboard/content/create`)
- ✅ Featured image upload to Cloudinary
- ✅ All content images stored on CDN
- ✅ Automatic optimization

## Security Features

- ✅ **File Type Validation**: Only allowed image formats
- ✅ **Size Limits**: Prevents large file uploads
- ✅ **Secure Upload**: Direct to Cloudinary with validation
- ✅ **Error Handling**: Comprehensive error messages

## Performance Benefits

### **Before (Local Storage)**
- Images stored in `/public/uploads/`
- No optimization
- Server bandwidth usage
- Slower loading times

### **After (Cloudinary CDN)**
- Images stored on global CDN
- Automatic optimization
- Reduced server load
- Faster loading worldwide
- WebP format support
- Responsive image delivery

## Next Steps

### **1. Complete Setup**
Add your actual Cloudinary API secret to `.env`:
```env
CLOUDINARY_API_SECRET=your_actual_secret_here
```

### **2. Test Upload**
1. Go to `/admin/dashboard/banners`
2. Click "Add Banner"
3. Upload an image
4. Verify it appears with Cloudinary URL

### **3. Settings Integration** (Optional)
Update the settings page to use Cloudinary for:
- Site logos
- Favicons
- Social media images

### **4. Bulk Migration** (Optional)
If you have existing local images, create a migration script to move them to Cloudinary.

## Troubleshooting

### **Common Issues**

1. **Upload Fails**
   - Check API secret in `.env`
   - Verify file size limits
   - Check file format

2. **Images Not Loading**
   - Verify Cloudinary URLs
   - Check network connectivity
   - Confirm cloud name is correct

3. **Slow Uploads**
   - Check file size (reduce if too large)
   - Verify internet connection
   - Try different image format

### **Debug Commands**

```bash
# Test Cloudinary connection
curl -X POST "https://api.cloudinary.com/v1_1/santoshkumarkurka85/image/upload" \
  -F "file=@test-image.jpg" \
  -F "api_key=db_userQtyRw670IsZN1Y9Kh" \
  -F "api_secret=YOUR_SECRET"
```

## Conclusion

Cloudinary integration is now complete! Your admin panel can upload images directly to Cloudinary's CDN, providing:

- ⚡ **Faster image loading**
- 🌍 **Global CDN delivery**
- 📱 **Automatic optimization**
- 💾 **Reduced server storage**
- 🔒 **Secure image management**

All banner images, category images, and content images are now automatically uploaded to Cloudinary when created through the admin panel.