'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-white font-display font-bold text-base"
        >
          <span className="w-2 h-2 rounded-full bg-neon" />
          PORTFOLIO
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-2 font-mono text-xs"
        >
          © {year} All rights reserved. Built with Next.js &amp; Framer Motion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex gap-5"
        >
          {['GitHub', 'Instagram', 'Behance'].map((s) => (
            <a
              key={s}
              href="#"
              className="text-muted-2 font-body text-xs hover:text-neon transition-colors duration-300"
            >
              {s}
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  )
}
