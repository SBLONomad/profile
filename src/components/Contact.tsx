'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const EMAIL = 'hello@yourportfolio.com'

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden"
    >
      {/* Neon glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 100%, rgba(57,255,20,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-neon font-mono text-xs tracking-[0.3em] uppercase mb-5"
        >
          ✦ &nbsp;Let&apos;s Collaborate
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
        >
          Have a project
          <br />
          in mind?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted text-base md:text-lg leading-relaxed mb-12 max-w-md mx-auto"
        >
          I&apos;m always open to discussing new projects, creative ideas,
          or opportunities to be part of your vision.
        </motion.p>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 border border-white/10 rounded-full
                       px-6 py-3.5 text-white font-display font-medium text-sm
                       hover:border-neon/50 hover:text-neon transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            {EMAIL}
            <span className="text-muted group-hover:text-neon transition-colors">
              {copied ? '✓' : '⎘'}
            </span>
          </button>

          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 bg-neon text-black font-display
                       font-semibold text-sm px-8 py-3.5 rounded-full
                       hover:brightness-110 transition-all duration-300 group
                       shadow-lg shadow-neon/20"
          >
            Send Email
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'Instagram', href: 'https://instagram.com' },
            { label: 'Behance', href: 'https://behance.net' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted text-sm font-body hover:text-neon transition-colors duration-300
                         relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
