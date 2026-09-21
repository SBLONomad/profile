'use client'

import { motion } from 'framer-motion'

interface SplitRevealProps {
  text: string
  delay?: number
  accent?: boolean
  triggerOnView?: boolean
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.028,
      delayChildren: 0.08,
    },
  },
}

const character = {
  hidden: { opacity: 0, y: '0.55em', filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function SplitReveal({ text, delay = 0, accent = false, triggerOnView = false }: SplitRevealProps) {
  const animation = {
    variants: container,
    initial: 'hidden' as const,
    ...(triggerOnView
      ? { whileInView: 'visible' as const, viewport: { once: false, amount: 0.6 } }
      : { animate: 'visible' as const }),
    transition: { delay },
  }

  return (
    <motion.span {...animation} className={accent ? 'split-reveal split-reveal-accent' : 'split-reveal'} aria-label={text}>
      {Array.from(text).map((letter, index) => (
        <motion.span key={`${letter}-${index}`} variants={character} aria-hidden="true" className="split-reveal-char">
          {letter === ' ' ? '\u00a0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}
