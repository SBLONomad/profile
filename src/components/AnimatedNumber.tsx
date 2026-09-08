'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: string
  duration?: number
}

export default function AnimatedNumber({ value, duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-40px' })

  const numericMatch = value.match(/\d+/)
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0
  const suffix = value.replace(/\d+/, '')

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isInView || targetNumber === 0) return

    let startTime: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const nowVal = Math.floor(easeProgress * targetNumber)
      setCurrent(nowVal)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCurrent(targetNumber)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, targetNumber, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {suffix}
    </span>
  )
}
