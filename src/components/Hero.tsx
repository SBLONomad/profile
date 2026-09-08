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

  const yText = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const line1 = useGlitchText(CONTENT.hero.headline1, 200)
  const line2 = useGlitchText(CONTENT.hero.headline2, 500)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 overflow-hidden"
    >
      {/* ── 배경 미니멀 앰비언트 글로우 ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 55% at 50% 25%, rgba(57,255,20,0.08) 0%, transparent 65%)',
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
          className="text-neon font-mono text-xs md:text-sm tracking-[0.25em] uppercase mb-5"
        >
          {CONTENT.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight text-white"
        >
          {line1}
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight text-white mt-1 mb-6"
        >
          {line2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-muted text-base md:text-lg max-w-md mx-auto leading-relaxed mb-8"
        >
          {CONTENT.hero.subtext1}
          <br />
          {CONTENT.hero.subtext2}
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-row items-center justify-center gap-4 mb-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-white text-black font-display font-semibold text-sm px-7 py-3 rounded-full hover:bg-neon hover:text-black transition-all duration-300 group shadow-lg shadow-black/60"
          >
            {CONTENT.hero.cta_primary}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-medium text-sm px-7 py-3 rounded-full hover:border-neon/60 hover:text-neon transition-all duration-300 bg-white/5"
          >
            {CONTENT.hero.cta_secondary}
          </a>
        </motion.div>
      </motion.div>

      {/* ── 2. 원근감 3D 롤링 갤러리 (네온 광선이 중앙 카드 앞으로 지나감) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full mt-4"
      >
        <Interactive3DGallery projects={projects} />
      </motion.div>

      {/* ── 3. 3컬럼 Feature 그리드 — 영역별 완전 가운데 정렬 ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 mt-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-12"
      >
        {CONTENT.features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center justify-center p-4">
            <span className="text-3xl mb-3 block p-3 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {feature.icon}
            </span>
            <h3 className="text-white font-display font-semibold text-lg leading-snug mb-2 whitespace-pre-line">
              {feature.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              {feature.desc}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
