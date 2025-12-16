'use client';

import DeleteConfirmationModal from '@/components/admin/delete-confirmation-modal';
import { getUser } from '@/lib/auth';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
  updated_at: string;
}

export default function ContactsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    inquiryType: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    checkAuth();
    fetchContacts();
  }, [filters, pagination.page]);

  async function checkAuth() {
    const user = await getUser();
    if (!user) {
      router.push('/admin/login');
    }
    setLoading(false);
  }

  async function fetchContacts() {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.status && { status: filters.status }),
        ...(filters.inquiryType && { inquiryType: filters.inquiryType }),
        ...(filters.search && { search: filters.search })
      });

      const res = await fetch(`/api/contact?${params}`);
      const data = await res.json();

      if (res.ok) {
        setContacts(data.contacts || []);
        setPagination(prev => ({
          ...prev,
          total: data.pagination.total,
          pages: data.pagination.pages
        }));
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  }

  async function updateContactStatus(contactId: string, status: string) {
    try {
      const res = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        fetchContacts();
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact({ ...selectedContact, status: status as any });
        }
      }
    } catch (error) {
      console.error('Failed to update contact status:', error);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'read': return 'bg-yellow-100 text-yellow-700';
      case 'replied': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />;
      case 'read': return <Eye className="h-4 w-4" />;
      case 'replied': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <Clock className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getInquiryTypeColor = (type: string) => {
    switch (type) {
      case 'technical': return 'bg-red-100 text-red-700';
      case 'career': return 'bg-green-100 text-green-700';
      case 'partnership': return 'bg-purple-100 text-purple-700';
      case 'feedback': return 'bg-orange-100 text-orange-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

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
      const res = await fetch(`/api/admin/contacts/${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('संपर्क संदेश सफलतापूर्वक डिलीट हो गया!');
      setDeleteModalOpen(false);
      setDeletingId(null);
      if (selectedContact?._id === deletingId) {
        setSelectedContact(null);
      }
      router.refresh();
      fetchContacts();
    } catch {
      toast.error('संपर्क संदेश डिलीट करने में विफल');
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
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">
            Manage and respond to user inquiries
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Inquiry Type</label>
            <select
              value={filters.inquiryType}
              onChange={(e) => setFilters(prev => ({ ...prev, inquiryType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="general">General</option>
              <option value="technical">Technical</option>
              <option value="career">Career</option>
              <option value="partnership">Partnership</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ status: '', inquiryType: '', search: '' })}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold">
                Messages ({pagination.total})
              </h2>
            </div>

            <div className="divide-y">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => {
                    setSelectedContact(contact);
                    if (contact.status === 'new') {
                      updateContactStatus(contact._id, 'read');
                    }
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedContact?._id === contact._id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        {contact.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {contact.subject}
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {contact.message}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className={`px-2 py-1 rounded ${getInquiryTypeColor(contact.inquiryType)}`}>
                      {contact.inquiryType}
                    </span>
                    <span>
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {contacts.length === 0 && (
              <div className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No messages found</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-1">
          {selectedContact ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Message Details</h2>
                <div className="flex gap-2">
                  <select
                    value={selectedContact.status}
                    onChange={(e) => updateContactStatus(selectedContact._id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </div>
                </div>

                {selectedContact.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                        {selectedContact.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">Subject</label>
                  <p className="text-gray-900">{selectedContact.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Inquiry Type</label>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${getInquiryTypeColor(selectedContact.inquiryType)}`}>
                    {selectedContact.inquiryType}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 mt-1">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Received</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">
                      {new Date(selectedContact.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Reply via Email
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(selectedContact._id);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Message
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="संपर्क संदेश डिलीट करें?"
        message="क्या आप वाकई इस संपर्क संदेश को डिलीट करना चाहते हैं? यह प्रक्रिया वापस नहीं ली जा सकती।"
      />
    </div>
  );
}