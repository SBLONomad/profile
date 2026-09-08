import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio — Creative Works',
  description: 'A curated collection of my creative and design work.',
  metadataBase: new URL('https://yoursite.netlify.app'),
  openGraph: {
    title: 'Portfolio — Creative Works',
    description: 'A curated collection of my creative and design work.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#080808] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
