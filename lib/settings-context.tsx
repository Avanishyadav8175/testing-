'use client';

import { SiteSettings } from '@/lib/settings-validation';
import { createContext, useContext, useEffect, useState } from 'react';

const defaultSettings: SiteSettings = {
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
};

interface SettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();

      if (res.ok && data.settings) {
        setSettings({ ...defaultSettings, ...data.settings });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refreshSettings = async () => {
    setLoading(true);
    await fetchSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}