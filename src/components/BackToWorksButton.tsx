'use client'

import { useRouter } from 'next/navigation'

export default function BackToWorksButton() {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push('/#projects')
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-neon transition-colors"
    >
      <span aria-hidden="true">←</span>
      작업물로 돌아가기
    </button>
  )
}
