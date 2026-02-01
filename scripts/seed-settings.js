const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://keshavgupta86036:FST2023k@cluster0.06aqope.mongodb.net/test?retryWrites=true&w=majority';

const sampleSettings = {
  site_name: 'RozgaarTrap',
  site_description: 'Your Ultimate Career Portal - Find Government Jobs, Private Jobs, Internships, Scholarships and More',
  site_logo: '',
  favicon: '',
  primary_color: '#2563eb',
  secondary_color: '#f97316',

  contact_email: 'info@rozgaartrap.com',
  contact_phone: '+91 9876543210',
  contact_address: 'New Delhi, India\n110001',

  facebook_url: 'https://facebook.com/rozgaartrap',
  twitter_url: 'https://twitter.com/rozgaartrap',
  instagram_url: 'https://instagram.com/rozgaartrap',
  linkedin_url: 'https://linkedin.com/company/rozgaartrap',
  youtube_url: 'https://youtube.com/@rozgaartrap',
  telegram_url: 'https://t.me/rozgaartrap',
  whatsapp_number: '+91 9876543210',

  meta_title: 'RozgaarTrap - Government Jobs, Private Jobs, Internships & Scholarships',
  meta_description: 'Find latest government jobs, private sector opportunities, internships, scholarships, admit cards, and exam results. Your one-stop career portal.',
  meta_keywords: 'government jobs, private jobs, internships, scholarships, admit cards, results, career, employment',
  og_title: 'RozgaarTrap - Your Ultimate Career Portal',
  og_description: 'Discover thousands of job opportunities, scholarships, and career resources. Stay updated with latest government and private sector jobs.',
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

async function seedSettings() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const collection = db.collection('settings');
    
    // Update or create settings document
    const result = await collection.updateOne(
      { type: 'site_settings' },
      {
        $set: {
          type: 'site_settings',
          data: sampleSettings,
          updated_at: new Date()
        },
        $setOnInsert: {
          created_at: new Date()
        }
      },
      { upsert: true }
    );
    
    console.log('Settings seeded successfully:', result);
    
  } catch (error) {
    console.error('Error seeding settings:', error);
  } finally {
    await client.close();
  }
}

seedSettings();