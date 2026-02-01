import { getCollection } from './db';

// Generate a unique slug by checking database and adding numbers if needed
export async function generateUniqueSlug(
  baseSlug: string,
  collectionName: string,
  excludeId?: string
): Promise<string> {
  const col = await getCollection(collectionName);
  let slug = baseSlug;
  let counter = 0;

  while (true) {
    // Check if slug exists (excluding current document if updating)
    const query: any = { slug };
    if (excludeId) {
      const { ObjectId } = await import('mongodb');
      query._id = { $ne: new ObjectId(excludeId) };
    }

    const existing = await col.findOne(query);

    if (!existing) {
      return slug; // Slug is unique
    }

    // Generate next variant
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

// Basic slug generation from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}