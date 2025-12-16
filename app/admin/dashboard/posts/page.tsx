'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUser } from '@/lib/auth';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      if (!user) {
        router.push('/admin/login');
      }
    };
    checkAuth();
    fetchCategories();
    fetchPosts();
  }, []);

  async function fetchCategories() {
    const res = await fetch('/api/admin/categories');
    const json = await res.json();
    setCategories(json.data || []);
  }

  async function fetchPosts() {
    try {
      const url = new URL('/api/admin/posts', window.location.origin);
      if (categoryFilter && categoryFilter !== 'all') {
        url.searchParams.set('category', categoryFilter);
      }
      const res = await fetch(url.toString());
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setPosts(json.data || []);
    } catch (e) {
      toast.error('Failed to fetch posts');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, [categoryFilter]);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('Post deleted successfully');
      fetchPosts();
    } catch {
      toast.error('Failed to delete post');
    }
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">
            Manage all posts across categories
          </p>
        </div>
        <Link href="/admin/dashboard/posts/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat: any) => (
              <SelectItem key={cat._id?.toString()} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No posts found. Create your first post!
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post: any) => {
                const category = categories.find(
                  (c: any) => c._id?.toString() === post.category_id?.toString()
                );
                return (
                  <TableRow key={post._id?.toString()}>
                    <TableCell className="font-medium max-w-md truncate">
                      {post.title}
                      {post.featured && (
                        <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {category?.name || 'Unknown'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {post.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>{post.views || 0}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/post/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/dashboard/posts/edit/${post._id?.toString()}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(post._id?.toString())}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
