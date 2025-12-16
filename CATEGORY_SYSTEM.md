# Dynamic Category System with Image Support

## Overview
The category system now supports custom images and button colors, matching the design style with rounded cards and colorful buttons.

## Features
- ✅ Custom image upload for each category
- ✅ Custom button color picker (hex colors)
- ✅ Fallback icon support (Lucide icons)
- ✅ Responsive grid layout (2 cols mobile, 3 tablet, 4 desktop)
- ✅ Hover effects and smooth transitions
- ✅ Image preview in admin panel
- ✅ Drag & drop image upload

## Database Schema
```typescript
{
  name: string;           // Category name (e.g., "Govt. Jobs")
  slug: string;           // URL-friendly slug (e.g., "govt-jobs")
  description: string;    // Short description
  icon: string;           // Lucide icon name (fallback)
  image_url?: string;     // Uploaded image URL
  button_color?: string;  // Hex color (e.g., "#1e3a8a")
  sort_order: number;     // Display order
  active: boolean;        // Show/hide category
  created_at: Date;
  updated_at: Date;
}
```

## Admin Panel Usage

### Adding a New Category
1. Go to `/admin/dashboard/categories`
2. Click "Add Category" button
3. Fill in the form:
   - **Name**: Category display name
   - **Slug**: Auto-generated URL slug (editable)
   - **Description**: Brief description (optional)
   - **Image**: Upload PNG/JPG/SVG (recommended: 200x200px)
   - **Button Color**: Pick a color or enter hex code
   - **Fallback Icon**: Lucide icon name (used if no image)
   - **Sort Order**: Display order (lower = first)
   - **Active**: Toggle visibility

### Editing Categories
1. Click the edit icon next to any category
2. Update fields as needed
3. Upload new image or remove existing one
4. Click "Update"

### Image Guidelines
- **Format**: PNG, JPG, or SVG
- **Size**: 200x200px recommended
- **Background**: Transparent or white
- **Style**: Simple, clear icons/illustrations
- **File size**: Keep under 100KB for best performance

## Seeding Sample Data

### Option 1: Using the Seed Script
```bash
# Install dependencies if needed
npm install

# Run the seed script
node scripts/seed-categories.js
```

### Option 2: Manual Import
1. Import `scripts/sample-categories.json` into MongoDB
2. Use MongoDB Compass or mongoimport:
```bash
mongoimport --uri="mongodb://localhost:27017/jobportal" \
  --collection=categories \
  --file=scripts/sample-categories.json \
  --jsonArray
```

## Frontend Display

### Home Page
Categories are displayed in a responsive grid with:
- Rounded card design
- Image or fallback icon
- Colored button with category name
- Hover effects (shadow, scale)

### Category Page
Each category has its own page at `/category/[slug]` showing:
- Category name and description
- List of jobs in that category
- Filtering and sorting options

## Color Palette Suggestions

Based on the design screenshot:
- **Govt. Jobs**: `#1e3a8a` (Navy Blue)
- **Admit Card**: `#15803d` (Green)
- **Result**: `#b91c1c` (Red)
- **Notification**: `#ea580c` (Orange)
- **Private Jobs**: `#6b21a8` (Purple)
- **Internships**: `#7c3aed` (Violet)
- **Scholarships**: `#0f172a` (Dark Blue)
- **Collage Mitra**: `#000000` (Black)
- **Science Corner**: `#0c4a6e` (Teal)

## API Endpoints

### GET /api/admin/categories
Fetch all categories (sorted by sort_order)

### POST /api/admin/categories
Create a new category
```json
{
  "name": "New Category",
  "slug": "new-category",
  "description": "Description",
  "icon": "briefcase",
  "image_url": "/uploads/image.png",
  "button_color": "#1e3a8a",
  "sort_order": 10,
  "active": true
}
```

### PUT /api/admin/categories
Update existing category
```json
{
  "id": "category_id",
  "name": "Updated Name",
  ...
}
```

### DELETE /api/admin/categories?id=category_id
Delete a category

### POST /api/admin/upload
Upload image file
- Accepts: multipart/form-data
- Returns: `{ "url": "/uploads/filename.png" }`

## Troubleshooting

### Images not displaying
- Check that `/public/uploads` directory exists
- Verify image URLs are correct
- Check file permissions

### Colors not showing
- Ensure hex color format: `#RRGGBB`
- Check browser console for errors

### Categories not appearing
- Verify `active: true` in database
- Check `sort_order` values
- Clear Next.js cache: `rm -rf .next`

## Next Steps
1. Upload custom images for each category
2. Adjust colors to match your brand
3. Add more categories as needed
4. Customize hover effects in CSS
