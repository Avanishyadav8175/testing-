'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BlogPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the blog category page which uses MongoDB
    router.push('/category/blog');
  }, [router]);

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Redirecting to Blog...</h1>
      <p className="text-gray-600">Taking you to our blog section...</p>
    </div>
  );
}
