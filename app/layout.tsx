import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import { Layout } from '../components/Layout';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'StayinUBUD | Spiritual Luxury',
  description: 'A super-premium villa rental platform in Ubud, Bali, featuring a high-end editorial design and smooth scrolling experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased bg-rice-paper text-deep-jungle">
        {/* Layout is now here, persisting Navbar and Lenis Scroll across page navigations */}
        <Layout>
            {children}
        </Layout>
      </body>
    </html>
  );
}