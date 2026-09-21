'use client'

import { useEffect, useRef, type RefObject } from 'react'

interface Props {
  hostRef: RefObject<HTMLElement>
}

type Bloom = { x: number; y: number; radius: number; opacity: number; hue: number }

export default function PointerBloom({ hostRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = canvas.getContext('2d')
    if (!context) return

    const blooms: Bloom[] = []
    let width = 0
    let height = 0
    let frame = 0
    let hovering = false
    let last = { x: -1000, y: -1000 }

    const resize = () => {
      const bounds = host.getBoundingClientRect()
      const scale = Math.min(window.devicePixelRatio, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * scale)
      canvas.height = Math.round(height * scale)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(scale, 0, 0, scale, 0, 0)
    }

    const addBloom = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const distance = Math.hypot(x - last.x, y - last.y)
      if (distance < 16) return
      last = { x, y }
      blooms.push({ x, y, radius: 36 + Math.random() * 24, opacity: .24, hue: 86 + Math.random() * 24 })
      if (blooms.length > 28) blooms.shift()
    }

    const render = () => {
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'screen'
      for (let index = blooms.length - 1; index >= 0; index -= 1) {
        const bloom = blooms[index]
        bloom.radius += hovering ? .8 : .35
        bloom.opacity *= hovering ? .972 : .93
        if (bloom.opacity < .008) {
          blooms.splice(index, 1)
          continue
        }
        const glow = context.createRadialGradient(bloom.x, bloom.y, 0, bloom.x, bloom.y, bloom.radius * 3.1)
        glow.addColorStop(0, `hsla(${bloom.hue}, 100%, 86%, ${bloom.opacity})`)
        glow.addColorStop(.22, `hsla(${bloom.hue}, 100%, 66%, ${bloom.opacity * .54})`)
        glow.addColorStop(1, `hsla(${bloom.hue}, 100%, 60%, 0)`)
        context.fillStyle = glow
        context.beginPath()
        context.arc(bloom.x, bloom.y, bloom.radius * 3.1, 0, Math.PI * 2)
        context.fill()
      }
      frame = requestAnimationFrame(render)
    }

    const enter = () => { hovering = true }
    const leave = () => { hovering = false }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    host.addEventListener('pointerenter', enter)
    host.addEventListener('pointerleave', leave)
    host.addEventListener('pointermove', addBloom, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      host.removeEventListener('pointerenter', enter)
      host.removeEventListener('pointerleave', leave)
      host.removeEventListener('pointermove', addBloom)
    }
  }, [hostRef])

  return <canvas ref={canvasRef} className="pointer-bloom" aria-hidden="true" />
}
