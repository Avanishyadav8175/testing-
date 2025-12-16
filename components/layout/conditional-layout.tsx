'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';
import Header from './header';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current path is admin or login
  const isAdminRoute = pathname?.startsWith('/admin');

  // If it's an admin route, don't show header/footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For public routes, show header and footer
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}