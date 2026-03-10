'use client';

import { useSettings } from '@/lib/settings-context';
import { ExternalLink, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NewsletterSection from './newsletter-section';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="main-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {settings.site_logo ? (
                <Image
                  src={settings.site_logo}
                  alt={settings.site_name}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              ) : (
                <p>
                  <span className="text-2xl font-bold text-blue-400">
                      Rozgar
                  </span>
                  <span className="text-2xl font-bold text-orange-400">
                  tap
                  </span>
                </p>
              )}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {settings.footer_text}
            </p>
            <div className="flex space-x-4">
              {settings.facebook_url && (
                <Link
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {settings.twitter_url && (
                <Link
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
              {settings.instagram_url && (
                <Link
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {settings.linkedin_url && (
                <Link
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {settings.youtube_url && (
                <Link
                  href={settings.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              )}
              {settings.telegram_url && (
                <Link
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  All Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/category/government-jobs"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Government Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/category/private-jobs"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Private Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Search Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/admit-cards"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Admit Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/category/results"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Results
                </Link>
              </li>
              <li>
                <Link
                  href="/category/notifications"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Notifications
                </Link>
              </li>
              <li>
                <Link
                  href="/category/scholarships"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/category/internships"
                  className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group"
                >
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Internships
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Contact Info</h4>
            <ul className="space-y-4">
              {settings.contact_email && (
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Email</p>
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="text-white hover:text-orange-400 transition-colors"
                    >
                      {settings.contact_email}
                    </a>
                  </div>
                </li>
              )}

              {settings.contact_phone && (
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Phone</p>
                    <a
                      href={`tel:${settings.contact_phone}`}
                      className="text-white hover:text-orange-400 transition-colors"
                    >
                      {settings.contact_phone}
                    </a>
                  </div>
                </li>
              )}

              {settings.contact_address && (
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Address</p>
                    <p className="text-white whitespace-pre-line">
                      {settings.contact_address}
                    </p>
                  </div>
                </li>
              )}

              {settings.whatsapp_number && (
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">WhatsApp</p>
                    <a
                      href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-orange-400 transition-colors"
                    >
                      {settings.whatsapp_number}
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="main-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>{settings.copyright_text}</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link
                href="/about"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/site-map"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      {/* <NewsletterSection /> */}
    </footer>
  );
}