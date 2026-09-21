'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function WaveBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 520, 1800], [0.82, 0.32, 0.22])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let frame = 0
    let direction: 'forward' | 'backward' = 'forward'
    let lastFrame = 0

    const playForward = () => {
      cancelAnimationFrame(frame)
      direction = 'forward'
      video.playbackRate = 1
      if (video.currentTime < 0.05) video.currentTime = 0
      void video.play().catch(() => undefined)
    }

    const playBackward = () => {
      if (direction === 'backward' || !Number.isFinite(video.duration)) return
      direction = 'backward'
      video.pause()
      lastFrame = performance.now()

      const rewind = (now: number) => {
        if (direction !== 'backward') return
        const elapsed = now - lastFrame
        if (elapsed < 32) {
          frame = requestAnimationFrame(rewind)
          return
        }
        lastFrame = now
        const nextTime = Math.max(0, video.currentTime - elapsed / 1000)
        video.currentTime = nextTime
        if (nextTime <= 0.035) {
          video.currentTime = 0
          playForward()
          return
        }
        frame = requestAnimationFrame(rewind)
      }

      frame = requestAnimationFrame(rewind)
    }

    const checkEnd = () => {
      if (direction === 'forward' && video.duration && video.currentTime >= video.duration - 0.08) playBackward()
    }

    const start = () => playForward()
    video.addEventListener('canplay', start, { once: true })
    video.addEventListener('timeupdate', checkEnd)
    video.addEventListener('ended', playBackward)
    playForward()

    return () => {
      cancelAnimationFrame(frame)
      video.removeEventListener('canplay', start)
      video.removeEventListener('timeupdate', checkEnd)
      video.removeEventListener('ended', playBackward)
    }
  }, [])

  return (
    <motion.div className="wave-backdrop" style={{ opacity }} aria-hidden="true">
      <video ref={videoRef} src="/hero-wave-web.mp4" muted playsInline preload="auto" />
    </motion.div>
  )
}
