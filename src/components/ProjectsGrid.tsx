'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { CONTENT } from '@/content'
import type { Project } from '@/lib/projects'

interface Props {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: Props) {
  const [activeFilter, setActiveFilter] = useState(CONTENT.projects.filter_all)
  const [showAll, setShowAll] = useState(false)
  useEffect(() => {
    const saved = sessionStorage.getItem('portfolio-filter')
    if (saved && CONTENT.categories.includes(saved)) setActiveFilter(saved)
  }, [])

  const filtered =
    activeFilter === CONTENT.projects.filter_all
      ? projects
      : projects.filter((p) => p.category === activeFilter)
  const visibleProjects = showAll ? filtered : filtered.slice(0, 20)

  const selectFilter = (category: string) => {
    setActiveFilter(category)
    setShowAll(false)
    sessionStorage.setItem('portfolio-filter', category)
  }

  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <p className="text-neon font-mono text-xs tracking-[0.25em] uppercase mb-4">
          {CONTENT.projects.eyebrow}
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-xl">
            {CONTENT.projects.headline1}
            <br />
            <span className="text-neon">{CONTENT.projects.highlight}</span>
          </h2>
          <p className="text-muted text-base max-w-sm leading-relaxed whitespace-pre-line">
            {CONTENT.projects.subtext}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap gap-2.5 mb-12"
      >
        {CONTENT.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => selectFilter(cat)}
            aria-pressed={activeFilter === cat}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-neon text-black font-semibold shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                : 'border border-white/10 bg-white/5 text-muted hover:border-neon/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 text-muted"
            >
              <p className="text-3xl mb-3 text-neon">✦</p>
              <p className="font-display text-base text-zinc-400">{CONTENT.projects.empty_state}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {filtered.length > 20 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="liquid-button px-7"
          >
            {showAll ? CONTENT.projects.show_less : `${CONTENT.projects.show_more} (${filtered.length - 20})`}
          </button>
        </div>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
      />
    </section>
  )
}
