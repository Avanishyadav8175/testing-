'use client';

import { useSettings } from '@/lib/settings-context';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const { settings } = useSettings();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Successfully subscribed to newsletter!');
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if newsletter is disabled
  if (!settings.newsletter_enabled) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-orange-500">
      <div className="main-container py-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-white mr-3" />
            <h3 className="text-2xl font-bold text-white">
              {settings.newsletter_title}
            </h3>
          </div>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {settings.newsletter_description}
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {message && (
              <p className={`mt-3 text-sm ${message.includes('Successfully') ? 'text-green-200' : 'text-red-200'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}