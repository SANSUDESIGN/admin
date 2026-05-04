import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const _geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sansu Admin',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
