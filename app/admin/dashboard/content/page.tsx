'use client';

import DeleteConfirmationModal from '@/components/admin/delete-confirmation-modal';
import { getUser } from '@/lib/auth';
import { CONTENT_TYPES } from '@/lib/content-types';
import { Edit, Eye, FileText, Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ContentManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchCategories();
    fetchContent();
  }, [selectedType]);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (res.ok) {
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }

  async function checkAuth() {
    const user = await getUser();
    if (!user) {
      router.push('/admin/login');
    }
    setLoading(false);
  }

  async function fetchContent() {
    try {
      const params = new URLSearchParams();
      if (selectedType) params.append('type', selectedType);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/admin/content?${params}`);
      const data = await res.json();

      if (res.ok) {
        setContent(data.content || []);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }

  async function handleCancel(id: string) {
    const reason = prompt('Please provide a reason for cancellation:');
    if (reason === null) return; // User clicked cancel

    try {
      const res = await fetch('/api/admin/content/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, reason }),
      });

      if (res.ok) {
        alert('Content cancelled successfully!');
        fetchContent();
      } else {
        alert('Failed to cancel content');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Failed to cancel content');
    }
  }

  function openDeleteModal(id: string) {
    setDeletingId(id);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setDeletingId(null);
    }
  }

  async function confirmDelete() {
    if (!deletingId) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/content?id=${deletingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('कंटेंट सफलतापूर्वक डिलीट हो गया!');
        setDeleteModalOpen(false);
        setDeletingId(null);
        router.refresh();
        fetchContent();
      } else {
        const data = await res.json();
        toast.error(data.error || 'कंटेंट डिलीट करने में विफल');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('कंटेंट डिलीट करने में विफल');
    } finally {
      setIsDeleting(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">
            Manage all your content in one place - Jobs, Results, Admit Cards, and more
          </p>
        </div>

        <Link
          href="/admin/dashboard/content/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          Create Content
        </Link>
      </div>

      {/* Content Type Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => setSelectedType('')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedType === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            All Content
          </button>
          {CONTENT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${selectedType === type.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </button>
          ))}
          {/* Show additional categories not in CONTENT_TYPES */}
          {categories
            .filter(cat => !CONTENT_TYPES.find(ct => ct.id === cat.slug || ct.slug === cat.slug))
            .map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedType(cat.slug)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${selectedType === cat.slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span>{cat.icon || '📄'}</span>
                <span>{cat.name}</span>
              </button>
            ))}
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchContent()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={fetchContent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {content.map((item) => {
              const contentType = CONTENT_TYPES.find(ct => ct.id === item.content_type);

              return (
                <tr key={item._id?.toString()} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">/{item.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      <span>{contentType?.icon}</span>
                      <span>{contentType?.name}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${item.active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                      }`}>
                      {item.active ? 'Active' : 'Inactive'}
                    </span>
                    {item.featured && (
                      <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.views || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${contentType?.slug}/${item.slug}`}
                        target="_blank"
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/dashboard/content/edit/${item._id}`}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(item._id?.toString());
                        }}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {content.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No content found
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first content to get started
            </p>
            <Link
              href="/admin/dashboard/content/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="h-5 w-5" />
              Create Content
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}