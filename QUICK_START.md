# Quick Start Guide - Job Portal Admin

## 🚀 Initial Setup (One-time)

### Step 1: Create Categories
```bash
node scripts/seed-categories.js
```

This creates 8 categories:
1. Govt. Jobs
2. Admit Card
3. Result
4. Notification
5. Private Jobs
6. Internships
7. Scholarships
8. Science Corner

### Step 2: Upload Category Images
1. Go to: http://localhost:3000/admin/dashboard/categories
2. Click edit (pencil icon) on each category
3. Upload an image (200x200px recommended)
4. Click "Update"

### Step 3: Start Adding Jobs
1. Go to: http://localhost:3000/admin/dashboard/jobs
2. Click "Add Job"
3. Select a category from dropdown
4. Fill in job details
5. Click "Create"

## 📋 Daily Operations

### Adding a New Job
1. Admin → Jobs → "Add Job"
2. Fill required fields:
   - Title
   - Category (select from dropdown)
   - Short Description
   - Apply Link
   - Last Date
3. Optional fields:
   - Full Description
   - Notification Link
   - Syllabus Link
   - Fee Details
   - Eligibility
   - Total Posts
4. Toggle "Featured" for homepage display
5. Click "Create"

### Editing a Job
1. Admin → Jobs
2. Click edit icon (pencil)
3. Update fields
4. Click "Update"

### Managing Categories
1. Admin → Categories
2. Add/Edit/Delete categories
3. Upload images
4. Change colors
5. Reorder (sort_order)

### Managing Banners
1. Admin → Banners
2. Add/Edit/Delete banners
3. Upload banner images (recommended: 1200x400px)
4. Set links
5. Reorder

## 🎨 Customization

### Category Colors
Edit category → Change "Button Color" field
- Use color picker or enter hex code
- Examples: #1e3a8a (blue), #15803d (green), #b91c1c (red)

### Category Images
- Size: 200x200px (square)
- Format: PNG (transparent) or JPG
- Style: Simple, clear icons
- Upload via category edit form

### Banner Images
- Size: 1200x400px (landscape)
- Format: JPG or PNG
- Style: Eye-catching, promotional
- Upload via banner form

## 📊 Content Management

### Job Categories Explained

**Govt. Jobs**: Government sector positions
- Central Government jobs
- State Government jobs
- PSU jobs
- Railway jobs
- Banking jobs

**Admit Card**: Exam hall tickets
- Download links
- Exam dates
- Instructions

**Result**: Exam results and scorecards
- Result links
- Cut-off marks
- Merit lists

**Notification**: Important announcements
- Exam notifications
- Job notifications
- Updates and corrections

**Private Jobs**: Private sector opportunities
- IT jobs
- Corporate jobs
- Startup jobs
- Freelance opportunities

**Internships**: Training programs
- Summer internships
- Winter internships
- Full-time internships
- Stipend details

**Scholarships**: Financial aid programs
- Government scholarships
- Private scholarships
- Merit-based
- Need-based

**Science Corner**: Science & tech updates
- Research opportunities
- Science news
- Technology updates
- Innovation programs

## 🔧 Common Tasks

### Make a Job Featured
1. Edit job
2. Toggle "Featured" switch ON
3. Save
4. Job appears in "Featured Jobs" section on homepage

### Hide a Job (without deleting)
1. Edit job
2. Toggle "Active" switch OFF
3. Save
4. Job hidden from public but remains in database

### Change Category Order
1. Edit category
2. Change "Sort Order" number
3. Lower numbers appear first (1, 2, 3...)
4. Save

### Add Important Links to Job
1. Edit job
2. Scroll to "Important Links" section
3. Add title and URL
4. Can add multiple links
5. Save

## 📱 Testing

### Check Homepage
- Visit: http://localhost:3000
- Verify banner displays
- Check categories grid
- Test category links

### Check Category Page
- Click any category
- Verify jobs display
- Test job links
- Check filters work

### Check Job Page
- Click any job
- Verify all details display
- Test apply link
- Check responsive design

## ⚠️ Important Notes

1. **Always set Last Date**: Jobs without last date may not display properly
2. **Use Active toggle**: Don't delete jobs, mark as inactive instead
3. **Test links**: Verify all external links work before publishing
4. **Mobile first**: Always check on mobile devices
5. **SEO matters**: Write good descriptions for better search rankings

## 🆘 Troubleshooting

**Categories not showing?**
- Check "Active" is ON
- Verify sort_order is set
- Clear browser cache

**Jobs not in category?**
- Check category is selected
- Verify job is "Active"
- Check last_date is in future

**Images not loading?**
- Check file size (under 100KB)
- Verify format (PNG/JPG)
- Try re-uploading

**Can't login to admin?**
- Check credentials in .env
- Verify MongoDB connection
- Check browser console for errors

## 📞 Support

Need help? Check:
1. ADMIN_GUIDE.md (detailed guide)
2. CATEGORY_SYSTEM.md (category system docs)
3. Browser console (F12) for errors
4. Server terminal for logs

---

**Pro Tip**: Bookmark these pages for quick access:
- Admin Dashboard: http://localhost:3000/admin/dashboard
- Categories: http://localhost:3000/admin/dashboard/categories
- Jobs: http://localhost:3000/admin/dashboard/jobs
- Banners: http://localhost:3000/admin/dashboard/banners
