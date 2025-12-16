'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { getUser } from '@/lib/auth';
import { getSchemaForCategory, type PostField } from '@/lib/post-schemas';
import { generateSlug } from '@/lib/slug';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CreatePostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [schema, setSchema] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({
    title: '',
    slug: '',
    active: true,
    featured: false,
  });
  const [loading, setLoading] = useState(false);

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
    const res = await fetch('/api/admin/categories');
    const json = await res.json();
    setCategories(json.data || []);
  }

  function handleCategoryChange(categorySlug: string) {
    setSelectedCategory(categorySlug);
    const categorySchema = getSchemaForCategory(categorySlug);
    setSchema(categorySchema);

    // Reset form data
    const newFormData: Record<string, any> = {
      title: '',
      slug: '',
      active: true,
      featured: false,
    };

    // Initialize all fields with empty values
    categorySchema?.fields.forEach((field) => {
      newFormData[field.name] = '';
    });

    setFormData(newFormData);
  }

  function handleFieldChange(fieldName: string, value: any) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Auto-generate slug from title
    if (fieldName === 'title') {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error('Please select a category');
      return;
    }

    setLoading(true);

    try {
      // Find category ID
      const category = categories.find((c) => c.slug === selectedCategory);
      if (!category) {
        throw new Error('Category not found');
      }

      // Prepare post data
      const postData = {
        title: formData.title,
        slug: formData.slug,
        category_id: category._id?.toString(),
        category_slug: selectedCategory,
        short_description: formData.short_description || '',
        full_description: formData.full_description || '',
        fields: { ...formData },
        active: formData.active,
        featured: formData.featured,
        // Generate SEO fields
        meta_title: formData.title,
        meta_description: formData.short_description || formData.title,
      };

      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Failed to create post');
      }

      toast.success('Post created successfully');
      router.push('/admin/dashboard/posts');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  }

  function renderField(field: PostField) {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.name === 'full_description' ? 10 : 4}
          />
        );

      case 'date':
        return (
          <Input
            id={field.name}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            required={field.required}
          />
        );

      case 'number':
        return (
          <Input
            id={field.name}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'url':
        return (
          <Input
            id={field.name}
            type="url"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || 'https://example.com'}
            required={field.required}
          />
        );

      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(val) => handleFieldChange(field.name, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            id={field.name}
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">
            Add content to any category with dynamic forms
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat: any) => (
                <SelectItem key={cat._id?.toString()} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedCategory && schema && (
            <p className="text-sm text-muted-foreground mt-2">
              Form fields for: <strong>{schema.categoryName}</strong>
            </p>
          )}
        </CardContent>
      </Card>

      {schema && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {schema.fields.map((field: PostField) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                  {field.description && (
                    <p className="text-xs text-muted-foreground">
                      {field.description}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleFieldChange('slug', e.target.value)}
                  placeholder="auto-generated-slug"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  URL: /post/{formData.slug || 'your-slug'}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="active">Active</Label>
                  <p className="text-xs text-muted-foreground">
                    Show this post on the website
                  </p>
                </div>
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    handleFieldChange('active', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured">Featured</Label>
                  <p className="text-xs text-muted-foreground">
                    Show in featured section on homepage
                  </p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    handleFieldChange('featured', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {!schema && selectedCategory === '' && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>Select a category to start creating a post</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
