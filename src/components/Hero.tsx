'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MarqueeGallery from './MarqueeGallery'
import type { Project } from '@/lib/projects'

/* ── Glitch decode text effect ─────────────────────────────── */
function useGlitchText(text: string, startDelay = 0) {
  const [display, setDisplay] = useState(() => text.replace(/\S/g, '█'))
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$'

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
      }, 28)
    }, startDelay)
    return () => clearTimeout(timer)
  }, [text, startDelay])

  return display
}

/* ── Feature columns (matches reference) ───────────────────── */
const FEATURES = [
  {
    icon: '⚡',
    title: 'Instant\nUpload',
    desc: 'Add a new project from the admin panel and it goes live on your site automatically.',
  },
  {
    icon: '🎨',
    title: 'Multiple Styles &\nCategories',
    desc: 'Organise your work by category — Branding, Digital Art, Photography, and more.',
  },
  {
    icon: '📐',
    title: 'High-Fidelity\nPresentation',
    desc: 'Every image is served in modern formats (AVIF/WebP) at full resolution.',
  },
]

/* ── Component ─────────────────────────────────────────────── */
interface Props {
  projects: Project[]
}

export default function Hero({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const yText    = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const yMarquee = useTransform(scrollYProgress, [0, 1], [0, 50])

  const line1 = useGlitchText('Create Stunning Work', 300)
  const line2 = useGlitchText('with Just a Vision.', 600)

  /* Split into two rows for the double marquee */
  const half     = Math.ceil(projects.length / 2)
  const topRow   = projects.slice(0, half)
  const bottomRow = projects.slice(half)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
    >
      {/* ── Background neon glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 25%, rgba(57,255,20,0.07) 0%, transparent 65%)',
        }}
      />
      {/* Subtle grid overlay */}
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

      {/* ── Hero Text Block ── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 text-center px-6 pt-36 md:pt-44 max-w-5xl mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-neon font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
        >
          ✦ &nbsp;Visual Designer &amp; Creative Director
        </motion.p>

        {/* Headline — line 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.04] tracking-tight text-white"
        >
          {line1}
        </motion.h1>

        {/* Headline — line 2 */}
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.04] tracking-tight text-white mt-2 mb-8"
        >
          {line2}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-muted text-base md:text-lg max-w-md mx-auto leading-relaxed mb-10"
        >
          Turn your ideas into high-quality visuals.
          <br className="hidden sm:block" />
          No compromise. No limits.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-white text-black font-display font-semibold
                       text-sm px-8 py-3.5 rounded-full hover:bg-neon transition-all duration-300
                       group shadow-lg shadow-black/40"
          >
            View Projects
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-white/15 text-white
                       font-display font-medium text-sm px-8 py-3.5 rounded-full
                       hover:border-neon/50 hover:text-neon transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* ── Infinite Marquee Rows ── */}
      <motion.div
        style={{ y: yMarquee }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 w-full mt-14 md:mt-16 flex flex-col gap-4"
      >
        {/* Row 1 — scrolls LEFT */}
        <MarqueeGallery
          projects={topRow.length ? topRow : projects}
          direction="left"
          speed={40}
        />
        {/* Row 2 — scrolls RIGHT (opposite direction for depth) */}
        <MarqueeGallery
          projects={bottomRow.length ? bottomRow : [...projects].reverse()}
          direction="right"
          speed={50}
        />

        {/* Center neon vertical beam (matches reference image) */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(57,255,20,0.9) 40%, rgba(57,255,20,0.9) 60%, transparent)',
            boxShadow: '0 0 20px 4px rgba(57,255,20,0.35)',
          }}
        />
      </motion.div>

      {/* ── Feature columns (reference bottom section) ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.5 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10
                   mt-16 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8
                   border-t border-white/5 pt-12"
      >
        {FEATURES.map((f, i) => (
          <div key={i} className="text-center md:text-left">
            <span className="text-2xl mb-3 block">{f.icon}</span>
            <h3 className="text-white font-display font-semibold text-base md:text-lg leading-snug mb-3 whitespace-pre-line">
              {f.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
