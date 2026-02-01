'use client';

import { getUser } from '@/lib/auth';
import { SiteSettings } from '@/lib/settings-validation';
import { Globe, Mail, MapPin, Palette, Phone, Save, Search, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'RozgaarTrap',
    site_description: 'Your Ultimate Career Portal - Find Government Jobs, Private Jobs, Internships, Scholarships and More',
    site_logo: '',
    favicon: '',
    primary_color: '#2563eb',
    secondary_color: '#f97316',

    contact_email: 'info@rozgaartrap.com',
    contact_phone: '+91 9876543210',
    contact_address: 'New Delhi, India',

    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: '',
    youtube_url: '',
    telegram_url: '',
    whatsapp_number: '',

    meta_title: 'RozgaarTrap - Government Jobs, Private Jobs, Internships & Scholarships',
    meta_description: 'Find latest government jobs, private sector opportunities, internships, scholarships, admit cards, and exam results. Your one-stop career portal.',
    meta_keywords: 'government jobs, private jobs, internships, scholarships, admit cards, results, career, employment',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_card: 'summary_large_image',
    twitter_site: '@rozgaartrap',

    google_analytics_id: '',
    google_tag_manager_id: '',
    facebook_pixel_id: '',

    footer_text: 'RozgaarTrap is your trusted partner in career growth. We provide the latest updates on government jobs, private sector opportunities, and educational resources.',
    copyright_text: '© 2024 RozgaarTrap. All rights reserved.',

    newsletter_enabled: true,
    newsletter_title: 'Stay Updated with Latest Opportunities',
    newsletter_description: 'Get notified about new job postings, exam dates, and career tips directly in your inbox.'
  });

  useEffect(() => {
    checkAuth();
    fetchSettings();
  }, []);

  async function checkAuth() {
    const user = await getUser();
    if (!user) {
      router.push('/admin/login');
    }
    setLoading(false);
  }

  async function fetchSettings() {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (res.ok && data.settings) {
        setSettings({ ...settings, ...data.settings });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Settings saved successfully!');
      } else {
        if (data.details && Array.isArray(data.details)) {
          alert(`Validation errors:\n${data.details.join('\n')}`);
        } else {
          alert(data.error || 'Failed to save settings');
        }
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  const handleInputChange = (field: keyof SiteSettings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'social', name: 'Social Media', icon: Share2 },
    { id: 'seo', name: 'SEO & Meta Tags', icon: Search },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'contact', name: 'Contact Info', icon: Mail },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">
            Manage your site configuration, social media, and SEO settings
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">General Settings</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.site_name}
                      onChange={(e) => handleInputChange('site_name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Site Logo URL</label>
                    <input
                      type="url"
                      value={settings.site_logo}
                      onChange={(e) => handleInputChange('site_logo', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Site Description</label>
                  <textarea
                    value={settings.site_description}
                    onChange={(e) => handleInputChange('site_description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Footer Text</label>
                    <textarea
                      value={settings.footer_text}
                      onChange={(e) => handleInputChange('footer_text', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Copyright Text</label>
                    <input
                      type="text"
                      value={settings.copyright_text}
                      onChange={(e) => handleInputChange('copyright_text', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Newsletter Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="newsletter_enabled"
                        checked={settings.newsletter_enabled}
                        onChange={(e) => handleInputChange('newsletter_enabled', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="newsletter_enabled" className="text-sm font-medium">
                        Enable Newsletter Subscription
                      </label>
                    </div>

                    {settings.newsletter_enabled && (
                      <div className="grid md:grid-cols-2 gap-4 pl-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Newsletter Title</label>
                          <input
                            type="text"
                            value={settings.newsletter_title}
                            onChange={(e) => handleInputChange('newsletter_title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Newsletter Description</label>
                          <textarea
                            value={settings.newsletter_description}
                            onChange={(e) => handleInputChange('newsletter_description', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Settings */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Social Media Links</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Facebook URL</label>
                    <input
                      type="url"
                      value={settings.facebook_url}
                      onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                      placeholder="https://facebook.com/rozgaartrap"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter URL</label>
                    <input
                      type="url"
                      value={settings.twitter_url}
                      onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                      placeholder="https://twitter.com/rozgaartrap"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Instagram URL</label>
                    <input
                      type="url"
                      value={settings.instagram_url}
                      onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                      placeholder="https://instagram.com/rozgaartrap"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      value={settings.linkedin_url}
                      onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                      placeholder="https://linkedin.com/company/rozgaartrap"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">YouTube URL</label>
                    <input
                      type="url"
                      value={settings.youtube_url}
                      onChange={(e) => handleInputChange('youtube_url', e.target.value)}
                      placeholder="https://youtube.com/@rozgaartrap"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telegram URL</label>
                    <input
                      type="url"
                      value={settings.telegram_url}
                      onChange={(e) => handleInputChange('telegram_url', e.target.value)}
                      placeholder="https://t.me/rozgaartrap"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={settings.whatsapp_number}
                      onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                      placeholder="+919876543210"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Analytics & Tracking</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
                      <input
                        type="text"
                        value={settings.google_analytics_id}
                        onChange={(e) => handleInputChange('google_analytics_id', e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Google Tag Manager ID</label>
                      <input
                        type="text"
                        value={settings.google_tag_manager_id}
                        onChange={(e) => handleInputChange('google_tag_manager_id', e.target.value)}
                        placeholder="GTM-XXXXXXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Facebook Pixel ID</label>
                      <input
                        type="text"
                        value={settings.facebook_pixel_id}
                        onChange={(e) => handleInputChange('facebook_pixel_id', e.target.value)}
                        placeholder="123456789012345"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">SEO & Meta Tags</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={settings.meta_title}
                      onChange={(e) => handleInputChange('meta_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Recommended: 50-60 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Description</label>
                    <textarea
                      value={settings.meta_description}
                      onChange={(e) => handleInputChange('meta_description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Recommended: 150-160 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={settings.meta_keywords}
                      onChange={(e) => handleInputChange('meta_keywords', e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-4">Open Graph (Facebook/LinkedIn)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">OG Title</label>
                      <input
                        type="text"
                        value={settings.og_title}
                        onChange={(e) => handleInputChange('og_title', e.target.value)}
                        placeholder="Leave empty to use Meta Title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">OG Description</label>
                      <textarea
                        value={settings.og_description}
                        onChange={(e) => handleInputChange('og_description', e.target.value)}
                        rows={2}
                        placeholder="Leave empty to use Meta Description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">OG Image URL</label>
                      <input
                        type="url"
                        value={settings.og_image}
                        onChange={(e) => handleInputChange('og_image', e.target.value)}
                        placeholder="https://example.com/og-image.jpg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1200x630 pixels</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-4">Twitter Cards</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter Card Type</label>
                      <select
                        value={settings.twitter_card}
                        onChange={(e) => handleInputChange('twitter_card', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="summary">Summary</option>
                        <option value="summary_large_image">Summary Large Image</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter Site Handle</label>
                      <input
                        type="text"
                        value={settings.twitter_site}
                        onChange={(e) => handleInputChange('twitter_site', e.target.value)}
                        placeholder="@rozgaartrap"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Appearance Settings</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={settings.primary_color}
                        onChange={(e) => handleInputChange('primary_color', e.target.value)}
                        className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.primary_color}
                        onChange={(e) => handleInputChange('primary_color', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Color</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={settings.secondary_color}
                        onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                        className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.secondary_color}
                        onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Favicon URL</label>
                  <input
                    type="url"
                    value={settings.favicon}
                    onChange={(e) => handleInputChange('favicon', e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Recommended: 32x32 pixels, .ico format</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Color Preview</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: settings.primary_color }}
                      ></div>
                      <span className="text-sm">Primary Color</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: settings.secondary_color }}
                      ></div>
                      <span className="text-sm">Secondary Color</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.contact_email}
                      onChange={(e) => handleInputChange('contact_email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.contact_phone}
                      onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="inline h-4 w-4 mr-2" />
                      Contact Address
                    </label>
                    <textarea
                      value={settings.contact_address}
                      onChange={(e) => handleInputChange('contact_address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}