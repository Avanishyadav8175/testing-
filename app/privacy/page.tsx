import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Rozgar Tap',
  description: 'Privacy policy for Rozgar Tap job portal. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you create an account,
              subscribe to our newsletter, or contact us for support.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Personal information (name, email address, phone number)</li>
              <li>Professional information (resume, work experience, education)</li>
              <li>Usage data (how you interact with our website)</li>
              <li>Device information (IP address, browser type, operating system)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and improve our job portal services</li>
              <li>Send you job notifications and updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties
              without your consent, except as described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@Rozgar Tap.com" className="text-blue-600 hover:underline">
                privacy@Rozgar Tap.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}