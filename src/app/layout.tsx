import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PocketSmart AI - AI-Powered Budget Planning for Everyday Needs',
  description:
    'Make smarter financial decisions with personalized budget recommendations for home interiors, parties, and jewelry purchases powered by Gemini 1.5 Flash.',
  keywords: [
    'PocketSmart AI',
    'Budget Planner',
    'AI interior design',
    'party budget planner',
    'jewelry recommendation',
    'Gemini 1.5 Flash',
    'IKEA',
    'Amazon',
    'Flipkart',
  ],
  authors: [{ name: 'PocketSmart AI Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Ambient floating blur orbs */}
        <div className="ambient-orb ambient-orb-1" aria-hidden="true" />
        <div className="ambient-orb ambient-orb-2" aria-hidden="true" />

        <Navbar />
        <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
