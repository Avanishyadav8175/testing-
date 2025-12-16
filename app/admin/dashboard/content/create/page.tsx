'use client';

import DynamicContentForm from '@/components/admin/dynamic-content-form';
import { getUser } from '@/lib/auth';
import { CONTENT_TYPES, ContentType } from '@/lib/content-types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateContentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const user = await getUser();
    if (!user) {
      router.push('/admin/login');
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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
          <h1 className="text-3xl font-bold">Create New Content</h1>
          <p className="text-muted-foreground">
            Select a content type and fill in the details
          </p>
        </div>
      </div>

      {/* Content Type Selection */}
      {!selectedType ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Select Content Type</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type)}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="text-4xl mb-3">{type.icon}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedType.icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{selectedType.name}</h2>
                <p className="text-gray-600">{selectedType.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedType(null)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Change Type
            </button>
          </div>

          <DynamicContentForm contentType={selectedType} />
        </div>
      )}
    </div>
  );
}