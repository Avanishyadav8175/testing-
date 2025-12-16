'use client';
import DeleteConfirmationModal from '@/components/admin/delete-confirmation-modal';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUser } from '@/lib/auth';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function BannersPage() {
  const router = useRouter();
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    link: '',
    sort_order: 0,
    active: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      if (!user) {
        router.push('/admin/login');
      }
    };
    checkAuth();
    fetchBanners();
  }, []);

  async function fetchBanners() {
    try {
      const res = await fetch('/api/admin/banners');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setBanners(json.data || []);
    } catch {
      toast.error('Failed to fetch banners');
    }
    setLoading(false);
  }

  async function uploadBannerImage(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to upload');
    return json.url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let imageUrl = formData.image_url;

    if (imageFile) {
      try {
        imageUrl = await uploadBannerImage(imageFile);
      } catch (error) {
        toast.error('Failed to upload image');
        return;
      }
    }

    const bannerData = { ...formData, image_url: imageUrl };

    try {
      if (editingBanner) {
        const res = await fetch('/api/admin/banners', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: (editingBanner._id ?? editingBanner.id)?.toString?.(), ...bannerData }),
        });
        if (!res.ok) throw new Error('Failed');
        toast.success('Banner updated successfully');
      } else {
        const res = await fetch('/api/admin/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bannerData),
        });
        if (!res.ok) throw new Error('Failed');
        toast.success('Banner created successfully');
      }
      fetchBanners();
      resetForm();
    } catch {
      toast.error('Failed to save banner');
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      subtitle: '',
      image_url: '',
      link: '',
      sort_order: 0,
      active: true,
    });
    setEditingBanner(null);
    setDialogOpen(false);
  }

  function handleEdit(banner: any) {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      image_url: banner.image_url,
      link: banner.link,
      sort_order: banner.sort_order,
      active: banner.active,
    });
    setDialogOpen(true);
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
      const res = await fetch(`/api/admin/banners?id=${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('बैनर सफलतापूर्वक डिलीट हो गया!');
      setDeleteModalOpen(false);
      setDeletingId(null);
      router.refresh();
      fetchBanners();
    } catch {
      toast.error('बैनर डिलीट करने में विफल');
    } finally {
      setIsDeleting(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banners</h1>
          <p className="text-muted-foreground">Manage homepage banners</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? 'Edit Banner' : 'Add Banner'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="/category/govt-jobs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sort_order: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active</Label>
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, active: checked })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingBanner ? 'Update' : 'Create'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subtitle</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner: any) => (
              <TableRow key={(banner._id ?? banner.id)?.toString?.()}>
                <TableCell className="font-medium">{banner.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {banner.subtitle}
                </TableCell>
                <TableCell>
                  {banner.image_url ? (
                    <img
                      src={banner.image_url}
                      alt={banner.title}
                      className="h-12 w-20 object-cover rounded"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No image
                    </span>
                  )}
                </TableCell>
                <TableCell>{banner.sort_order}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${banner.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(banner)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(((banner._id ?? banner.id)?.toString?.() || banner.id));
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="बैनर डिलीट करें?"
        message="क्या आप वाकई इस बैनर को डिलीट करना चाहते हैं? यह प्रक्रिया वापस नहीं ली जा सकती।"
      />
    </div>
  );
}