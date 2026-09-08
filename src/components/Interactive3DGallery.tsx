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

          // 3D 오목 원근감: 중앙은 0.72배, 양 끝은 1.62배
          const scale = 0.72 + absNorm * 0.58
          const translateZ = (absNorm * 300) - 180
          const rotateY = -normX * 38
          const translateY = Math.pow(absNorm, 2) * 16

          el.style.transform = `translate3d(${cardX - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`

          // 좌측: 왼쪽 끝 카드가 최상단, 우측: 오른쪽 끝 카드가 최상단
          const dynamicZIndex = 100 + Math.round(absNorm * 1000)
          el.style.zIndex = `${dynamicZIndex}`

          const innerShine = el.querySelector<HTMLElement>('.card-vignette')
          if (innerShine) {
            const opacity = Math.max(0, 0.45 - absNorm * 0.25)
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
    <div className="relative w-full overflow-hidden select-none py-12 md:py-20">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-screen left-1/2 -translate-x-1/2 h-[520px] md:h-[620px] cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center"
        style={{
          perspective: '700px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 좌우 가장자리 소프트 페이드아웃 마스크 */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-[2000] pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000000 20%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-[2000] pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000000 20%, transparent 100%)' }}
        />

        {/* ── 3D 카드 컨테이너 ── */}
        <div className="relative w-full h-[420px]">
          {items.map((project, idx) => (
            <div
              key={`${project.slug}-${idx}`}
              className="fan-card-item absolute top-0 left-0 will-change-transform group cursor-pointer"
              style={{
                width: `${cardWidth}px`,
                height: '320px',
                transformOrigin: '50% 50%',
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 transition-colors duration-300 group-hover:border-neon/70 shadow-2xl"
              >
                {/* 작품 이미지 (로드 실패 시 다크 럭셔리 사이버 아트워크 그라디언트 배경으로 매끄럽게 처리) */}
                <img
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
                />

                <div className="card-vignette absolute inset-0 pointer-events-none transition-colors duration-300" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)',
                  }}
                />

                {/* 네온 테두리 글로우 */}
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
            </div>
          ))}
        </div>

        {/* 
          ═══════════════════════════════════════════════════════════════════
          💎 [15년차 UI/UX 디자이너 스펙: 하이엔드 네온 레이저 블룸 시스템]
          - 중앙 카드 앞으로 완벽하게 돌출 (`z-[250]`)
          - 상/하단이 뚝 잘리는 인위적 경계선 100% 박멸 (CSS Mask 부드러운 가우스 페이드)
          - 코어(순백색 레이저) + 1차 네온 글로우 + 광역 에메랄드 블룸 3중 레이어링
          ═══════════════════════════════════════════════════════════════════
        */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[160px] pointer-events-none flex items-center justify-center z-[250]"
          style={{
            // 상/하단 0%에서 100%까지 완벽하게 안개처럼 감쇠하여 사라지게 만드는 마스크
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.9) 30%, black 50%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.05) 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.9) 30%, black 50%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.05) 90%, transparent 100%)',
          }}
        >
          {/* 3차 광역 에메랄드 앰비언트 블룸 (가장 넓게 퍼지는 공기 중 산란광) */}
          <div
            className="absolute w-[120px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(57,255,20,0.22) 40%, rgba(34,197,94,0.3) 50%, rgba(57,255,20,0.22) 60%, transparent)',
              filter: 'blur(32px)',
            }}
          />

          {/* 2차 미디엄 네온 그린 글로우 */}
          <div
            className="absolute w-[28px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 5%, rgba(57,255,20,0.5) 35%, rgba(57,255,20,0.95) 50%, rgba(57,255,20,0.5) 65%, transparent 95%)',
              filter: 'blur(8px)',
            }}
          />

          {/* 1차 하이인텐시티 그린 아우라 */}
          <div
            className="absolute w-[8px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 10%, rgba(57,255,20,0.8) 35%, #86efac 50%, rgba(57,255,20,0.8) 65%, transparent 90%)',
              filter: 'blur(2.5px)',
            }}
          />

          {/* 초정밀 순백색 레이저 중심 코어 (검은 선 절대 없음, 순수한 빛의 중심선) */}
          <div
            className="absolute w-[1.5px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 15%, rgba(255,255,255,0.7) 35%, #ffffff 50%, rgba(255,255,255,0.7) 65%, transparent 85%)',
              boxShadow: '0 0 10px 1px #ffffff, 0 0 20px 3px #39FF14',
            }}
          />
        </div>
      </div>

      <div className="text-center mt-3 pointer-events-none">
        <span className="text-[11px] font-mono text-muted/60 tracking-widest uppercase">
          ✦ Drag to swing &bull; 3D perspective fan gallery ✦
        </span>
      </div>
    </div>
  )
}
