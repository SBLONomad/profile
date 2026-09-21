'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Project } from '@/lib/projects'

interface Props {
  projects: Project[]
}

export default function ScrollArtwork({ projects }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const featured = projects.slice(0, 3)

  const coreScale = useTransform(scrollYProgress, [0, 0.2, 0.58, 1], [0.62, 1, 1.06, 0.78])
  const coreRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 9])
  const coreY = useTransform(scrollYProgress, [0, 0.45, 1], ['22vh', '0vh', '-19vh'])
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], ['-6vw', '-32vw', '-50vw'])
  const leftY = useTransform(scrollYProgress, [0, 0.5, 1], ['30vh', '0vh', '-28vh'])
  const leftRotate = useTransform(scrollYProgress, [0, 1], [-32, 16])
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], ['8vw', '34vw', '52vw'])
  const rightY = useTransform(scrollYProgress, [0, 0.5, 1], ['-28vh', '0vh', '27vh'])
  const rightRotate = useTransform(scrollYProgress, [0, 1], [26, -15])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 220])
  const lineScale = useTransform(scrollYProgress, [0, 0.42, 0.82, 1], [0, 1, 1, 0.35])
  const labelOpacity = useTransform(scrollYProgress, [0, 0.18, 0.8, 1], [0, 1, 1, 0])

  if (featured.length < 3) return null

  return (
    <section ref={sectionRef} className="scroll-artwork" aria-label="작업물 스크롤 비주얼">
      <div className="scroll-artwork-sticky">
        <motion.div className="scroll-artwork-ring scroll-artwork-ring-large" style={{ x: '-50%', y: '-50%', rotate: ringRotate }} aria-hidden="true" />
        <motion.div className="scroll-artwork-ring scroll-artwork-ring-small" style={{ x: '-50%', y: '-50%', rotate: ringRotate }} aria-hidden="true" />
        <motion.div className="scroll-artwork-line" style={{ scaleY: lineScale }} aria-hidden="true" />

        <motion.figure className="scroll-artwork-card scroll-artwork-card-core" style={{ scale: coreScale, rotate: coreRotate, y: coreY }}>
          <img src={featured[0].image} alt="" />
          <figcaption>{featured[0].title}</figcaption>
        </motion.figure>

        <motion.figure className="scroll-artwork-card scroll-artwork-card-left" style={{ x: leftX, y: leftY, rotate: leftRotate }}>
          <img src={featured[1].image} alt="" />
          <figcaption>{featured[1].title}</figcaption>
        </motion.figure>

        <motion.figure className="scroll-artwork-card scroll-artwork-card-right" style={{ x: rightX, y: rightY, rotate: rightRotate }}>
          <img src={featured[2].image} alt="" />
          <figcaption>{featured[2].title}</figcaption>
        </motion.figure>

        <motion.p className="scroll-artwork-label" style={{ opacity: labelOpacity }}>
          Selected works in motion
        </motion.p>
      </div>
    </section>
  )
}
