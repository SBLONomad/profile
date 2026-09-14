'use client'

import { useEffect, useRef } from 'react'
import AnimatedNumber from './AnimatedNumber'
import { CONTENT } from '@/content'

export default function Intro() {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const waveFrame = useRef<number>()
  const waveDirection = useRef(1)
  const waveLast = useRef<number>()

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopWave = () => {
      if (waveFrame.current) cancelAnimationFrame(waveFrame.current)
      waveFrame.current = undefined
    }
    const startWave = () => {
      const element = video.current
      if (!element || document.hidden || preference.matches || !Number.isFinite(element.duration)) return

      const step = (now: number) => {
        const current = video.current
        if (!current || document.hidden || preference.matches) return
        const elapsed = Math.min((now - (waveLast.current ?? now)) / 1000, 0.05)
        waveLast.current = now
        const duration = current.duration
        let nextTime = current.currentTime + elapsed * waveDirection.current
        if (nextTime >= duration) {
          nextTime = duration
          waveDirection.current = -1
        } else if (nextTime <= 0) {
          nextTime = 0
          waveDirection.current = 1
        }
        current.currentTime = nextTime
        waveFrame.current = requestAnimationFrame(step)
      }

      stopWave()
      element.pause()
      waveLast.current = undefined
      waveFrame.current = requestAnimationFrame(step)
    }
    const update = () => {
      if (preference.matches || document.hidden) {
        stopWave()
        video.current?.pause()
      } else {
        startWave()
      }
    }
    video.current?.addEventListener('loadedmetadata', startWave)
    update()
    preference.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      stopWave()
      preference.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
      video.current?.removeEventListener('loadedmetadata', startWave)
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
            <strong><AnimatedNumber value={stat.value} duration={1.4 + index * .15} /></strong><span>{stat.label}</span>
          </p>
        ))}
      </div>
    </div>
  )
}
