'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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

  return (
    <div className="bg-gradient-to-r from-blue-600 to-orange-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">
              Stay Updated with Latest Jobs
            </h3>
            <p className="text-blue-100">
              Subscribe to get notifications about new job opportunities
            </p>
          </div>
          <div className="w-full md:w-auto max-w-md">
            <form className="flex" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-white focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${message.includes('Successfully') ? 'text-green-100' : 'text-red-100'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}