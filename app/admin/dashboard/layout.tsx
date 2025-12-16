'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { cn } from '@/lib/utils';
import {
  FileText,
  FolderTree,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Content', href: '/admin/dashboard/content', icon: FileText },
  { name: 'Categories', href: '/admin/dashboard/categories', icon: FolderTree },
  { name: 'Contacts', href: '/admin/dashboard/contacts', icon: MessageCircle },
  { name: 'Banners', href: '/admin/dashboard/banners', icon: Image },
  { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await signOut({ callbackUrl: '/admin/login' });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <Link href="/" className="text-xl font-bold">
              Job Portal Admin
            </Link>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ top: '64px' }}
      >
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          style={{ top: '64px' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main
        className="lg:pl-64 pt-16"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
