'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import ProjectCard from './ProjectCard'
import SplitReveal from './SplitReveal'
import { CONTENT } from '@/content'
import type { Project } from '@/lib/projects'

interface Props {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const frameRotate = useTransform(scrollYProgress, [0, 1], [-10, 22])
  const [activeFilter, setActiveFilter] = useState(CONTENT.projects.filter_all)
  const [showAll, setShowAll] = useState(false)
  const [grid, setGrid] = useState(1)
  useEffect(() => {
    const saved = sessionStorage.getItem('portfolio-filter')
    if (saved && CONTENT.categories.includes(saved)) setActiveFilter(saved)
  }, [])

  const filtered =
    activeFilter === CONTENT.projects.filter_all
      ? projects
      : projects.filter((p) => p.category === activeFilter)
  const visibleProjects = showAll ? filtered : filtered.slice(0, 20)

  useEffect(() => {
    if (filtered.length < 4) return
    const interval = window.setInterval(() => setGrid((current) => (current % 4) + 1), 4600)
    return () => window.clearInterval(interval)
  }, [filtered.length])

  const selectFilter = (category: string) => {
    setActiveFilter(category)
    setShowAll(false)
    setGrid(1)
    sessionStorage.setItem('portfolio-filter', category)
  }

  return (
    <section id="projects" ref={sectionRef} className="orbit-projects">
      <motion.div className="orbit-project-frame" style={{ rotate: frameRotate }} aria-hidden="true" />
      <div className="orbit-projects-inner">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="orbit-project-heading"
      >
        <p className="orbit-kicker">
          {CONTENT.projects.eyebrow}
        </p>
        <div className="orbit-project-heading-row">
          <h2 className="orbit-project-title">
            <span className="orbit-project-title-outline"><SplitReveal text={CONTENT.projects.headline1} triggerOnView /></span>
            <br />
            <SplitReveal text={CONTENT.projects.highlight} accent triggerOnView />
          </h2>
          <p className="orbit-project-subtext whitespace-pre-line">
            {CONTENT.projects.subtext}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="orbit-filter-list"
      >
        {CONTENT.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => selectFilter(cat)}
            aria-pressed={activeFilter === cat}
            className={`orbit-filter ${
              activeFilter === cat
                ? 'is-active'
                : ''
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
          className="orbit-project-grid"
          data-grid={grid}
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
        <div className="orbit-more-wrap">
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
        className="orbit-project-end-rule"
      />
      </div>
    </section>
  )
}
