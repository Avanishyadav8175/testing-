'use client';

import DynamicContentForm from '@/components/admin/dynamic-content-form';
import { getUser } from '@/lib/auth';
import { CONTENT_TYPES, ContentType } from '@/lib/content-types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>(null);
  const [contentType, setContentType] = useState<ContentType | null>(null);

  useEffect(() => {
    checkAuth();
    fetchContent();
  }, []);

  async function checkAuth() {
    const user = await getUser();
    if (!user) {
      router.push('/admin/login');
    }
  }

  async function fetchContent() {
    try {
      const res = await fetch(`/api/admin/content/${id}`);
      const data = await res.json();

      if (res.ok) {
        setContent(data.content);
        const type = CONTENT_TYPES.find(ct => ct.id === data.content.content_type);
        setContentType(type || null);
      } else {
        alert('Failed to fetch content');
        router.push('/admin/dashboard/content');
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
      alert('Failed to fetch content');
      router.push('/admin/dashboard/content');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!content || !contentType) {
    return <div className="flex items-center justify-center min-h-screen">Content not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/content"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Content</h1>
          <p className="text-muted-foreground">
            Update the content details
          </p>
        </div>
      </div>

      {/* Content Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{contentType.icon}</span>
          <div>
            <h2 className="text-2xl font-bold">{contentType.name}</h2>
            <p className="text-gray-600">{contentType.description}</p>
          </div>
        </div>

        <DynamicContentForm
          contentType={contentType}
          initialData={content}
          contentId={id}
        />
      </div>
    </div>
  );
}
