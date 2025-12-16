// Dynamic post schemas for different category types

export type PostField = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'url' | 'number' | 'select' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  description?: string;
};

export type CategorySchema = {
  categorySlug: string;
  categoryName: string;
  fields: PostField[];
  seoFields: string[]; // Fields to use for SEO
};

// Define schemas for each category type
export const POST_SCHEMAS: Record<string, CategorySchema> = {
  'govt-jobs': {
    categorySlug: 'govt-jobs',
    categoryName: 'Government Jobs',
    fields: [
      { name: 'title', label: 'Job Title', type: 'text', required: true, placeholder: 'SSC CGL 2024' },
      { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Staff Selection Commission' },
      { name: 'short_description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'total_posts', label: 'Total Posts', type: 'number', placeholder: '500' },
      { name: 'qualification', label: 'Qualification', type: 'text', placeholder: 'Graduate' },
      { name: 'age_limit', label: 'Age Limit', type: 'text', placeholder: '18-30 years' },
      { name: 'application_fee', label: 'Application Fee', type: 'text', placeholder: 'Gen: 100, OBC: 50, SC/ST: Free' },
      { name: 'salary', label: 'Salary', type: 'text', placeholder: '₹25,000 - ₹50,000' },
      { name: 'start_date', label: 'Application Start Date', type: 'date' },
      { name: 'last_date', label: 'Last Date', type: 'date', required: true },
      { name: 'exam_date', label: 'Exam Date', type: 'date' },
      { name: 'apply_link', label: 'Apply Online Link', type: 'url', required: true },
      { name: 'notification_pdf', label: 'Notification PDF', type: 'url' },
      { name: 'syllabus_pdf', label: 'Syllabus PDF', type: 'url' },
      { name: 'full_description', label: 'Full Description', type: 'textarea' },
    ],
    seoFields: ['title', 'organization', 'short_description', 'qualification'],
  },

  'admit-card': {
    categorySlug: 'admit-card',
    categoryName: 'Admit Card',
    fields: [
      { name: 'title', label: 'Exam Name', type: 'text', required: true, placeholder: 'SSC CGL Admit Card 2024' },
      { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Staff Selection Commission' },
      { name: 'short_description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'exam_date', label: 'Exam Date', type: 'date', required: true },
      { name: 'exam_time', label: 'Exam Time', type: 'text', placeholder: '10:00 AM - 1:00 PM' },
      { name: 'exam_mode', label: 'Exam Mode', type: 'select', options: ['Online', 'Offline', 'Both'] },
      { name: 'download_link', label: 'Download Admit Card Link', type: 'url', required: true },
      { name: 'release_date', label: 'Release Date', type: 'date' },
      { name: 'instructions', label: 'Important Instructions', type: 'textarea' },
      { name: 'documents_required', label: 'Documents Required', type: 'textarea', placeholder: 'ID Proof, Photo, etc.' },
      { name: 'notification_pdf', label: 'Notification PDF', type: 'url' },
      { name: 'full_description', label: 'Full Description', type: 'textarea' },
    ],
    seoFields: ['title', 'organization', 'exam_date', 'short_description'],
  },

  'result': {
    categorySlug: 'result',
    categoryName: 'Result',
    fields: [
      { name: 'title', label: 'Result Title', type: 'text', required: true, placeholder: 'SSC CGL Result 2024' },
      { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Staff Selection Commission' },
      { name: 'short_description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'result_type', label: 'Result Type', type: 'select', options: ['Final Result', 'Preliminary Result', 'Mains Result', 'Cut-off Marks', 'Merit List'] },
      { name: 'exam_name', label: 'Exam Name', type: 'text', placeholder: 'Combined Graduate Level Exam' },
      { name: 'exam_date', label: 'Exam Date', type: 'date' },
      { name: 'result_date', label: 'Result Declaration Date', type: 'date', required: true },
      { name: 'check_result_link', label: 'Check Result Link', type: 'url', required: true },
      { name: 'cutoff_link', label: 'Cut-off Marks Link', type: 'url' },
      { name: 'merit_list_link', label: 'Merit List Link', type: 'url' },
      { name: 'total_candidates', label: 'Total Candidates', type: 'number' },
      { name: 'qualified_candidates', label: 'Qualified Candidates', type: 'number' },
      { name: 'full_description', label: 'Full Description', type: 'textarea' },
    ],
    seoFields: ['title', 'organization', 'result_type', 'exam_name'],
  },

  'notification': {
    categorySlug: 'notification',
    categoryName: 'Notification',
    fields: [
      { name: 'title', label: 'Notification Title', type: 'text', required: true, placeholder: 'Important Update: SSC CGL 2024' },
      { name: 'organization', label: 'Organization', type: 'text', required: true },
      { name: 'short_description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'notification_type', label: 'Type', type: 'select', options: ['Exam Notification', 'Recruitment', 'Correction Window', 'Date Extension', 'Important Update', 'Cancellation'] },
      { name: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
      { name: 'publish_date', label: 'Publish Date', type: 'date', required: true },
      { name: 'last_date', label: 'Last Date (if applicable)', type: 'date' },
      { name: 'notification_pdf', label: 'Notification PDF', type: 'url', required: true },
      { name: 'official_website', label: 'Official Website', type: 'url' },
      { name: 'full_description', label: 'Full Description', type: 'textarea' },
    ],
    seoFields: ['title', 'organization', 'notification_type', 'short_description'],
  },

  'private-jobs': {
    categorySlug: 'private-jobs',
    categoryName: 'Private Jobs',
    fields: [
      { name: 'title', label: 'Job Title', type: 'text', required: true, placeholder: 'Software Engineer' },
      { name: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'Tech Corp India' },
      { name: 'short_description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'job_type', label: 'Job Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Freelance'] },
      { name: 'experience', label: 'Experience Required', type: 'text', placeholder: '2-5 years' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Bangalore, Mumbai, Remote' },
      { name: 'salary', label: 'Salary Range', type: 'text', placeholder: '₹5-10 LPA' },
      { name: 'qualification', label: 'Qualification', type: 'text', placeholder: 'B.Tech/MCA' },
      { name: 'skills', label: 'Skills Required', type: 'textarea', placeholder: 'Java, Python, React' },
      { name: 'total_openings', label: 'Total Openings', type: 'number' },
      { name: 'last_date', label: 'Last Date to Apply', type: 'date', required: true },
      { name: 'apply_link', label: 'Apply Link', type: 'url', required: true },
      { name: 'company_website', label: 'Company Website', type: 'url' },
      { name: 'full_description', label: 'Full Job Description', type: 'textarea' },
    ],
    seoFields: ['title', 'company', 'location', 'job_type', 'experience'],
  },

  'internships': {
    categorySlug: 'internships',
    categoryName: 'Internships',
    fields: [
      { name: 'title', label: 'Internship Title', type: 'text', required: true, placeholder: 'Summer Internship - Data Science' },
      { name: 'company', label: 'Company/Organization', type: 'text', required: true },
      { name: 'short_description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'internship_type', label: 'Type', type: 'select', options: ['Paid', 'Unpaid', 'Part-time', 'Full-time'] },
      { name: 'duration', label: 'Duration', type: 'text', placeholder: '3 months' },
      { name: 'stipend', label: 'Stipend', type: 'text', placeholder: '₹10,000/month' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Remote/Bangalore' },
      { name: 'eligibility', label: 'Eligibility', type: 'text', placeholder: 'B.Tech/BCA students' },
      { name: 'skills', label: 'Skills Required', type: 'textarea' },
      { name: 'start_date', label: 'Start Date', type: 'date' },
      { name: 'last_date', label: 'Last Date to Apply', type: 'date', required: true },
      { name: 'apply_link', label: 'Apply Link', type: 'url', required: true },
      { name: 'full_description', label: 'Full Description', type: 'textarea' },
    ],
    seoFields: ['title', 'company', 'internship_type', 'location', 'stipend'],
  },

  'scholarships': {
    categorySlug: 'scholarships',
    categoryName: 'Scholarships',
    fields: [
      { name: 'title', label: 'Scholarship Name', type: 'text', required: true, placeholder: 'National Merit Scholarship 2024' },
      { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Ministry of Education' },
      { name: 'short_description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'scholarship_type', label: 'Type', type: 'select', options: ['Merit-based', 'Need-based', 'Sports', 'Minority', 'SC/ST/OBC', 'Girl Child'] },
      { name: 'amount', label: 'Scholarship Amount', type: 'text', placeholder: '₹50,000 per year' },
      { name: 'eligibility', label: 'Eligibility', type: 'textarea', placeholder: 'Class 12 passed with 75%+' },
      { name: 'course_level', label: 'Course Level', type: 'select', options: ['School', 'Undergraduate', 'Postgraduate', 'PhD', 'All'] },
      { name: 'total_scholarships', label: 'Total Scholarships', type: 'number' },
      { name: 'start_date', label: 'Application Start Date', type: 'date' },
      { name: 'last_date', label: 'Last Date', type: 'date', required: true },
      { name: 'apply_link', label: 'Apply Link', type: 'url', required: true },
      { name: 'notification_pdf', label: 'Notification PDF', type: 'url' },
      { name: 'full_description', label: 'Full Description', type: 'textarea' },
    ],
    seoFields: ['title', 'organization', 'scholarship_type', 'amount', 'eligibility'],
  },

  'science-corner': {
    categorySlug: 'science-corner',
    categoryName: 'Science Corner',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'ISRO Recruitment 2024' },
      { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Indian Space Research Organisation' },
      { name: 'short_description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'post_type', label: 'Type', type: 'select', options: ['Research Position', 'Fellowship', 'Project', 'Workshop', 'Conference', 'Competition', 'News'] },
      { name: 'field', label: 'Field', type: 'text', placeholder: 'Physics, Chemistry, Biology, etc.' },
      { name: 'eligibility', label: 'Eligibility', type: 'textarea' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'start_date', label: 'Start Date', type: 'date' },
      { name: 'last_date', label: 'Last Date', type: 'date' },
      { name: 'apply_link', label: 'Apply/More Info Link', type: 'url', required: true },
      { name: 'notification_pdf', label: 'Notification PDF', type: 'url' },
      { name: 'full_description', label: 'Full Description', type: 'textarea' },
    ],
    seoFields: ['title', 'organization', 'post_type', 'field'],
  },
};

// Get schema for a category
export function getSchemaForCategory(categorySlug: string): CategorySchema | null {
  return POST_SCHEMAS[categorySlug] || null;
}

// Get all available schemas
export function getAllSchemas(): CategorySchema[] {
  return Object.values(POST_SCHEMAS);
}
