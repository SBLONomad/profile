'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import LogoBanner from './LogoBanner'
import { CONTENT } from '@/content'
import type { Project } from '@/lib/projects'

interface Props {
  projects: Project[]
}

export default function Interactive3DGallery({ projects }: Props) {
  const baseList = projects.length > 0 ? projects : []
  const items = [...baseList, ...baseList, ...baseList, ...baseList]

  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const lastX = useRef(0)
  const velocity = useRef(0)
  const offsetRef = useRef(0)

  const cardWidth = 205
  const cardGap = 20
  const stride = cardWidth + cardGap

  useEffect(() => {
    let animationFrameId: number
    const baseSpeed = -0.6

    const tick = () => {
      if (!isDragging.current) {
        velocity.current *= 0.94
        if (Math.abs(velocity.current) < 0.05) velocity.current = 0
        offsetRef.current += velocity.current + baseSpeed
      }

      const loopWidth = baseList.length * stride
      if (loopWidth > 0) {
        if (offsetRef.current < -loopWidth * 2) {
          offsetRef.current += loopWidth
        } else if (offsetRef.current > -loopWidth) {
          offsetRef.current -= loopWidth
        }
      }

      const container = containerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const centerX = rect.width / 2
        const radius = 550

        const cardElements = container.querySelectorAll<HTMLElement>('.fan-card-item')
        cardElements.forEach((el, index) => {
          const cardX = offsetRef.current + index * stride + cardWidth / 2
          const distFromCenter = cardX - centerX
          const normX = distFromCenter / radius
          const absNorm = Math.min(Math.abs(normX), 1.8)

          const scale = 0.88 + absNorm * 0.32
          const translateZ = (absNorm * 240) - 100
          const rotateY = -normX * 32
          const translateY = Math.pow(normX, 2) * 18

          el.style.transform = `translate3d(${cardX - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`

          const dynamicZIndex = 100 + Math.round(absNorm * 1000)
          el.style.zIndex = `${dynamicZIndex}`

          const innerShine = el.querySelector<HTMLElement>('.card-vignette')
          if (innerShine) {
            const opacity = Math.max(0, 0.35 - absNorm * 0.2)
            innerShine.style.backgroundColor = `rgba(0,0,0,${opacity})`
          }
        })
      }

      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrameId)
  }, [baseList.length, stride])

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    startX.current = e.clientX
    lastX.current = e.clientX
    velocity.current = 0
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const currentX = e.clientX
    const delta = currentX - lastX.current
    lastX.current = currentX

    offsetRef.current += delta
    velocity.current = delta * 1.4
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId)
      } catch (err) {}
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaX !== 0 ? -e.deltaX : -e.deltaY * 0.6
    velocity.current += delta * 0.2
  }

  return (
    <div className="relative w-full overflow-hidden select-none">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-screen left-1/2 -translate-x-1/2 h-[440px] md:h-[500px] cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center"
        style={{
          perspective: '850px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 양 끝 가장자리 페이드 마스크 */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-[2000] pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000000 25%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-[2000] pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000000 25%, transparent 100%)' }}
        />

        {/* 네온사인 광선 — 이미지들 뒤로 배치 (z-0) */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[220px] z-0 pointer-events-none flex items-center justify-center"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 15%, black 42%, black 58%, rgba(0,0,0,0.15) 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 15%, black 42%, black 58%, rgba(0,0,0,0.15) 85%, transparent 100%)',
          }}
        >
          <div
            className="absolute w-[200px] h-[340px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(57,255,20,0.3) 0%, rgba(57,255,20,0.1) 45%, transparent 75%)',
              filter: 'blur(28px)',
            }}
          />

          <div
            className="absolute w-[45px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(57,255,20,0.5) 30%, rgba(57,255,20,0.95) 50%, rgba(57,255,20,0.5) 70%, transparent)',
              filter: 'blur(12px)',
            }}
          />

          <div
            className="absolute w-[10px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 5%, rgba(57,255,20,0.7) 25%, #4ade80 50%, rgba(57,255,20,0.7) 75%, transparent 95%)',
              filter: 'blur(2.5px)',
            }}
          />

          <div
            className="absolute w-[2.5px] h-full rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.7) 30%, #ffffff 50%, rgba(255,255,255,0.7) 70%, transparent 95%)',
              boxShadow: '0 0 12px 2px #ffffff, 0 0 24px 6px #39FF14, 0 0 45px 12px rgba(57,255,20,0.6)',
            }}
          />
        </div>

        {/* 3D 카드 컨테이너 (z-10) */}
        <div className="relative z-10 w-full h-[360px]">
          {items.map((project, idx) => (
            <Link
              key={`${project.slug}-${idx}`}
              href={`/projects/${project.slug}`}
              data-cursor-project
              className="fan-card-item absolute top-0 left-0 will-change-transform group cursor-pointer"
              style={{
                width: `${cardWidth}px`,
                height: '310px',
                transformOrigin: '50% 50%',
              }}
              aria-label={`${project.title} 자세히 보기`}
            >
              <div
                className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0e0e10] border border-white/10 transition-all duration-300 group-hover:border-neon group-hover:shadow-[0_0_32px_rgba(162,255,135,0.35)] shadow-2xl"
              >
                {project.thumbnailStyle === 'logo' ? <LogoBanner project={project} /> : <img
                  src={project.image}
                  alt=""
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.opacity = '0'
                    if (target.parentElement) {
                      target.parentElement.style.background = 'linear-gradient(135deg, #18181b 0%, #09090b 50%, #052e16 100%)'
                    }
                  }}
                />}

                <div className="card-vignette absolute inset-0 pointer-events-none transition-colors duration-300" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)',
                  }}
                />

                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: 'inset 0 0 0 1.5px rgba(57,255,20,0.9), 0 0 25px rgba(57,255,20,0.25)',
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider text-neon bg-neon/10 border border-neon/30 mb-1.5 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                    {project.category}
                  </span>
                  <h4 className="text-white font-display font-semibold text-sm leading-snug drop-shadow-md group-hover:text-neon transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-muted text-[11px] line-clamp-1 mt-0.5 opacity-80">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 안내 텍스트 (CONTENT.gallery_hint 연동) */}
      {CONTENT.gallery_hint && (
        <div className="text-center mt-1 pointer-events-none">
          <span className="text-[11px] font-mono text-muted/60 tracking-widest uppercase">
            {CONTENT.gallery_hint}
          </span>
        </div>
      )}
    </div>
  )
}
