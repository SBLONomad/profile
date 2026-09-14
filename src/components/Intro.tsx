'use client'

import { useEffect, useRef } from 'react'
import { CONTENT } from '@/content'

export default function Intro() {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reverseFrame = useRef<number>()
  const reversing = useRef(false)
  const reverseLast = useRef<number>()

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopReverse = () => {
      if (reverseFrame.current) cancelAnimationFrame(reverseFrame.current)
      reverseFrame.current = undefined
    }
    const reverse = () => {
      const element = video.current
      if (!element || document.hidden || preference.matches) return

      const step = (now: number) => {
        const current = video.current
        if (!current || document.hidden || preference.matches) return
        const elapsed = Math.min((now - (reverseLast.current ?? now)) / 1000, 0.05)
        reverseLast.current = now
        current.currentTime = Math.max(0, current.currentTime - elapsed)
        if (current.currentTime <= 0.02) {
          current.currentTime = 0
          reversing.current = false
          current.play().catch(() => {})
          return
        }
        reverseFrame.current = requestAnimationFrame(step)
      }

      stopReverse()
      reversing.current = true
      element.pause()
      reverseLast.current = undefined
      reverseFrame.current = requestAnimationFrame(step)
    }
    const update = () => {
      if (preference.matches || document.hidden) {
        stopReverse()
        video.current?.pause()
      } else if (reversing.current) {
        reverse()
      } else {
        video.current?.play().catch(() => {})
      }
    }
    update()
    preference.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    video.current?.addEventListener('ended', reverse)
    return () => {
      stopReverse()
      preference.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
      video.current?.removeEventListener('ended', reverse)
    }
  }, [])

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
      <video ref={video} className="intro-wave" src="/hero-wave.mp4" muted playsInline preload="auto" aria-hidden="true" />
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
          <p key={stat.label} className="intro-appear intro-stat" style={{ animationDelay: `${1.12 + index * .16}s` }}>
            <strong>{stat.value}</strong><span>{stat.label}</span>
          </p>
        ))}
      </div>
    </div>
  )
}
