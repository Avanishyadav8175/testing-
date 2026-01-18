import ConditionalLayout from '@/components/layout/conditional-layout';
import AuthProvider from '@/components/providers/auth-provider';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rozgartap - Latest Government & Private Jobs',
  description: 'Find your dream job with latest government and private job opportunities, admit cards, results and exam notifications across India.',
  keywords: 'government jobs, private jobs, admit cards, results, sarkari naukri, job portal, employment opportunities, exam notifications',
  authors: [{ name: 'Rozgartap Team' }],
  creator: 'Rozgartap',
  publisher: 'Rozgartap',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://Rozgartap.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Rozgartap - Latest Government & Private Jobs',
    description: 'Find your dream job with latest government and private job opportunities, admit cards, results and exam notifications across India.',
    siteName: 'Rozgartap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rozgartap - Latest Government & Private Jobs',
    description: 'Find your dream job with latest government and private job opportunities, admit cards, results and exam notifications across India.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rozgartap",
    "description": "Find your dream job with latest government and private job opportunities, admit cards, results and exam notifications across India.",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://Rozgartap.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_BASE_URL || "https://Rozgartap.com"}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rozgartap",
      "url": process.env.NEXT_PUBLIC_BASE_URL || "https://Rozgartap.com"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster position="top-right" />
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        </AuthProvider>
      </body>
    </html>
  );
}