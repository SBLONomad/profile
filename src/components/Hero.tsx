'use client'

import { motion } from 'framer-motion'
import Interactive3DGallery from './Interactive3DGallery'
import Intro from './Intro'
import { CONTENT } from '@/content'
import type { Project } from '@/lib/projects'

export default function Hero({ projects }: { projects: Project[] }) {
  return (
    <section className="relative overflow-hidden">
      <Intro />
      {/* ── 2. 원근감 3D 롤링 갤러리 (버튼 바로 아래 컴팩트하게 밀착) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full -mt-2 md:-mt-4"
      >
        <Interactive3DGallery projects={projects} />
      </motion.div>

      {/* ── 3. 3컬럼 Feature 그리드 ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 mt-2 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-white/10 pt-10"
      >
        {CONTENT.features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center justify-start p-3 md:min-h-[220px]">
            <span className="text-2xl mb-2.5 block p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {feature.icon}
            </span>
            <h3 className="text-white font-display font-semibold text-base md:text-lg leading-snug mb-1.5 whitespace-pre-line">
              {feature.title}
            </h3>
            <p className="text-muted text-[13px] leading-relaxed max-w-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
