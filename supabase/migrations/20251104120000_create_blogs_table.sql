
-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text DEFAULT '',
  author_id uuid REFERENCES admins(id),
  published_at timestamptz,
  active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blogs
CREATE POLICY "Anyone can view active blogs"
  ON blogs FOR SELECT
  USING (active = true AND published_at <= now());

CREATE POLICY "Authenticated users can manage blogs"
  ON blogs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_active_published ON blogs(active, published_at);
