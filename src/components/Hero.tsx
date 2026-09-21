'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Interactive3DGallery from './Interactive3DGallery'
import Intro from './Intro'
import { CONTENT } from '@/content'
import type { Project } from '@/lib/projects'

export default function Hero({ projects }: { projects: Project[] }) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })
  const introY = useTransform(scrollYProgress, [0, 0.36, 0.72], ['0%', '-6%', '-24%'])
  const introScale = useTransform(scrollYProgress, [0, 0.48, 0.8], [1, 0.96, 0.9])
  const introOpacity = useTransform(scrollYProgress, [0, 0.56, 0.82], [1, 1, 0])
  const galleryY = useTransform(scrollYProgress, [0.18, 0.52, 0.9], ['72vh', '5vh', '-7vh'])
  const galleryOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.9], [0, 1, 1])
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 135])
  const orbitRotateReverse = useTransform(scrollYProgress, [0, 1], [0, -85])

  return (
    <>
      <section ref={heroRef} className="orbit-hero">
        <div className="orbit-hero-sticky">
          <motion.div className="orbit-ring orbit-ring-a" style={{ rotate: orbitRotate }} aria-hidden="true" />
          <motion.div className="orbit-ring orbit-ring-b" style={{ rotate: orbitRotateReverse }} aria-hidden="true" />
          <div className="orbit-axis" aria-hidden="true" />
          <motion.div className="orbit-intro-stage" style={{ y: introY, scale: introScale, opacity: introOpacity }}>
            <Intro />
          </motion.div>
          <motion.div className="orbit-gallery-stage" style={{ y: galleryY, opacity: galleryOpacity }}>
            <Interactive3DGallery projects={projects} />
          </motion.div>
        </div>
      </section>

      <section className="orbit-feature-band">
        <div className="orbit-feature-rule" aria-hidden="true" />
        {CONTENT.features.map((feature, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="orbit-feature"
          >
            <span className="orbit-feature-icon">{feature.icon}</span>
            <h3 className="whitespace-pre-line">{feature.title}</h3>
            <p className="whitespace-pre-line">{feature.desc}</p>
          </motion.article>
        ))}
      </section>
    </>
  )
}
