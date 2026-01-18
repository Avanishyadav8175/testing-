// Unified content type definitions for the CMS

export interface ContentType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  fields: ContentField[];
  description: string;
}

export interface ContentField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'richtext' | 'date' | 'number' | 'select' | 'multiselect' | 'image' | 'url' | 'boolean';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select/multiselect
  helpText?: string;
}

// Predefined content types with their specific fields
export const CONTENT_TYPES: ContentType[] = [
  {
    id: 'job',
    name: 'Job',
    slug: 'jobs',
    icon: '💼',
    description: 'Government and Private Job Postings',
    fields: [
      { id: 'title', name: 'title', type: 'text', label: 'Job Title', required: true, placeholder: 'e.g., SSC CGL Exam 2025' },
      { id: 'organization', name: 'organization', type: 'text', label: 'Organization/Department', required: true, placeholder: 'e.g., Staff Selection Commission' },
      { id: 'post_name', name: 'post_name', type: 'text', label: 'Post Name', placeholder: 'e.g., Combined Graduate Level' },
      { id: 'total_posts', name: 'total_posts', type: 'number', label: 'Total Posts/Vacancies', placeholder: 'e.g., 5000' },
      { id: 'location', name: 'location', type: 'text', label: 'Location', placeholder: 'e.g., All India' },
      { id: 'qualification', name: 'qualification', type: 'text', label: 'Qualification', placeholder: 'e.g., Graduate' },
      { id: 'age_limit', name: 'age_limit', type: 'text', label: 'Age Limit', placeholder: 'e.g., 18-30 years' },
      { id: 'salary', name: 'salary', type: 'text', label: 'Salary Range', placeholder: 'e.g., ₹35,000 - ₹50,000' },
      { id: 'application_fee', name: 'application_fee', type: 'text', label: 'Application Fee', placeholder: 'e.g., ₹100 (Gen), ₹0 (SC/ST)' },
      { id: 'start_date', name: 'start_date', type: 'date', label: 'Application Start Date', required: true },
      { id: 'last_date', name: 'last_date', type: 'date', label: 'Last Date to Apply', required: true },
      { id: 'exam_date', name: 'exam_date', type: 'date', label: 'Exam Date' },
      { id: 'apply_link', name: 'apply_link', type: 'url', label: 'Apply Online Link', placeholder: 'https://...' },
      { id: 'notification_pdf', name: 'notification_pdf', type: 'url', label: 'Official Notification PDF', placeholder: 'https://...' },
      { id: 'featured_image', name: 'featured_image', type: 'image', label: 'Featured Image' },
      { id: 'description', name: 'description', type: 'richtext', label: 'Full Description', required: true },
      { id: 'important_dates', name: 'important_dates', type: 'richtext', label: 'Important Dates' },
      { id: 'how_to_apply', name: 'how_to_apply', type: 'richtext', label: 'How to Apply' },
      { id: 'tags', name: 'tags', type: 'multiselect', label: 'Tags', options: ['Graduate', 'Post Graduate', 'All India', 'State Level', 'Permanent', 'Temporary', 'Contract'] },
    ]
  },
  {
    id: 'result',
    name: 'Result',
    slug: 'results',
    icon: '📊',
    description: 'Exam Results and Merit Lists',
    fields: [
      { id: 'title', name: 'title', type: 'text', label: 'Result Title', required: true, placeholder: 'e.g., SSC CGL Result 2025' },
      { id: 'organization', name: 'organization', type: 'text', label: 'Organization', required: true },
      { id: 'exam_name', name: 'exam_name', type: 'text', label: 'Exam Name', required: true },
      { id: 'result_date', name: 'result_date', type: 'date', label: 'Result Declared Date', required: true },
      { id: 'result_link', name: 'result_link', type: 'url', label: 'Check Result Link', required: true },
      { id: 'merit_list_pdf', name: 'merit_list_pdf', type: 'url', label: 'Merit List PDF' },
      { id: 'cutoff_marks', name: 'cutoff_marks', type: 'richtext', label: 'Cut-off Marks' },
      { id: 'featured_image', name: 'featured_image', type: 'image', label: 'Featured Image' },
      { id: 'description', name: 'description', type: 'richtext', label: 'Result Details', required: true },
      { id: 'how_to_check', name: 'how_to_check', type: 'richtext', label: 'How to Check Result' },
    ]
  },
  {
    id: 'admit-card',
    name: 'Admit Card',
    slug: 'admit-cards',
    icon: '🎫',
    description: 'Exam Admit Cards and Hall Tickets',
    fields: [
      { id: 'title', name: 'title', type: 'text', label: 'Admit Card Title', required: true, placeholder: 'e.g., SSC CGL Admit Card 2025' },
      { id: 'organization', name: 'organization', type: 'text', label: 'Organization', required: true },
      { id: 'exam_name', name: 'exam_name', type: 'text', label: 'Exam Name', required: true },
      { id: 'exam_date', name: 'exam_date', type: 'date', label: 'Exam Date', required: true },
      { id: 'release_date', name: 'release_date', type: 'date', label: 'Admit Card Release Date' },
      { id: 'download_link', name: 'download_link', type: 'url', label: 'Download Admit Card Link', required: true },
      { id: 'exam_centers', name: 'exam_centers', type: 'textarea', label: 'Exam Centers' },
      { id: 'featured_image', name: 'featured_image', type: 'image', label: 'Featured Image' },
      { id: 'description', name: 'description', type: 'richtext', label: 'Details', required: true },
      { id: 'instructions', name: 'instructions', type: 'richtext', label: 'Important Instructions' },
      { id: 'how_to_download', name: 'how_to_download', type: 'richtext', label: 'How to Download' },
    ]
  },
  {
    id: 'internship',
    name: 'Internship',
    slug: 'internships',
    icon: '🎓',
    description: 'Internship Opportunities',
    fields: [
      { id: 'title', name: 'title', type: 'text', label: 'Internship Title', required: true },
      { id: 'company', name: 'company', type: 'text', label: 'Company/Organization', required: true },
      { id: 'duration', name: 'duration', type: 'text', label: 'Duration', placeholder: 'e.g., 3 months' },
      { id: 'stipend', name: 'stipend', type: 'text', label: 'Stipend', placeholder: 'e.g., ₹10,000/month' },
      { id: 'location', name: 'location', type: 'text', label: 'Location' },
      { id: 'work_mode', name: 'work_mode', type: 'select', label: 'Work Mode', options: ['Work from Home', 'Office', 'Hybrid'] },
      { id: 'eligibility', name: 'eligibility', type: 'text', label: 'Eligibility' },
      { id: 'start_date', name: 'start_date', type: 'date', label: 'Start Date' },
      { id: 'last_date', name: 'last_date', type: 'date', label: 'Last Date to Apply', required: true },
      { id: 'apply_link', name: 'apply_link', type: 'url', label: 'Apply Link', required: true },
      { id: 'featured_image', name: 'featured_image', type: 'image', label: 'Featured Image' },
      { id: 'description', name: 'description', type: 'richtext', label: 'Description', required: true },
      { id: 'skills_required', name: 'skills_required', type: 'richtext', label: 'Skills Required' },
    ]
  },
  {
    id: 'scholarship',
    name: 'Scholarship',
    slug: 'scholarships',
    icon: '💰',
    description: 'Scholarship Programs',
    fields: [
      { id: 'title', name: 'title', type: 'text', label: 'Scholarship Name', required: true },
      { id: 'provider', name: 'provider', type: 'text', label: 'Provider/Organization', required: true },
      { id: 'amount', name: 'amount', type: 'text', label: 'Scholarship Amount', placeholder: 'e.g., ₹50,000' },
      { id: 'eligibility', name: 'eligibility', type: 'richtext', label: 'Eligibility Criteria', required: true },
      { id: 'level', name: 'level', type: 'select', label: 'Education Level', options: ['School', 'Undergraduate', 'Postgraduate', 'PhD', 'All Levels'] },
      { id: 'start_date', name: 'start_date', type: 'date', label: 'Application Start Date' },
      { id: 'last_date', name: 'last_date', type: 'date', label: 'Last Date to Apply', required: true },
      { id: 'apply_link', name: 'apply_link', type: 'url', label: 'Apply Link', required: true },
      { id: 'featured_image', name: 'featured_image', type: 'image', label: 'Featured Image' },
      { id: 'description', name: 'description', type: 'richtext', label: 'Description', required: true },
      { id: 'benefits', name: 'benefits', type: 'richtext', label: 'Benefits' },
      { id: 'how_to_apply', name: 'how_to_apply', type: 'richtext', label: 'How to Apply' },
    ]
  },
  {
    id: 'notification',
    name: 'Notification',
    slug: 'notifications',
    icon: '🔔',
    description: 'Important Notifications and Updates',
    fields: [
      { id: 'title', name: 'title', type: 'text', label: 'Notification Title', required: true },
      { id: 'organization', name: 'organization', type: 'text', label: 'Organization' },
      { id: 'notification_date', name: 'notification_date', type: 'date', label: 'Notification Date', required: true },
      { id: 'notification_type', name: 'notification_type', type: 'select', label: 'Type', options: ['Recruitment', 'Exam', 'Result', 'Admit Card', 'General', 'Important'] },
      { id: 'pdf_link', name: 'pdf_link', type: 'url', label: 'Official PDF Link' },
      { id: 'website_link', name: 'website_link', type: 'url', label: 'Official Website' },
      { id: 'featured_image', name: 'featured_image', type: 'image', label: 'Featured Image' },
      { id: 'description', name: 'description', type: 'richtext', label: 'Description', required: true },
    ]
  },
  {
    id: 'article',
    name: 'Article/Blog',
    slug: 'articles',
    icon: '📝',
    description: 'General Articles and Blog Posts',
    fields: [
      { id: 'title', name: 'title', type: 'text', label: 'Article Title', required: true },
      { id: 'author', name: 'author', type: 'text', label: 'Author Name' },
      { id: 'featured_image', name: 'featured_image', type: 'image', label: 'Featured Image' },
      { id: 'excerpt', name: 'excerpt', type: 'textarea', label: 'Excerpt/Summary', placeholder: 'Brief summary of the article' },
      { id: 'content', name: 'content', type: 'richtext', label: 'Content', required: true },
      { id: 'tags', name: 'tags', type: 'multiselect', label: 'Tags', options: ['Career Tips', 'Exam Preparation', 'Interview Tips', 'Study Material', 'News', 'Updates'] },
    ]
  },
  {
    id: 'blog',
    name: 'Blog',
    slug: 'blog',
    icon: '📝',
    description: 'Blog Posts and Articles',
    fields: [
      { id: 'title', name: 'title', type: 'text', label: 'Blog Title', required: true },
      { id: 'author', name: 'author', type: 'text', label: 'Author Name', placeholder: 'Rozgartap Team' },
      { id: 'featured_image', name: 'featured_image', type: 'image', label: 'Featured Image' },
      { id: 'excerpt', name: 'excerpt', type: 'textarea', label: 'Excerpt/Summary', placeholder: 'Brief summary of the blog post' },
      { id: 'content', name: 'content', type: 'richtext', label: 'Content', required: true },
      { id: 'tags', name: 'tags', type: 'multiselect', label: 'Tags', options: ['career', 'jobs', 'government jobs', 'private jobs', 'internships', 'scholarships', 'exam preparation', 'career tips', 'news', 'updates'] },
    ]
  }
];

// Get content type by ID
export function getContentType(id: string): ContentType | undefined {
  return CONTENT_TYPES.find(ct => ct.id === id);
}

// Get content type by slug
export function getContentTypeBySlug(slug: string): ContentType | undefined {
  return CONTENT_TYPES.find(ct => ct.slug === slug);
}