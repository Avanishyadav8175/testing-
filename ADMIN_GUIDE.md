# Admin Panel Guide - Category Management

## Quick Start

### 1. Seed Initial Categories
Run this command to create the 8 default categories:

```bash
node scripts/seed-categories.js
```

This will create:
- ✅ Govt. Jobs
- ✅ Admit Card
- ✅ Result
- ✅ Notification
- ✅ Private Jobs
- ✅ Internships
- ✅ Scholarships
- ✅ Science Corner

### 2. Access Admin Panel
Navigate to: `http://localhost:3000/admin/dashboard/categories`

## Managing Categories

### Adding a New Category

1. Click **"Add Category"** button
2. Fill in the form:
   - **Name**: Category display name (e.g., "Govt. Jobs")
   - **Slug**: URL-friendly version (auto-generated, e.g., "govt-jobs")
   - **Description**: Brief description for SEO
   - **Category Image**: Upload an image (PNG/JPG/SVG, 200x200px recommended)
   - **Button Color**: Pick a color or enter hex code
   - **Fallback Icon**: Lucide icon name (used if no image uploaded)
   - **Sort Order**: Display order (1 = first, 2 = second, etc.)
   - **Active**: Toggle to show/hide on homepage

3. Click **"Create"**

### Editing a Category

1. Click the **Edit** icon (pencil) next to any category
2. Update any fields
3. Upload a new image or remove existing one
4. Click **"Update"**

### Deleting a Category

1. Click the **Delete** icon (trash) next to any category
2. Confirm deletion
3. Category will be removed (jobs in this category will remain but won't be accessible)

### Uploading Category Images

**Recommended Image Specs:**
- Size: 200x200 pixels (square)
- Format: PNG with transparent background (best) or JPG
- File size: Under 100KB
- Style: Simple, clear icons or illustrations

**Where to find images:**
- Flaticon: https://www.flaticon.com
- Icons8: https://icons8.com
- Freepik: https://www.freepik.com

**Upload Process:**
1. Edit category
2. Click "Choose File" under Category Image
3. Select your image
4. Wait for upload (you'll see a preview)
5. Click "Update"

## Adding Jobs to Categories

### Via Admin Panel

1. Go to: `http://localhost:3000/admin/dashboard/jobs`
2. Click **"Add Job"**
3. Fill in job details:
   - **Title**: Job title
   - **Category**: Select from dropdown (your categories appear here)
   - **Short Description**: Brief summary
   - **Full Description**: Complete job details
   - **Apply Link**: Application URL
   - **Last Date**: Application deadline
   - **Total Posts**: Number of vacancies
   - **Eligibility**: Educational requirements
   - **Fee Details**: Application fees
   - **Age Limit**: Age requirements
   - And more...

4. Click **"Create"**

### Job Fields Explained

**Basic Info:**
- Title: Job position name
- Slug: Auto-generated URL (e.g., "ssc-cgl-2024")
- Category: Which category this job belongs to
- Short Description: Appears in job listings
- Full Description: Complete details on job page

**Important Dates:**
- Start Date: When applications open
- Last Date: Application deadline
- Correction Date: Last date to edit application
- Exam Date: When exam will be held

**Links:**
- Apply Link: Direct application URL
- Notification Link: Official notification PDF
- Syllabus Link: Exam syllabus PDF

**Eligibility:**
- Eligibility: Educational qualifications
- Age Limit: Age requirements (e.g., "18-30 years")
- Total Posts: Number of vacancies

**Fees:**
- Fee General: For general category
- Fee OBC: For OBC category
- Fee SC/ST: For SC/ST category

**Additional:**
- Selection Process: Array of steps (e.g., ["Written Exam", "Interview"])
- Important Links: Additional resources
- Featured: Show in featured section
- Active: Show/hide job

## Category Display

### Homepage
Categories appear in a grid:
- **Mobile**: 3 columns
- **Tablet**: 4 columns
- **Desktop**: 6 columns

### Category Page
Each category has its own page at `/category/[slug]`:
- Example: `/category/govt-jobs`
- Shows all jobs in that category
- Sorted by newest first

## Tips for Best Results

### Category Organization
1. Keep category names short (1-2 words)
2. Use clear, descriptive names
3. Maintain consistent naming style
4. Order by importance (most popular first)

### Image Guidelines
1. Use consistent style across all categories
2. Keep images simple and recognizable
3. Use transparent backgrounds when possible
4. Optimize images before uploading (TinyPNG)
5. Test on mobile devices

### Color Scheme
Use distinct colors for each category:
- **Blue tones**: Official/Government (#1e3a8a, #0c4a6e)
- **Green**: Success/Approval (#15803d)
- **Red**: Important/Results (#b91c1c)
- **Orange**: Alerts/Updates (#ea580c)
- **Purple**: Corporate/Private (#6b21a8, #7c3aed)
- **Dark**: Academic/Serious (#0f172a)

### SEO Best Practices
1. Write descriptive category descriptions
2. Use relevant keywords in descriptions
3. Keep slugs short and meaningful
4. Add meta descriptions for category pages

## Troubleshooting

### Categories not showing on homepage
- Check if category is marked as "Active"
- Verify sort_order is set correctly
- Clear browser cache and refresh

### Images not displaying
- Check file size (should be under 100KB)
- Verify image format (PNG, JPG, or SVG)
- Check `/public/uploads` directory exists
- Try re-uploading the image

### Jobs not appearing in category
- Verify job's category_id matches the category
- Check if job is marked as "Active"
- Ensure job has a valid last_date

### Can't delete category
- Check if there are jobs linked to this category
- Consider marking as "Inactive" instead of deleting
- Or move jobs to another category first

## API Endpoints (for developers)

### Categories
- `GET /api/admin/categories` - List all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories` - Update category
- `DELETE /api/admin/categories?id=xxx` - Delete category

### Jobs
- `GET /api/admin/jobs` - List all jobs
- `POST /api/admin/jobs` - Create job
- `PUT /api/admin/jobs` - Update job
- `DELETE /api/admin/jobs?id=xxx` - Delete job

### Upload
- `POST /api/admin/upload` - Upload image file

## Database Structure

### Categories Collection
```javascript
{
  _id: ObjectId,
  name: "Govt. Jobs",
  slug: "govt-jobs",
  description: "Latest government job notifications",
  icon: "building-2",
  image_url: "/uploads/govt-jobs.png",
  button_color: "#1e3a8a",
  sort_order: 1,
  active: true,
  created_at: Date,
  updated_at: Date
}
```

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: "SSC CGL 2024",
  slug: "ssc-cgl-2024",
  category_id: ObjectId, // Links to category
  short_description: "...",
  full_description: "...",
  apply_link: "https://...",
  last_date: Date,
  // ... more fields
  active: true,
  featured: false,
  created_at: Date,
  updated_at: Date
}
```

## Support

For technical issues or questions:
1. Check this guide first
2. Review error messages in browser console
3. Check server logs in terminal
4. Verify MongoDB connection
5. Ensure all environment variables are set in `.env`

## Next Steps

1. ✅ Run seed script to create categories
2. ✅ Upload images for each category
3. ✅ Adjust colors as needed
4. ✅ Start adding jobs to categories
5. ✅ Test on different devices
6. ✅ Monitor user engagement
7. ✅ Add more categories as needed
