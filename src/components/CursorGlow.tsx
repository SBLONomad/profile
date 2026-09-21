'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = (event: PointerEvent) => {
      const element = glow.current
      if (!element || event.pointerType !== 'mouse') return
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      const target = event.target as Element
      element.dataset.active = String(Boolean(target.closest('a, button, input, textarea, select')))
      element.dataset.project = String(Boolean(target.closest('[data-cursor-project]')))
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [])

  return <div ref={glow} className="cursor-glow" aria-hidden="true" />
}
