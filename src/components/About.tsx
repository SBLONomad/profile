'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'
import { CONTENT } from '@/content'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const yImage = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-36 overflow-hidden">
      <div
        className="absolute -right-64 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div style={{ y: yImage }} className="relative">
              <div
                className="relative w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top right, rgba(57,255,20,0.12) 0%, transparent 60%)',
                  }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-5 -right-2 sm:-right-4 glass rounded-2xl px-5 py-3.5 text-center shadow-xl border border-neon/30"
              >
                <div className="text-neon font-display font-bold text-2xl">{CONTENT.about.badge_year}</div>
                <div className="text-white/80 text-xs font-medium mt-0.5">{CONTENT.about.badge_status}</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-neon font-mono text-xs tracking-[0.25em] uppercase mb-4">
              {CONTENT.about.eyebrow}
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-6">
              {CONTENT.about.headline1}
              <br />
              {CONTENT.about.headline2}{' '}
              <span className="text-neon underline decoration-neon/40 underline-offset-8">
                {CONTENT.about.highlight}
              </span>
            </h2>
            <p className="text-muted text-base leading-relaxed mb-4">
              {CONTENT.about.bio1}
            </p>
            <p className="text-muted text-base leading-relaxed mb-8">
              {CONTENT.about.bio2}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {CONTENT.about.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
                  className="text-xs sm:text-sm font-body text-zinc-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full hover:border-neon/60 hover:text-neon transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* ── 주요 지표 통계 (숫자 롤링 카운트업 효과) ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8">
              {CONTENT.about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                >
                  <div className="text-white font-display font-bold text-3xl md:text-4xl text-neon drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                    <AnimatedNumber value={stat.value} duration={1.6 + i * 0.2} />
                  </div>
                  <div className="text-muted text-xs mt-1.5 leading-tight font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
