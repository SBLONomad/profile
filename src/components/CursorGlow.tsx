'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null)
  const trails = useRef<(HTMLDivElement | null)[]>([])
  const target = useRef({ x: -100, y: -100 })
  const positions = useRef(Array.from({ length: 7 }, () => ({ x: -100, y: -100 })))

  useEffect(() => {
    const update = (event: PointerEvent) => {
      const element = glow.current
      if (!element || event.pointerType !== 'mouse') return
      target.current = { x: event.clientX, y: event.clientY }
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      element.dataset.visible = 'true'
      const eventTarget = event.target as Element
      element.dataset.active = String(Boolean(eventTarget.closest('a, button, input, textarea, select')))
      element.dataset.project = String(Boolean(eventTarget.closest('[data-cursor-project]')))
    }

    let frame = 0
    const follow = () => {
      trails.current.forEach((trail, index) => {
        if (!trail) return
        const position = positions.current[index]
        const speed = 0.34 - index * 0.035
        position.x += (target.current.x - position.x) * speed
        position.y += (target.current.y - position.y) * speed
        trail.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
        trail.dataset.visible = 'true'
      })
      frame = requestAnimationFrame(follow)
    }

    window.addEventListener('pointermove', update, { passive: true })
    frame = requestAnimationFrame(follow)
    return () => {
      window.removeEventListener('pointermove', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden="true" />
      {Array.from({ length: 7 }, (_, index) => (
        <div key={index} ref={(element) => { trails.current[index] = element }} className={`cursor-trail cursor-trail-${index}`} aria-hidden="true" />
      ))}
    </>
  )
}
