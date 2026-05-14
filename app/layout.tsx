import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { getFontContent } from '@/lib/content';

const _geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sansu Admin',
  robots: { index: false, follow: false },
};

function googleFontsUrl(families: string[]): string {
  const custom = Array.from(new Set(families.filter((f) => f !== 'Geist')));
  if (custom.length === 0) return '';
  const params = custom
    .map((f) => `family=${encodeURIComponent(f)}:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const font = await getFontContent();
  const fontsUrl = googleFontsUrl([font.headingFont, font.bodyFont]);

  return (
    <html
      lang="es-AR"
      style={{
        '--font-heading': `'${font.headingFont}', serif`,
        '--font-body': `'${font.bodyFont}', sans-serif`,
        '--font-size-base': `${font.fontSize}px`,
      } as React.CSSProperties}
    >
      <head>
        {fontsUrl && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={fontsUrl} />
          </>
        )}
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
