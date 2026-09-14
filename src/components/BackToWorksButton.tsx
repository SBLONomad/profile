'use client'

export default function BackToWorksButton() {
  return (
    <a
      href="/#projects"
      className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-neon transition-colors"
    >
      <span aria-hidden="true">←</span>
      작업물로 돌아가기
    </a>
  )
}
