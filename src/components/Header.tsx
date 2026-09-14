'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { CONTENT } from '@/content'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const nav = useRef<HTMLElement>(null)
  const home = usePathname() === '/' ? '' : '/'

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40)
    const resize = () => { if (window.innerWidth >= 901) setMenuOpen(false) }
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    nav.current?.querySelector('a')?.focus()
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); toggle.current?.focus() }
      if (e.key === 'Tab') {
        const links = Array.from(nav.current?.querySelectorAll('a') || [])
        const controls = [...links, toggle.current].filter(Boolean) as HTMLElement[]
        const i = controls.indexOf(document.activeElement as HTMLElement)
        e.preventDefault()
        controls[(i + (e.shiftKey ? -1 : 1) + controls.length) % controls.length]?.focus()
      }
    }
    window.addEventListener('keydown', keydown)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', keydown) }
  }, [menuOpen])

  return (
    <header className={`portfolio-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a href={`${home}#top`} className="portfolio-wordmark" onClick={() => setMenuOpen(false)}>{CONTENT.header.logo}</a>
      <nav ref={nav} id="site-nav" aria-label="주 메뉴" className="portfolio-nav">
        {Object.entries(CONTENT.header.nav).map(([key, label]) => (
          <a key={key} href={key === 'admin' ? '/admin' : `${home}#${key}`} className={`liquid-button ${key === 'admin' ? 'liquid-solid' : ''}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>
      <button ref={toggle} className="portfolio-menu" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </header>
  )
}
