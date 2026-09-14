import type { Project } from '@/lib/projects'

export default function LogoBanner({ project }: { project: Project }) {
  const bounds = project.logoBounds
  return (
    <div className="logo-banner" role="img" aria-label={`${project.title} 로고`}>
      {bounds && bounds.width > 0 && bounds.height > 0 && bounds.sourceWidth > 0 && bounds.sourceHeight > 0 ? (
        <svg viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <image href={project.image} width={bounds.sourceWidth} height={bounds.sourceHeight} />
        </svg>
      ) : <img src={project.image} alt="" className="w-[72%] max-h-[24%] object-contain" loading="lazy" />}
    </div>
  )
}
