import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sansu.design';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sansu Design — Esculturas orgánicas hechas a mano',
    template: '%s | Sansu Design',
  },
  description: 'Esculturas orgánicas y detalles de interior, hechos a mano — una pieza a la vez.',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: 'Sansu Design',
    title: 'Sansu Design — Esculturas orgánicas hechas a mano',
    description: 'Esculturas orgánicas y detalles de interior, hechos a mano — una pieza a la vez.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sansu Design — Esculturas orgánicas hechas a mano',
    description: 'Esculturas orgánicas y detalles de interior, hechos a mano — una pieza a la vez.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
