'use client'

import { useEffect, useRef } from 'react'
import AnimatedNumber from './AnimatedNumber'
import { CONTENT } from '@/content'

export default function Intro() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = root.current?.querySelectorAll<HTMLElement>('.intro-appear')
    const finish = (event: Event) => {
      if (event.target instanceof HTMLElement) event.target.classList.add('is-in')
    }
    elements?.forEach(el => el.addEventListener('animationend', finish))
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => elements?.forEach(el => {
        if (!el.getAnimations().some(a => ['running', 'finished'].includes(a.playState))) el.classList.add('is-in')
      }))
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
      elements?.forEach(el => el.removeEventListener('animationend', finish))
    }
  }, [])

  return (
    <div id="top" ref={root} className="portfolio-intro">
      <div className="intro-copy">
        <p className="intro-badge intro-appear intro-pop">{CONTENT.hero.eyebrow}</p>
        <h1>
          <span className="intro-mask"><span className="intro-appear intro-line">{CONTENT.hero.headline1}</span></span>
          <span className="intro-mask"><span className="intro-appear intro-line intro-accent">{CONTENT.hero.headline2}</span></span>
        </h1>
        <p className="intro-lede intro-appear intro-soft">{CONTENT.hero.subtext1}<br />{CONTENT.hero.subtext2}</p>
        <div className="intro-actions">
          <a className="liquid-button liquid-solid intro-appear intro-button" href="#projects">{CONTENT.hero.cta_primary}</a>
          <a className="liquid-button intro-appear intro-side" href="#contact">{CONTENT.hero.cta_secondary}</a>
        </div>
      </div>
      <div className="intro-stats">
        {CONTENT.about.stats.slice(0, 3).map((stat, index) => (
          <p key={stat.label} className="intro-stat">
            <strong><AnimatedNumber value={stat.value} duration={.55 + index * .06} /></strong><span>{stat.label}</span>
          </p>
        ))}
      </div>
    </div>
  )
}
