'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { generateSlug } from '@/lib/slug';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function JobFormPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = Array.isArray((params as any).id) ? (params as any).id[0] : (params as any).id as string | undefined;
  const isNew = !idParam || idParam === 'new';

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    short_description: '',
    full_description: '',
    apply_link: '',
    notification_link: '',
    syllabus_link: '',
    start_date: '',
    last_date: '',
    correction_date: '',
    exam_date: '',
    eligibility: '',
    fee_general: 0,
    fee_obc: 0,
    fee_sc_st: 0,
    age_limit: '',
    total_posts: 0,
    active: true,
    featured: false,
    meta_title: '',
    meta_description: '',
  });

  useEffect(() => {
    fetchCategories();
    if (!isNew) {
      fetchJob();
    }
  }, []);

  async function fetchCategories() {
    const res = await fetch('/api/admin/categories');
    const json = await res.json();
    setCategories(json.data || []);
  }

  async function fetchJob() {
    try {
      const res = await fetch(`/api/admin/jobs?id=${idParam}`);
      const json = await res.json();
      if (!res.ok) throw new Error('Not found');
      const job = json.data;
      setFormData({
        ...formData,
        ...job,
        id: (job._id ?? job.id)?.toString?.(),
        category_id: (job.category_id ?? '').toString?.() ?? job.category_id ?? '',
        start_date: job.start_date ? new Date(job.start_date).toISOString().slice(0,10) : '',
        last_date: job.last_date ? new Date(job.last_date).toISOString().slice(0,10) : '',
        correction_date: job.correction_date ? new Date(job.correction_date).toISOString().slice(0,10) : '',
        exam_date: job.exam_date ? new Date(job.exam_date).toISOString().slice(0,10) : '',
      } as any);
    } catch {
      toast.error('Job not found');
      router.push('/admin/dashboard/jobs');
    }
    setLoading(false);
  }

  function handleTitleChange(title: string) {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      meta_title: title,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isNew) {
        const res = await fetch('/api/admin/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to create');
        toast.success('Job created successfully');
      } else {
        const res = await fetch('/api/admin/jobs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: idParam, ...formData }),
        });
        if (!res.ok) throw new Error('Failed to update');
        toast.success('Job updated successfully');
      }
      router.push('/admin/dashboard/jobs');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save job');
    } finally {
      setLoading(false);
    }
  }

  if (loading && !isNew) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/jobs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {isNew ? 'Add New Job' : 'Edit Job'}
          </h1>
          <p className="text-muted-foreground">
            Fill in the job details below
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, category_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat: any) => (
                    <SelectItem key={(cat._id ?? cat.id)?.toString?.()} value={(cat._id ?? cat.id)?.toString?.()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                value={formData.short_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    short_description: e.target.value,
                  })
                }
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">Full Description</Label>
              <Textarea
                id="full_description"
                value={formData.full_description}
                onChange={(e) =>
                  setFormData({ ...formData, full_description: e.target.value })
                }
                rows={8}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apply_link">Apply Link</Label>
              <Input
                id="apply_link"
                type="url"
                value={formData.apply_link}
                onChange={(e) =>
                  setFormData({ ...formData, apply_link: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification_link">Notification PDF Link</Label>
              <Input
                id="notification_link"
                type="url"
                value={formData.notification_link}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notification_link: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="syllabus_link">Syllabus Link</Label>
              <Input
                id="syllabus_link"
                type="url"
                value={formData.syllabus_link}
                onChange={(e) =>
                  setFormData({ ...formData, syllabus_link: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_date">Last Date</Label>
              <Input
                id="last_date"
                type="date"
                value={formData.last_date}
                onChange={(e) =>
                  setFormData({ ...formData, last_date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="correction_date">Correction Date</Label>
              <Input
                id="correction_date"
                type="date"
                value={formData.correction_date}
                onChange={(e) =>
                  setFormData({ ...formData, correction_date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exam_date">Exam Date</Label>
              <Input
                id="exam_date"
                type="date"
                value={formData.exam_date}
                onChange={(e) =>
                  setFormData({ ...formData, exam_date: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eligibility & Fees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eligibility">Eligibility</Label>
              <Textarea
                id="eligibility"
                value={formData.eligibility}
                onChange={(e) =>
                  setFormData({ ...formData, eligibility: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age_limit">Age Limit</Label>
              <Input
                id="age_limit"
                value={formData.age_limit}
                onChange={(e) =>
                  setFormData({ ...formData, age_limit: e.target.value })
                }
                placeholder="e.g., 18-30 years"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fee_general">General Fee</Label>
                <Input
                  id="fee_general"
                  type="number"
                  value={formData.fee_general}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fee_general: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee_obc">OBC Fee</Label>
                <Input
                  id="fee_obc"
                  type="number"
                  value={formData.fee_obc}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fee_obc: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee_sc_st">SC/ST Fee</Label>
                <Input
                  id="fee_sc_st"
                  type="number"
                  value={formData.fee_sc_st}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fee_sc_st: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_posts">Total Posts</Label>
              <Input
                id="total_posts"
                type="number"
                value={formData.total_posts}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total_posts: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={formData.meta_title}
                onChange={(e) =>
                  setFormData({ ...formData, meta_title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meta_description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Featured</Label>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : isNew ? 'Create Job' : 'Update Job'}
          </Button>
          <Link href="/admin/dashboard/jobs">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
