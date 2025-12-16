import { Collection, ObjectId } from 'mongodb';
import connectToDatabase from './mongodb';

export type Category = {
  _id?: ObjectId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image_url?: string;
  button_color?: string;
  sort_order: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Job = {
  _id?: ObjectId;
  title: string;
  slug: string;
  category_id: ObjectId;
  short_description: string;
  full_description: string;
  apply_link: string;
  notification_link: string;
  syllabus_link: string;
  start_date: Date;
  last_date: Date;
  correction_date: Date;
  exam_date: Date;
  eligibility: string;
  fee_general: number;
  fee_obc: number;
  fee_sc_st: number;
  age_limit: string;
  total_posts: number;
  selection_process: string[];
  important_links: Array<{ title: string; url: string }>;
  active: boolean;
  featured: boolean;
  views: number;
  meta_title: string;
  meta_description: string;
  created_at: Date;
  updated_at: Date;
};

// Universal Post type for all categories
export type Post = {
  _id?: ObjectId;
  title: string;
  slug: string;
  category_id: ObjectId;
  category_slug: string;
  short_description: string;
  full_description?: string;

  // Dynamic fields stored as key-value pairs
  fields: Record<string, any>;

  // SEO fields
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;

  // Common fields
  active: boolean;
  featured: boolean;
  views: number;

  // Timestamps
  created_at: Date;
  updated_at: Date;
};

export type Banner = {
  _id?: ObjectId;
  title: string;
  subtitle: string;
  image_url: string;
  link: string;
  sort_order: number;
  active: boolean;
  created_at: Date;
};

export type Settings = {
  _id?: ObjectId;
  site_name: string;
  site_description: string;
  logo_url: string;
  contact_email: string;
  contact_phone: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  youtube_url: string;
  footer_text: string;
  updated_at: Date;
};

export type Blog = {
  _id?: ObjectId;
  title: string;
  slug: string;
  content: string;
  author_id: ObjectId;
  published_at: Date;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

let dbInstance: any;

export async function getDb() {
  if (!dbInstance) {
    dbInstance = await connectToDatabase();
  }
  return dbInstance;
}

export async function getCollection<T = any>(collectionName: string): Promise<Collection<any>> {
  const db = await getDb();
  return db.collection(collectionName);
}
