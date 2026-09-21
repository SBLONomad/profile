'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'
import { CONTENT } from '@/content'
import type { SiteProfile } from '@/lib/profile'

interface Props {
  profile?: SiteProfile
}

export default function About({ profile }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const yImage = useTransform(scrollYProgress, [0, 1], [-42, 42])
  const rotateImage = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3])
  const frameY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section id="about" ref={sectionRef} className="orbit-about">
      <motion.div className="orbit-about-frame" style={{ y: frameY }} aria-hidden="true" />
      <div className="orbit-about-inner">
        <div className="orbit-about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="orbit-portrait-column"
          >
            <motion.div style={{ y: yImage, rotate: rotateImage }} className="orbit-portrait-wrap">
              <div
                className="orbit-portrait"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={CONTENT.about.profile_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="orbit-portrait-overlay" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="orbit-badge"
              >
                <div className="text-neon font-display font-bold text-2xl">{CONTENT.about.badge_year}</div>
                <div className="text-white/80 text-xs font-medium mt-0.5">{CONTENT.about.badge_status}</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="orbit-about-copy"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="orbit-kicker">
              {CONTENT.about.eyebrow}
            </p>
            <h2 className="orbit-about-title">
              {CONTENT.about.headline1}
              <br />
              {CONTENT.about.headline2}{' '}
              <span>
                {CONTENT.about.highlight}
              </span>
            </h2>
            <p className="orbit-about-body">
              {profile?.bio || CONTENT.about.bio1}
            </p>
            <p className="orbit-about-body orbit-about-body-last">
              {CONTENT.about.bio2}
            </p>

            <div className="orbit-skill-list">
              {CONTENT.about.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
                  className="orbit-skill"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* ── 주요 지표 통계 (숫자 롤링 카운트업 효과) ── */}
            <div className="orbit-stat-grid">
              {CONTENT.about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                >
                  <div className="orbit-stat-value">
                    <AnimatedNumber value={stat.value} duration={0.65 + i * 0.08} />
                  </div>
                  <div className="orbit-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
