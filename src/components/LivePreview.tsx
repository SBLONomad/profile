'use client'

import { useState } from 'react'

interface Props {
  url: string
  title: string
}

export default function LivePreview({ url, title }: Props) {
  const [device, setDevice] = useState<'pc' | 'mo'>('pc')

  return (
    <section className="mb-14">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <p className="text-neon font-mono text-xs tracking-[0.25em] uppercase mb-2">
            Live Publishing
          </p>
          <p className="text-zinc-300 text-sm md:text-base">
            HTML/CSS/JavaScript로 직접 퍼블리싱한 실제 페이지입니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex rounded-full border border-white/15 p-1">
            {(['pc', 'mo'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDevice(item)}
                aria-pressed={device === item}
                className={`rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors ${
                  device === item ? 'bg-neon text-black' : 'text-muted hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-mono text-white hover:border-neon hover:text-neon transition-colors"
          >
            새 창에서 보기 ↗
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
        <iframe
          key={device}
          src={url}
          title={`${title} 퍼블리싱 페이지`}
          loading="lazy"
          allow="autoplay; fullscreen"
          className="block mx-auto h-[80vh] bg-black transition-[width] duration-500"
          style={{ width: device === 'pc' ? '100%' : 'min(100%, 390px)' }}
        />
      </div>
    </section>
  )
}
