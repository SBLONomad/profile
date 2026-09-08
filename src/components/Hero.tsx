'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Interactive3DGallery from './Interactive3DGallery'
import { CONTENT } from '@/content'
import type { Project } from '@/lib/projects'

function useGlitchText(text: string, startDelay = 0) {
  const [display, setDisplay] = useState(text)
  const CHARS = '가나다라마바사아자차카타파하0123456789!@#$%'

  useEffect(() => {
    let frame = 0
    const total = text.length * 2.5
    const timer = setTimeout(() => {
      const raf = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((ch, idx) => {
              if (ch === ' ') return ' '
              if (idx < frame / 2.5) return ch
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        frame++
        if (frame > total) clearInterval(raf)
      }, 35)
    }, startDelay)
    return () => clearTimeout(timer)
  }, [text, startDelay])

  return display
}

interface Props {
  projects: Project[]
}

export default function Hero({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const line1 = useGlitchText(CONTENT.hero.headline1, 200)
  const line2 = useGlitchText(CONTENT.hero.headline2, 500)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-start pt-28 md:pt-32 overflow-hidden"
    >
      {/* ── 배경 미니멀 앰비언트 글로우 ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 45% at 50% 20%, rgba(57,255,20,0.08) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── 1. 중앙 정렬 Hero 텍스트 영역 ── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-neon font-mono text-xs md:text-sm tracking-[0.25em] uppercase mb-4"
        >
          {CONTENT.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.06] tracking-tight text-white"
        >
          {line1}
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.06] tracking-tight text-white mt-1 mb-5"
        >
          {line2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="text-muted text-sm md:text-base max-w-md mx-auto leading-relaxed mb-6"
        >
          {CONTENT.hero.subtext1}
          <br />
          {CONTENT.hero.subtext2}
        </motion.p>

        {/* 
          레퍼런스 이미지의 "Generate image ->" 스타일 미니멀 블랙 알약 버튼
        */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.65 }}
          className="flex flex-row items-center justify-center gap-3 mb-2"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 bg-black text-white border border-white/20 font-display font-medium text-xs sm:text-sm px-7 py-2.5 rounded-full hover:border-neon/60 hover:text-neon transition-all duration-300 group shadow-lg shadow-black/80"
          >
            {CONTENT.hero.cta_primary}
            <span className="group-hover:translate-x-1 transition-transform duration-300 text-neon">→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── 2. 원근감 3D 롤링 갤러리 (버튼 바로 아래 컴팩트하게 밀착) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full -mt-2 md:-mt-4"
      >
        <Interactive3DGallery projects={projects} />
      </motion.div>

      {/* ── 3. 3컬럼 Feature 그리드 ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 mt-2 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-10"
      >
        {CONTENT.features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center justify-center p-3">
            <span className="text-2xl mb-2.5 block p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {feature.icon}
            </span>
            <h3 className="text-white font-display font-semibold text-base md:text-lg leading-snug mb-1.5 whitespace-pre-line">
              {feature.title}
            </h3>
            <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-xs">
              {feature.desc}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
