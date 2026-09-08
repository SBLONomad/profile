'use client'

import React, { useEffect, useRef } from 'react'
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

  const cardWidth = 195
  const cardGap = 36
  const stride = cardWidth + cardGap

  useEffect(() => {
    let animationFrameId: number
    const baseSpeed = -0.65

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
        const halfWidth = rect.width / 2 || 600

        const cardElements = container.querySelectorAll<HTMLElement>('.fan-card-item')
        cardElements.forEach((el, index) => {
          const cardX = offsetRef.current + index * stride + cardWidth / 2
          const distFromCenter = cardX - centerX
          const normX = distFromCenter / (halfWidth * 0.75)
          const absNorm = Math.min(Math.abs(normX), 1.6)

          // 3D 오목 원호 원근감
          const scale = 0.85 + absNorm * 0.45
          const translateZ = (absNorm * 220) - 120
          const rotateY = -normX * 28
          const translateY = Math.pow(absNorm, 2) * 12

          el.style.transform = `translate3d(${cardX - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`

          // ── [핵심 계층 순서 설정] ──
          // 좌측: 더 왼쪽(바깥)으로 갈수록 더 위로 올라옴 (absNorm이 큼 -> zIndex 높음)
          // 우측: 더 오른쪽(바깥)으로 갈수록 더 위로 올라옴 (absNorm이 큼 -> zIndex 높음)
          // 중앙 카드는 약 100, 양 끝 카드는 최대 1700까지 배정
          const dynamicZIndex = 100 + Math.round(absNorm * 1000)
          el.style.zIndex = `${dynamicZIndex}`

          const innerShine = el.querySelector<HTMLElement>('.card-vignette')
          if (innerShine) {
            const opacity = Math.max(0, 0.4 - absNorm * 0.2)
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
    <div className="relative w-full overflow-hidden select-none py-10 md:py-16">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-screen left-1/2 -translate-x-1/2 h-[460px] md:h-[540px] cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 양 끝 가장자리 페이드 마스크 */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 md:w-36 z-[2000] pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000000 20%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 md:w-36 z-[2000] pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000000 20%, transparent 100%)' }}
        />

        {/* 
          중앙 이미지 '뒤' 앰비언트 그린 글로우
        */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full z-0 pointer-events-none opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(57,255,20,0.2) 0%, rgba(57,255,20,0.06) 45%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* 
          ── 3D 카드 컨테이너 ── 
          [주의] transform-style: flat으로 두어 브라우저의 z-index 스택 정렬이 100% 작동하도록 보장!
        */}
        <div
          className="relative w-full h-[380px]"
        >
          {items.map((project, idx) => (
            <div
              key={`${project.slug}-${idx}`}
              className="fan-card-item absolute top-0 left-0 will-change-transform group cursor-pointer"
              style={{
                width: `${cardWidth}px`,
                height: '310px',
                transformOrigin: '50% 50%',
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden rounded-2xl bg-[#111111] border border-white/10 transition-colors duration-300 group-hover:border-neon/60"
                style={{
                  boxShadow: '0 20px 45px -10px rgba(0,0,0,0.9), 0 0 1px rgba(255,255,255,0.1)',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    if (target.parentElement) {
                      target.parentElement.classList.add('bg-gradient-to-br', 'from-zinc-900', 'via-zinc-800', 'to-emerald-950')
                    }
                  }}
                />

                <div className="card-vignette absolute inset-0 pointer-events-none transition-colors duration-300" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 50%, transparent 80%)',
                  }}
                />

                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: 'inset 0 0 0 1.5px rgba(57,255,20,0.9), 0 0 30px rgba(57,255,20,0.3)',
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
            </div>
          ))}
        </div>

        {/* 
          중앙 카드 앞으로 지나가는 네온 광선 빔 (중앙 카드의 z-index인 100보다 높은 z-250으로 설정)
        */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[360px] z-[250] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(57,255,20,0.1) 15%, rgba(57,255,20,0.9) 40%, #ffffff 50%, rgba(57,255,20,0.9) 60%, rgba(57,255,20,0.1) 85%, transparent 100%)',
            boxShadow: '0 0 16px 3px rgba(57,255,20,0.9), 0 0 35px 8px rgba(57,255,20,0.5)',
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24px] h-[340px] z-[250] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(57,255,20,0.25) 30%, rgba(57,255,20,0.55) 50%, rgba(57,255,20,0.25) 70%, transparent 100%)',
            filter: 'blur(6px)',
          }}
        />
      </div>

      <div className="text-center mt-3 pointer-events-none">
        <span className="text-[11px] font-mono text-muted/60 tracking-widest uppercase">
          ✦ Drag to swing &bull; 3D perspective fan gallery ✦
        </span>
      </div>
    </div>
  )
}
