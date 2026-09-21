'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function WaveBackdrop() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 520, 1800], [0.82, 0.32, 0.22])

  return (
    <motion.div className="wave-backdrop" style={{ opacity }} aria-hidden="true">
      <video src="/hero-wave-pingpong.mp4" muted autoPlay loop playsInline preload="auto" />
    </motion.div>
  )
}
