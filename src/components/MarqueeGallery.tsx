'use client'

import type { Project } from '@/lib/projects'

interface Props {
  projects: Project[]
  direction?: 'left' | 'right'
  speed?: number   // seconds for one full cycle
  className?: string
}

export default function MarqueeGallery({
  projects,
  direction = 'left',
  speed = 38,
  className = '',
}: Props) {
  // Triple the items so the loop is seamless on any screen width
  const items = [...projects, ...projects, ...projects]

  const animationStyle = {
    animationName: direction === 'left' ? 'marquee-left' : 'marquee-right',
    animationDuration: `${speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    willChange: 'transform',
  } as React.CSSProperties

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080808 0%, transparent 100%)' }}
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080808 0%, transparent 100%)' }}
      />

      <div
        className="marquee-track flex gap-4 md:gap-5 w-max"
        style={animationStyle}
      >
        {items.map((project, i) => (
          <MarqueeCard key={`${project.slug}-${i}`} project={project} />
        ))}
      </div>
    </div>
  )
}

function MarqueeCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative shrink-0 overflow-hidden rounded-2xl cursor-pointer"
      style={{ width: 200, height: 290 }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover
                   transition-transform duration-700 ease-out
                   group-hover:scale-[1.06]"
        loading="lazy"
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
        }}
      />

      {/* Info — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4
                   translate-y-2 opacity-0
                   group-hover:translate-y-0 group-hover:opacity-100
                   transition-all duration-300 ease-out"
      >
        <p className="text-neon font-mono text-[10px] tracking-widest uppercase mb-1">
          {project.category}
        </p>
        <p className="text-white font-display font-semibold text-sm leading-snug line-clamp-2">
          {project.title}
        </p>
      </div>

      {/* Neon border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-300"
        style={{ boxShadow: 'inset 0 0 0 1.5px rgba(57,255,20,0.6), 0 0 25px rgba(57,255,20,0.12)' }}
      />
    </div>
  )
}
