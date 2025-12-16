import { getCollection } from '@/lib/db';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap - Rozgar Tap',
  description: 'Complete sitemap of Rozgar Tap job portal. Find all pages and categories easily.',
};

export default async function SitemapPage() {
  try {
    const categoriesCol = await getCollection('categories');
    const categories = await categoriesCol.find({ active: true }).sort({ name: 1 }).toArray();

    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Sitemap</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Pages */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-600 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-blue-600 hover:underline">
                    All Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-blue-600 hover:underline">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-blue-600 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-blue-600 hover:underline">
                    Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category: any) => (
                  <li key={category._id?.toString()}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Pages */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Legal & Info</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap.xml" className="text-blue-600 hover:underline">
                    XML Sitemap
                  </Link>
                </li>
                <li>
                  <Link href="/robots.txt" className="text-blue-600 hover:underline">
                    Robots.txt
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Need Help Finding Something?
            </h3>
            <p className="text-gray-600 mb-4">
              Use our search feature to find specific jobs, results, or information quickly.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search Now
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Sitemap</h1>
          <p className="text-gray-600">Loading sitemap...</p>
        </div>
      </div>
    );
  }
}