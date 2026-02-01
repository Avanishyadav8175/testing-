export interface SiteSettings {
  // General Site Settings
  site_name: string;
  site_description: string;
  site_logo: string;
  favicon: string;
  primary_color: string;
  secondary_color: string;

  // Contact Information
  contact_email: string;
  contact_phone: string;
  contact_address: string;

  // Social Media Links
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  telegram_url: string;
  whatsapp_number: string;

  // SEO Meta Tags
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_card: string;
  twitter_site: string;

  // Analytics & Tracking
  google_analytics_id: string;
  google_tag_manager_id: string;
  facebook_pixel_id: string;

  // Footer Settings
  footer_text: string;
  copyright_text: string;

  // Newsletter
  newsletter_enabled: boolean;
  newsletter_title: string;
  newsletter_description: string;
}

export function validateSettings(settings: Partial<SiteSettings>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!settings.site_name?.trim()) {
    errors.push('Site name is required');
  }

  if (!settings.site_description?.trim()) {
    errors.push('Site description is required');
  }

  if (!settings.meta_title?.trim()) {
    errors.push('Meta title is required');
  }

  if (!settings.meta_description?.trim()) {
    errors.push('Meta description is required');
  }

  // Email validation
  if (settings.contact_email && !isValidEmail(settings.contact_email)) {
    errors.push('Contact email must be a valid email address');
  }

  // URL validations
  const urlFields = [
    { field: 'site_logo', name: 'Site logo URL' },
    { field: 'favicon', name: 'Favicon URL' },
    { field: 'facebook_url', name: 'Facebook URL' },
    { field: 'twitter_url', name: 'Twitter URL' },
    { field: 'instagram_url', name: 'Instagram URL' },
    { field: 'linkedin_url', name: 'LinkedIn URL' },
    { field: 'youtube_url', name: 'YouTube URL' },
    { field: 'telegram_url', name: 'Telegram URL' },
    { field: 'og_image', name: 'OG Image URL' }
  ];

  urlFields.forEach(({ field, name }) => {
    const value = settings[field as keyof SiteSettings] as string;
    if (value && !isValidUrl(value)) {
      errors.push(`${name} must be a valid URL`);
    }
  });

  // Color validation
  if (settings.primary_color && !isValidColor(settings.primary_color)) {
    errors.push('Primary color must be a valid hex color');
  }

  if (settings.secondary_color && !isValidColor(settings.secondary_color)) {
    errors.push('Secondary color must be a valid hex color');
  }

  // Meta description length
  if (settings.meta_description && settings.meta_description.length > 160) {
    errors.push('Meta description should be 160 characters or less');
  }

  // Meta title length
  if (settings.meta_title && settings.meta_title.length > 60) {
    errors.push('Meta title should be 60 characters or less');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidColor(color: string): boolean {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(color);
}