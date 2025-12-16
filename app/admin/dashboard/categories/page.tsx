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
import { Textarea } from '@/components/ui/textarea';
import { getUser } from '@/lib/auth';
import type { Category } from '@/lib/db';
import { generateSlug } from '@/lib/slug';
import { Edit, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'briefcase',
    image_url: '',
    button_color: '#1e3a8a',
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
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/admin/categories');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setCategories(json.data || []);
    } catch {
      toast.error('Failed to fetch categories');
    }
    setLoading(false);
  }

  function handleNameChange(name: string) {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingCategory) {
        const res = await fetch('/api/admin/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: (editingCategory as any)._id?.toString?.() ?? (editingCategory as any).id, ...formData }),
        });
        if (!res.ok) throw new Error('Failed');
        toast.success('Category updated successfully');
      } else {
        const res = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed');
        toast.success('Category created successfully');
      }
      fetchCategories();
      resetForm();
    } catch {
      toast.error('Failed to save category');
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();

      setFormData((prev) => ({ ...prev, image_url: data.url }));
      toast.success('Image uploaded successfully');
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: 'briefcase',
      image_url: '',
      button_color: '#1e3a8a',
      sort_order: 0,
      active: true,
    });
    setEditingCategory(null);
    setDialogOpen(false);
  }

  function handleEdit(category: Category) {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      image_url: category.image_url || '',
      button_color: category.button_color || '#1e3a8a',
      sort_order: category.sort_order,
      active: category.active,
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
      const res = await fetch(`/api/admin/categories?id=${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('श्रेणी सफलतापूर्वक डिलीट हो गई!');
      setDeleteModalOpen(false);
      setDeletingId(null);
      router.refresh();
      fetchCategories();
    } catch {
      toast.error('श्रेणी डिलीट करने में विफल');
    } finally {
      setIsDeleting(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage job categories</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Category Image</Label>
                <div className="flex items-start gap-4">
                  {formData.image_url && (
                    <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                      <Image
                        src={formData.image_url}
                        alt="Category preview"
                        fill
                        className="object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image_url: '' })}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload an image for the category (PNG, JPG, SVG)
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Fallback Icon</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    placeholder="briefcase"
                  />
                  <p className="text-xs text-muted-foreground">
                    Lucide icon name (used if no image)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="button_color">Button Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="button_color"
                      type="color"
                      value={formData.button_color}
                      onChange={(e) =>
                        setFormData({ ...formData, button_color: e.target.value })
                      }
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.button_color}
                      onChange={(e) =>
                        setFormData({ ...formData, button_color: e.target.value })
                      }
                      placeholder="#1e3a8a"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between pt-8">
                  <Label htmlFor="active">Active</Label>
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, active: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={uploading}>
                  {uploading ? 'Uploading...' : editingCategory ? 'Update' : 'Create'}
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
              <TableHead>Preview</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category: any) => (
              <TableRow key={(category as any)._id ?? category.id}>
                <TableCell>
                  <div className="w-16 h-16 relative border rounded-lg overflow-hidden bg-slate-50">
                    {category.image_url ? (
                      <Image
                        src={category.image_url}
                        alt={category.name}
                        fill
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {category.slug}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: category.button_color || '#1e3a8a' }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {category.button_color || '#1e3a8a'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{category.sort_order}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {category.active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(((category as any)._id ?? category.id).toString());
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
        title="श्रेणी डिलीट करें?"
        message="क्या आप वाकई इस श्रेणी को डिलीट करना चाहते हैं? यह प्रक्रिया वापस नहीं ली जा सकती।"
      />
    </div>
  );
}