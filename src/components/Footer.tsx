'use client'

import { motion } from 'framer-motion'
import { CONTENT } from '@/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 md:px-10 bg-black/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="flex items-center gap-2 text-white font-display font-bold text-base"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-neon shadow-[0_0_8px_#39FF14]" />
          {CONTENT.footer.logo}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
          className="text-muted-2 font-mono text-xs text-center"
        >
          {CONTENT.footer.copyright}
        </motion.p>

        {CONTENT.footer.social.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="flex gap-5"
          >
            {CONTENT.footer.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-2 font-body text-xs hover:text-neon transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </footer>
  )
}
