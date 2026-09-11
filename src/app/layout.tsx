import type { Metadata } from 'next'
import './globals.css'

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#080808] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
