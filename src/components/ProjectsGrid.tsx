'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import type { Project } from '@/lib/projects'

interface Props {
  projects: Project[]
}

const CATEGORIES = ['All', 'Digital Art', 'Photography', 'Branding', 'Editorial', 'Concept Art', 'Product Design']

export default function ProjectsGrid({ projects }: Props) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <p className="text-neon font-mono text-xs tracking-[0.25em] uppercase mb-4">
          ✦ Selected Works
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-xl">
            Projects That
            <br />
            <span className="text-neon">Define</span> My Vision
          </h2>
          <p className="text-muted text-base max-w-xs leading-relaxed">
            A curated selection of work spanning digital art, branding, and creative direction.
          </p>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-12"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-neon text-black'
                : 'border border-white/10 text-muted hover:border-neon/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Masonry-style grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-24 text-muted"
            >
              <p className="text-4xl mb-4">◌</p>
              <p className="font-display text-lg">No projects in this category yet.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative bottom rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
      />
    </section>
  )
}
