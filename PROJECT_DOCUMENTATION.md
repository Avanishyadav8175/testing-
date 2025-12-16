# Job Portal - Complete Documentation

## Overview

A fully-featured, production-ready job portal built with Next.js 13, Supabase, and TypeScript. Similar to RozgarTap/Sarkari Result style websites with complete admin panel and SEO optimization.

## Features

### Public Website
- **Dynamic Homepage** with banner carousel, categories, featured jobs, and latest jobs
- **Category Pages** - Browse jobs by category (Govt Jobs, Private Jobs, Admit Card, Result, etc.)
- **Job Detail Pages** - Full job information with SEO optimization
- **Search Functionality** - Real-time search across all jobs
- **Responsive Design** - Mobile-first design that works on all devices
- **SEO Optimized** - Meta tags, dynamic slugs, Open Graph tags

### Admin Panel (`/admin/login`)
- **Dashboard** - Statistics and overview
- **Job Management** - Create, edit, delete jobs with full details
- **Category Management** - Manage job categories
- **Banner Management** - Control homepage banners
- **Settings** - Site-wide configuration
- **Authentication** - Secure login system

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database)
- **UI Components**: shadcn/ui components
- **Icons**: Lucide React
- **Authentication**: Supabase Auth

## Database Schema

### Tables

1. **admins** - Admin users
2. **categories** - Job categories
3. **jobs** - Job listings with full details
4. **banners** - Homepage banners
5. **settings** - Site settings

## Getting Started

### 1. Admin Login

**URL**: `/admin/login`

**Default Credentials**:
- Email: `admin@jobportal.com`
- Password: You need to set this up via Supabase Auth

**To create an admin user**:
1. Go to Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add User"
4. Enter email: `admin@jobportal.com`
5. Set a secure password
6. Click "Create User"

### 2. Add Categories

1. Login to admin panel
2. Go to **Categories** section
3. Click "Add Category"
4. Fill in:
   - Name: e.g., "Government Jobs"
   - Slug: auto-generated (e.g., "government-jobs")
   - Description: Brief description
   - Icon: lucide icon name (e.g., "briefcase", "landmark")
   - Sort Order: Number for ordering
5. Click "Create"

**Default Categories** (already added):
- Government Jobs
- Private Jobs
- Admit Card
- Result
- Answer Key
- Syllabus
- Admission
- Scholarship

### 3. Add Banners

1. Go to **Banners** section
2. Click "Add Banner"
3. Fill in:
   - Title: Main heading
   - Subtitle: Supporting text
   - Image URL: Banner image URL (optional)
   - Link: Where to navigate on click
   - Sort Order: Display order
4. Click "Create"

### 4. Add Jobs

1. Go to **Jobs** section
2. Click "Add Job"
3. Fill in all details:

**Basic Information**:
- Job Title
- URL Slug (auto-generated from title)
- Category
- Short Description
- Full Description

**Important Links**:
- Apply Link
- Notification PDF Link
- Syllabus Link

**Important Dates**:
- Start Date
- Last Date (deadline)
- Correction Date
- Exam Date

**Eligibility & Fees**:
- Eligibility criteria
- Age Limit
- Application fees (General, OBC, SC/ST)
- Total Posts

**SEO Settings**:
- Meta Title
- Meta Description

**Status**:
- Active (published/unpublished)
- Featured (show on homepage)

4. Click "Create Job"

## Public URLs

- **Homepage**: `/`
- **Category Page**: `/category/{category-slug}`
  - Example: `/category/government-jobs`
- **Job Detail**: `/job/{job-slug}`
  - Example: `/job/ssc-chsl-2025-combined-higher-secondary-level-examination`
- **Search**: `/search`

## SEO Features

### 1. Dynamic Meta Tags
Every page has unique meta title and description:
```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

### 2. SEO-Friendly URLs
- Clean slugs: `/job/ssc-chsl-2025` instead of `/job?id=123`
- Auto-generated from titles
- Lowercase with hyphens

### 3. Open Graph Tags
Social media sharing optimization:
```typescript
openGraph: {
  title: 'Job Title',
  description: 'Job Description',
  type: 'article',
}
```

### 4. Incremental Static Regeneration (ISR)
Pages auto-rebuild every 60 seconds:
```typescript
export const revalidate = 60;
```

## Customization

### 1. Change Site Name
Update in `components/layout/header.tsx` and `components/layout/footer.tsx`

### 2. Change Colors
Edit `app/globals.css` - modify CSS variables:
```css
--primary: 0 0% 9%;
--secondary: 0 0% 96.1%;
```

### 3. Add More Categories
Admin Panel > Categories > Add Category

### 4. Modify Job Fields
Edit:
- Database: `supabase/migrations/create_job_portal_schema.sql`
- Type: `lib/supabase.ts`
- Form: `app/admin/dashboard/jobs/[id]/page.tsx`
- Display: `app/job/[slug]/page.tsx`

## Sample Data

The project includes 3 sample jobs:
1. SSC CHSL 2025
2. UPSC Civil Services 2026
3. RRB NTPC Graduate Level 2025

3 sample banners are also included.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Other Platforms

Works on any Node.js hosting:
- Netlify
- Railway
- Render
- AWS Amplify

## Performance

- **Fast Load Times**: Static generation + ISR
- **Optimized Images**: Next.js Image component
- **Code Splitting**: Automatic by Next.js
- **Lazy Loading**: Components load on demand

## Security

- **Row Level Security (RLS)**: All tables protected
- **Authentication**: Supabase Auth
- **Input Validation**: Client + server validation
- **SQL Injection Protection**: Parameterized queries

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## File Structure

```
project/
├── app/
│   ├── admin/              # Admin panel
│   │   ├── login/          # Login page
│   │   └── dashboard/      # Admin dashboard
│   ├── category/[slug]/    # Category pages
│   ├── job/[slug]/         # Job detail pages
│   ├── search/             # Search page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── home/               # Homepage components
│   ├── layout/             # Header, Footer
│   └── ui/                 # UI components (shadcn)
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── auth.ts             # Auth utilities
│   └── slug.ts             # Helper functions
└── supabase/
    └── migrations/         # Database migrations
```

## Maintenance

### Regular Tasks
1. **Monitor Jobs**: Remove expired jobs
2. **Update Categories**: Add new as needed
3. **Check Analytics**: Monitor popular jobs
4. **Backup Database**: Regular Supabase backups

### Updates
```bash
npm update           # Update dependencies
npm run build        # Test build
npm run typecheck    # Check types
```

## Troubleshooting

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues
- Check `.env` file
- Verify Supabase project is active
- Check RLS policies

### Admin Login Issues
- Verify user exists in Supabase Auth
- Check email/password
- Clear browser cache

## Support

For issues or questions:
1. Check this documentation
2. Review Supabase docs: https://supabase.com/docs
3. Review Next.js docs: https://nextjs.org/docs

## License

This project is provided as-is for educational and commercial use.

---

**Built with ❤️ using Next.js + Supabase**
