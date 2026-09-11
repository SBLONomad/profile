'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        scroll={true}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative block cursor-pointer"
        aria-label={`${project.title} 자세히 보기`}
      >
      <div
        className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/10"
        style={{ aspectRatio: index % 4 === 0 ? '4/5' : '16/11' }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            if (target.parentElement) {
              target.parentElement.classList.add('bg-gradient-to-br', 'from-zinc-900', 'via-zinc-800', 'to-emerald-950')
            }
          }}
        />

        <motion.div
          className="absolute inset-0 bg-black/60 flex flex-col justify-end p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="text-neon font-mono text-[11px] tracking-wider uppercase mb-1.5"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            {project.category}
          </motion.span>
          <motion.p
            className="text-white/90 text-xs sm:text-sm leading-relaxed"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: hovered
              ? 'inset 0 0 0 1.5px rgba(57,255,20,0.7), 0 0 25px rgba(57,255,20,0.15)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.05)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-white font-display font-semibold text-base leading-tight group-hover:text-neon transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted text-xs mt-1">{project.category}</p>
        </div>
        <span className="text-muted-2 font-mono text-xs mt-0.5 shrink-0 bg-white/5 px-2 py-0.5 rounded border border-white/5">
          {project.year}
        </span>
      </div>
      </Link>
    </motion.article>
  )
}
