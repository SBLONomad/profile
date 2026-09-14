'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: string
  duration?: number
}

export default function AnimatedNumber({ value, duration = 0.65 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-40px' })

  const numericMatch = value.match(/\d+/)
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0
  const suffix = value.replace(/\d+/, '')

  const [current, setCurrent] = useState(0)
  const [isRolling, setIsRolling] = useState(false)

  useEffect(() => {
    if (!isInView || targetNumber === 0) return

    let startTime: number | null = null
    let animationFrameId: number
    setIsRolling(true)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const nowVal = Math.floor(easeProgress * targetNumber)
      setCurrent(nowVal)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCurrent(targetNumber)
        setIsRolling(false)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animationFrameId)
      setIsRolling(false)
    }
  }, [isInView, targetNumber, duration])

  return (
    <span ref={ref} className={`tabular-nums rolling-number${isRolling ? ' is-rolling' : ''}`}>
      {current}
      {suffix}
    </span>
  )
}
