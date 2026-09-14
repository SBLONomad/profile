'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = (event: PointerEvent) => {
      const element = glow.current
      if (!element || event.pointerType !== 'mouse') return
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      element.dataset.active = String(Boolean((event.target as Element).closest('a, button, input, textarea, select')))
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [])

  return <div ref={glow} className="cursor-glow" aria-hidden="true" />
}
