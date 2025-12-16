'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BlogsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the unified content management system
    router.push('/admin/dashboard/content?type=blog');
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="text-muted-foreground">Manage blog posts through the unified content system</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Blog Management Has Moved</h2>
        <p className="text-gray-600 mb-6">
          Blog posts are now managed through the unified content management system.
          This provides better organization and more features.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/admin/dashboard/content?type=blog')}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            Go to Content Management
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push('/admin/dashboard/content/create?type=blog')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Blog Post
          </Button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Redirecting automatically...</p>
        </div>
      </div>
    </div>
  );
}
