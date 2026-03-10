'use client';

import { Button } from '@/components/ui/button';
import { useSettings } from '@/lib/settings-context';
import { Languages, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSettings();

  return (
    <header className=" sticky top-0 z-50 w-full bg-white">
      <div className="main-container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              {settings.site_logo ? (
                <Image
                  src={settings.site_logo}
                  alt={settings.site_name}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              ) : (
                <>
                  <span className="text-2xl font-bold text-blue-600">
                    Rozgar
                  </span>
                  <span className="text-2xl font-bold text-orange-500">
                    tap
                  </span>
                </>
              )}
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              About us
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              services
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Languages className="h-5 w-5" />
            </Button>
            <Link href="/signup">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Sign up
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="main-container py-4 space-y-4">
            <Link
              href="/"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </Link>
            <Link
              href="/services"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              services
            </Link>
            <Link
              href="/contact"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
