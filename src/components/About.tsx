'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SKILLS = [
  'Visual Design', 'Brand Identity', 'Digital Art', 'Motion Graphics',
  'Typography', 'UI/UX Design', 'Photography', 'Creative Direction',
]

const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: '80+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '12', label: 'Awards Won' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const yImage = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-36 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute -right-64 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div style={{ y: yImage }} className="relative">
              {/* Profile image placeholder */}
              <div
                className="relative w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-3xl"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top right, rgba(57,255,20,0.15) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Floating neon badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -right-4 glass rounded-2xl px-5 py-4 text-center"
              >
                <div className="text-neon font-display font-bold text-2xl">2024</div>
                <div className="text-muted text-xs mt-0.5">Available for work</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-neon font-mono text-xs tracking-[0.25em] uppercase mb-4">
              ✦ About Me
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-6">
              Crafting Visual
              <br />
              Experiences That
              <br />
              <span className="text-neon">Resonate</span>
            </h2>
            <p className="text-muted text-base leading-relaxed mb-6">
              I'm a visual designer and creative director with over 5 years of experience
              pushing the boundaries of digital aesthetics. My work lives at the intersection
              of art, technology, and storytelling.
            </p>
            <p className="text-muted text-base leading-relaxed mb-10">
              From brand identities for tech startups to editorial visuals for global publications,
              I approach every project with the same obsessive attention to detail and relentless
              pursuit of the extraordinary.
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {SKILLS.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="text-sm font-body text-muted border border-white/10 px-3 py-1.5 rounded-full hover:border-neon/40 hover:text-neon transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/5 pt-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  <div className="text-white font-display font-bold text-2xl md:text-3xl">{stat.value}</div>
                  <div className="text-muted text-xs mt-1 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
