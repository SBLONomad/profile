import type { Metadata } from 'next'
import './globals.css'
import CursorGlow from '@/components/CursorGlow'

export const metadata: Metadata = {
  title: '김동형 포트폴리오',
  description: '웹, 커머스 캠페인, 광고 소재, 상세페이지 작업을 정리한 김동형 포트폴리오입니다.',
  metadataBase: new URL('https://yoursite.netlify.app'),
  openGraph: {
    title: '김동형 포트폴리오',
    description: '웹, 커머스 캠페인, 광고 소재, 상세페이지 작업을 정리한 김동형 포트폴리오입니다.',
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
        <link rel="preload" href="/SUIT-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/hero-wave-web.mp4" as="video" type="video/mp4" />
      </head>
      <body className="bg-[#080808] text-white antialiased">
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
