'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import LogoBanner from './LogoBanner'
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
      className="orbit-project-card"
    >
      <Link
        href={`/projects/${project.slug}`}
        scroll={true}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="orbit-project-link"
        aria-label={`${project.title} 자세히 보기`}
      >
      <div
        className="orbit-project-image"
        style={{ aspectRatio: project.thumbnailStyle === 'logo' ? '9/16' : index % 4 === 0 ? '4/5' : '16/11' }}
      >
        {project.thumbnailStyle === 'logo' ? <LogoBanner project={project} /> : (
        <motion.img
          src={project.image}
          alt={project.title}
          className="orbit-project-photo"
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
        )}

        <motion.div
          className="orbit-project-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="orbit-project-category"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            {project.category}
          </motion.span>
          <motion.p
            className="orbit-project-description"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="orbit-project-outline"
          animate={{
            boxShadow: hovered
              ? 'inset 0 0 0 1.5px rgba(57,255,20,0.7), 0 0 25px rgba(57,255,20,0.15)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.05)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="orbit-project-meta">
        <div>
          <h3 className="orbit-project-name">
            {project.title}
          </h3>
          <p className="orbit-project-meta-category">{project.category}</p>
        </div>
        {project.year && <span className="orbit-project-year">
          {project.year}
        </span>}
      </div>
      </Link>
    </motion.article>
  )
}
