/*
  # Job Portal Database Schema

  1. New Tables
    - `admins` - Admin users with authentication
    - `categories` - Job categories (Govt Jobs, Private Jobs, etc.)
    - `jobs` - Job listings with full details
    - `banners` - Homepage banners
    - `settings` - Site-wide settings

  2. Security
    - Enable RLS on all tables
    - Public can read active content
    - Only authenticated admins can modify

  3. Indexes
    - Optimized for slug-based lookups
    - Fast category and status filtering
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'editor',
  created_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT 'briefcase',
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  short_description text DEFAULT '',
  full_description text DEFAULT '',
  apply_link text DEFAULT '',
  notification_link text DEFAULT '',
  syllabus_link text DEFAULT '',
  start_date date,
  last_date date,
  correction_date date,
  exam_date date,
  eligibility text DEFAULT '',
  fee_general integer DEFAULT 0,
  fee_obc integer DEFAULT 0,
  fee_sc_st integer DEFAULT 0,
  age_limit text DEFAULT '',
  total_posts integer DEFAULT 0,
  selection_process jsonb DEFAULT '[]'::jsonb,
  important_links jsonb DEFAULT '[]'::jsonb,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  views integer DEFAULT 0,
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create banners table
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text DEFAULT '',
  image_url text DEFAULT '',
  link text DEFAULT '',
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text DEFAULT 'Job Portal',
  site_description text DEFAULT 'Find your dream job',
  logo_url text DEFAULT '',
  contact_email text DEFAULT '',
  contact_phone text DEFAULT '',
  facebook_url text DEFAULT '',
  twitter_url text DEFAULT '',
  instagram_url text DEFAULT '',
  youtube_url text DEFAULT '',
  footer_text text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for jobs
CREATE POLICY "Anyone can view active jobs"
  ON jobs FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can manage jobs"
  ON jobs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for banners
CREATE POLICY "Anyone can view active banners"
  ON banners FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can manage banners"
  ON banners FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for settings
CREATE POLICY "Anyone can view settings"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update settings"
  ON settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(active);
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category_id);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(active);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(featured);
CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(active);

-- Insert default categories
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
  ('Government Jobs', 'government-jobs', 'Latest government job notifications', 'landmark', 1),
  ('Private Jobs', 'private-jobs', 'Private sector job openings', 'briefcase', 2),
  ('Admit Card', 'admit-card', 'Download admit cards', 'file-text', 3),
  ('Result', 'result', 'Check latest results', 'award', 4),
  ('Answer Key', 'answer-key', 'Download answer keys', 'key', 5),
  ('Syllabus', 'syllabus', 'Exam syllabus and patterns', 'book-open', 6),
  ('Admission', 'admission', 'College admissions', 'graduation-cap', 7),
  ('Scholarship', 'scholarship', 'Scholarship programs', 'gift', 8)
ON CONFLICT (slug) DO NOTHING;

-- Insert default settings
INSERT INTO settings (site_name, site_description, footer_text)
VALUES ('Job Portal', 'Find your dream job - Latest Government & Private Jobs', '© 2025 Job Portal. All rights reserved.');