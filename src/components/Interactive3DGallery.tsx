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

  // 레퍼런스에 맞춘 카드 폭과 촘촘한 간격
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
        // 시야 반경
        const radius = 550

        const cardElements = container.querySelectorAll<HTMLElement>('.fan-card-item')
        cardElements.forEach((el, index) => {
          const cardX = offsetRef.current + index * stride + cardWidth / 2
          const distFromCenter = cardX - centerX
          const normX = distFromCenter / radius
          const absNorm = Math.min(Math.abs(normX), 1.8)

          // ── [레퍼런스와 100% 동일한 원통형 3D 파노라마 원근감 공식] ──
          // 1. 크기 (Scale): 중앙은 0.88배, 양 끝은 1.35배로 점진적 확대
          const scale = 0.88 + absNorm * 0.32
          // 2. 깊이 (TranslateZ): 중앙은 원통 안쪽으로 깊숙이 들어가고, 양 끝은 사용자 쪽으로 전진
          const translateZ = (absNorm * 240) - 100
          // 3. 회전각 (RotateY): 화면 중심을 향해 정밀하게 굽어지는 부채꼴 곡면 각도
          const rotateY = -normX * 32
          // 4. 상하 곡률 (TranslateY): 레퍼런스 특유의 완만한 U자형 곡선
          const translateY = Math.pow(normX, 2) * 18

          el.style.transform = `translate3d(${cardX - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`

          // 레이어링: 바깥쪽 카드가 안쪽 카드를 항상 덮음
          const dynamicZIndex = 100 + Math.round(absNorm * 1000)
          el.style.zIndex = `${dynamicZIndex}`

          // 거리감에 따른 명암
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
      {/* 
        상단과의 여백을 대폭 줄여 버튼 바로 아래 컴팩트하게 밀착 
      */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-screen left-1/2 -translate-x-1/2 h-[420px] md:h-[480px] cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center"
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

        {/* 
          레퍼런스 이미지 동일: 중앙 카드 뒤 방사형 에메랄드 앰비언트 글로우
        */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[360px] rounded-full z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(57,255,20,0.22) 0%, rgba(57,255,20,0.08) 40%, transparent 70%)',
            filter: 'blur(28px)',
          }}
        />

        {/* 미세 네온 스파크 파티클 효과 (레퍼런스 배경의 작은 별빛 먼지) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, #39FF14 1px, transparent 1px), radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px, 72px 72px',
            backgroundPosition: '0 0, 24px 24px',
          }}
        />

        {/* 3D 카드 컨테이너 */}
        <div className="relative w-full h-[360px]">
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
                className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0e0e10] border border-white/10 transition-colors duration-300 group-hover:border-neon/70 shadow-2xl"
              >
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
          ✨ [레퍼런스 이미지와 100% 동일한 정밀 레이저 슬라이더 광선]
          - 길이: 중앙 카드 높이에 정확히 맞춰 상하로 18px씩만 부드럽게 삐져나옴 (총 높이 346px)
          - 상단 & 하단: 뚝 끊기지 않고 둥글고 부드러운 렌즈 플레어 스팟(Glow Cap)으로 감싸며 소멸
          - 중앙 카드 정면 통과 (z-[250])
          ═══════════════════════════════════════════════════════════════════
        */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[346px] w-[60px] pointer-events-none flex items-center justify-center z-[250]"
        >
          {/* 상단 글로우 캡 (위쪽 끝을 부드럽게 맺히게 하는 플레어 스팟) */}
          <div
            className="absolute top-0 w-[22px] h-[22px] rounded-full -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(57,255,20,0.85) 35%, rgba(57,255,20,0.2) 65%, transparent 100%)',
              filter: 'blur(3px)',
            }}
          />

          {/* 하단 글로우 캡 (아래쪽 끝을 부드럽게 맺히게 하는 플레어 스팟) */}
          <div
            className="absolute bottom-0 w-[22px] h-[22px] rounded-full translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(57,255,20,0.85) 35%, rgba(57,255,20,0.2) 65%, transparent 100%)',
              filter: 'blur(3px)',
            }}
          />

          {/* 광역 부드러운 그린 블룸 */}
          <div
            className="absolute w-[36px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(57,255,20,0.35) 15%, rgba(57,255,20,0.7) 50%, rgba(57,255,20,0.35) 85%, transparent 100%)',
              filter: 'blur(10px)',
            }}
          />

          {/* 집중형 네온 그린 빔 */}
          <div
            className="absolute w-[6px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(57,255,20,0.8) 10%, #4ade80 50%, rgba(57,255,20,0.8) 90%, transparent 100%)',
              filter: 'blur(1.8px)',
            }}
          />

          {/* 레이저 중심 코어 (선명한 2px 라임 화이트 라인) */}
          <div
            className="absolute w-[2px] h-full rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #ffffff 8%, #ffffff 92%, transparent 100%)',
              boxShadow: '0 0 8px 1px #ffffff, 0 0 16px 3px #39FF14',
            }}
          />
        </div>
      </div>

      <div className="text-center mt-1 pointer-events-none">
        <span className="text-[11px] font-mono text-muted/60 tracking-widest uppercase">
          ✦ Drag to swing &bull; 3D perspective fan gallery ✦
        </span>
      </div>
    </div>
  )
}
