import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Rozgar Tap',
  description: 'Terms and conditions for using Rozgar Tap job portal. Read our terms of service and user agreement.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms & Conditions</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using Rozgar Tap, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily download one copy of the materials on Rozgar Tap
              for personal, non-commercial transitory viewing only.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>This is the grant of a license, not a transfer of title</li>
              <li>You may not modify or copy the materials</li>
              <li>You may not use the materials for commercial purposes</li>
              <li>You may not attempt to reverse engineer any software</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              As a user of our platform, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Not engage in any fraudulent or illegal activities</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not spam or send unsolicited communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The materials on Rozgar Tap are provided on an &apos;as is&apos; basis. Rozgar Tap makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties
              including without limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of intellectual property or
              other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitations</h2>
            <p className="text-gray-600 mb-4">
              In no event shall Rozgar Tap or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on Rozgar Tap, even if
              Rozgar Tap or an authorized representative has been notified orally or in writing of
              the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms & Conditions, please contact us at{' '}
              <a href="mailto:legal@Rozgartap.com" className="text-blue-600 hover:underline">
                legal@Rozgartap.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}