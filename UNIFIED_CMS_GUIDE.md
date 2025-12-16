# Unified Content Management System (CMS) Guide

## 🎯 Overview

The new **Unified CMS** replaces the separate Jobs and Posts systems with a single, flexible content management system that can handle:

- 💼 **Jobs** (Government & Private)
- 📊 **Results** (Exam Results)
- 🎫 **Admit Cards** (Hall Tickets)
- 🎓 **Internships**
- 💰 **Scholarships**
- 🔔 **Notifications**
- 📝 **Articles/Blogs**
- ➕ **Any Custom Content Type**

## ✨ Key Features

### 1. **Dynamic Form Fields**
- Each content type has its own specific fields
- Fields automatically render based on content type
- Support for multiple field types:
  - Text, Textarea, Rich Text Editor
  - Date, Number, URL
  - Select, Multi-select
  - Image Upload with CDN
  - Boolean (Checkboxes)

### 2. **Image Upload with CDN Support**
- Built-in image upload functionality
- Local storage (default)
- Easy integration with Cloudinary, AWS S3, or any CDN
- Automatic image optimization

### 3. **SEO Optimization**
- SEO Title, Description, Keywords for each content
- Auto-generated slugs
- Meta tags support
- Structured data ready

### 4. **Flexible Content Types**
- Pre-defined content types with specific fields
- Easy to add new content types
- Each type has its own icon and description

### 5. **Unified Management**
- Single interface for all content
- Filter by content type
- Search across all content
- Bulk operations support

## 📋 Content Types

### 1. Job (💼)
**Fields:**
- Title, Organization, Post Name
- Total Posts/Vacancies
- Location, Qualification, Age Limit
- Salary Range, Application Fee
- Start Date, Last Date, Exam Date
- Apply Link, Notification PDF
- Featured Image
- Full Description
- Important Dates, How to Apply
- Tags (Graduate, All India, etc.)

### 2. Result (📊)
**Fields:**
- Title, Organization, Exam Name
- Result Date
- Result Link, Merit List PDF
- Cut-off Marks
- Featured Image
- Result Details
- How to Check Result

### 3. Admit Card (🎫)
**Fields:**
- Title, Organization, Exam Name
- Exam Date, Release Date
- Download Link
- Exam Centers
- Featured Image
- Details, Instructions
- How to Download

### 4. Internship (🎓)
**Fields:**
- Title, Company
- Duration, Stipend
- Location, Work Mode
- Eligibility
- Start Date, Last Date
- Apply Link
- Featured Image
- Description, Skills Required

### 5. Scholarship (💰)
**Fields:**
- Title, Provider
- Amount, Eligibility
- Education Level
- Start Date, Last Date
- Apply Link
- Featured Image
- Description, Benefits
- How to Apply

### 6. Notification (🔔)
**Fields:**
- Title, Organization
- Notification Date, Type
- PDF Link, Website Link
- Featured Image
- Description

### 7. Article/Blog (📝)
**Fields:**
- Title, Author
- Featured Image
- Excerpt, Content
- Tags

## 🚀 How to Use

### Creating Content

1. **Access Admin Panel**
   ```
   URL: http://localhost:3000/admin/dashboard/content
   ```

2. **Click "Create Content"**

3. **Select Content Type**
   - Choose from: Job, Result, Admit Card, Internship, Scholarship, Notification, or Article

4. **Fill in the Form**
   - Required fields are marked with *
   - Title and Slug are mandatory
   - Slug auto-generates from title
   - Upload images using the Upload button

5. **SEO Settings**
   - Add SEO Title (defaults to main title)
   - Add SEO Description
   - Add SEO Keywords (comma-separated)

6. **Set Status**
   - ✅ Active: Publish the content
   - ⭐ Featured: Mark as featured content

7. **Save**
   - Click "Create Content" to publish

### Managing Content

**View All Content:**
```
/admin/dashboard/content
```

**Filter by Type:**
- Click on content type buttons to filter
- Use search to find specific content

**Actions:**
- 👁️ **View**: See published content
- ✏️ **Edit**: Modify content
- 🗑️ **Delete**: Remove content

## 🖼️ Image Upload

### Local Storage (Default)
Images are stored in `/public/uploads/`

### CDN Integration (Cloudinary)

1. **Install Cloudinary:**
   ```bash
   npm install cloudinary
   ```

2. **Add Environment Variables:**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Update Upload API:**
   - Uncomment Cloudinary code in `/app/api/admin/upload-image/route.ts`
   - Comment out local storage code

### AWS S3 Integration

1. **Install AWS SDK:**
   ```bash
   npm install @aws-sdk/client-s3
   ```

2. **Add Environment Variables:**
   ```env
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   AWS_S3_BUCKET=your_bucket_name
   ```

3. **Update Upload API** with S3 upload logic

## 📊 Database Structure

### Content Collection
```javascript
{
  _id: ObjectId,
  content_type: 'job' | 'result' | 'admit-card' | 'internship' | 'scholarship' | 'notification' | 'article',
  category_id: ObjectId | null,
  title: String,
  slug: String (unique),
  data: {
    // Dynamic fields based on content type
    organization: String,
    last_date: Date,
    apply_link: String,
    featured_image: String,
    description: String,
    // ... other fields
  },
  featured: Boolean,
  active: Boolean,
  views: Number,
  seo_title: String,
  seo_description: String,
  seo_keywords: String,
  created_at: Date,
  updated_at: Date
}
```

## 🔧 Adding New Content Types

1. **Edit `/lib/content-types.ts`**

2. **Add New Content Type:**
```typescript
{
  id: 'custom-type',
  name: 'Custom Type',
  slug: 'custom-types',
  icon: '🎯',
  description: 'Description of custom type',
  fields: [
    {
      id: 'field1',
      name: 'field1',
      type: 'text',
      label: 'Field Label',
      required: true,
      placeholder: 'Enter value...'
    },
    // Add more fields...
  ]
}
```

3. **Available Field Types:**
- `text` - Single line text
- `textarea` - Multi-line text
- `richtext` - WYSIWYG editor
- `date` - Date picker
- `number` - Number input
- `url` - URL input
- `select` - Dropdown (single choice)
- `multiselect` - Checkboxes (multiple choice)
- `image` - Image upload
- `boolean` - Checkbox

4. **Save and Restart**
   - New content type will appear automatically

## 🎨 Frontend Display

### Display Content on Frontend

```typescript
// Fetch content by type
const contentCol = await getCollection('content');
const jobs = await contentCol
  .find({ content_type: 'job', active: true })
  .sort({ created_at: -1 })
  .toArray();

// Access dynamic fields
jobs.forEach(job => {
  console.log(job.title);
  console.log(job.data.organization);
  console.log(job.data.last_date);
  console.log(job.data.apply_link);
});
```

### Create Dynamic Pages

```typescript
// app/[contentType]/[slug]/page.tsx
export default async function ContentPage({ params }) {
  const contentCol = await getCollection('content');
  const content = await contentCol.findOne({ slug: params.slug });
  
  return (
    <div>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.data.description }} />
      {/* Render other fields */}
    </div>
  );
}
```

## 🔐 Security

- ✅ Admin authentication required
- ✅ File type validation for uploads
- ✅ File size limits (5MB default)
- ✅ SQL injection protection
- ✅ XSS protection in rich text editor

## 📈 Benefits

1. **Single Source of Truth**: All content in one place
2. **Consistent Interface**: Same UI for all content types
3. **Easy to Extend**: Add new content types without code changes
4. **SEO Optimized**: Built-in SEO fields for all content
5. **Image Management**: Integrated image upload with CDN support
6. **Type Safety**: TypeScript definitions for all content types
7. **Flexible**: Adapt to any content structure

## 🆚 Old vs New System

### Old System
- ❌ Separate Jobs and Posts sections
- ❌ Different forms for each type
- ❌ Duplicate code
- ❌ Hard to add new types
- ❌ Inconsistent data structure

### New System
- ✅ Unified Content Management
- ✅ Dynamic forms based on type
- ✅ Single codebase
- ✅ Easy to extend
- ✅ Consistent data structure
- ✅ Better SEO
- ✅ Image CDN support

## 📞 Support

For issues or questions:
1. Check this guide
2. Review code comments
3. Check API responses in browser console
4. Verify database connection

## 🎉 Summary

The Unified CMS provides a powerful, flexible, and scalable solution for managing all types of content on your job portal. It's designed to be:

- **Easy to use** for admins
- **Easy to extend** for developers
- **SEO optimized** for search engines
- **Scalable** for growing content needs

Start creating content at: `/admin/dashboard/content`
