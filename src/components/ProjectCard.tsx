'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Project } from '@/lib/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer"
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden rounded-2xl bg-surface"
        style={{ aspectRatio: index % 5 === 0 ? '4/5' : index % 3 === 0 ? '16/10' : '4/5' }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 flex flex-col justify-end p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.span
            className="text-neon font-mono text-xs tracking-widest uppercase mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {project.category}
          </motion.span>
          <motion.p
            className="text-white/80 text-sm leading-relaxed"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        </motion.div>

        {/* Neon border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: hovered
              ? 'inset 0 0 0 1px rgba(57,255,20,0.5), 0 0 30px rgba(57,255,20,0.15)'
              : 'inset 0 0 0 1px transparent',
          }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* Card info */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="text-white font-display font-semibold text-base md:text-lg leading-tight group-hover:text-neon transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted text-sm mt-0.5">{project.category}</p>
        </div>
        <span className="text-muted-2 font-mono text-xs mt-1 shrink-0">{project.year}</span>
      </div>
    </motion.article>
  )
}
