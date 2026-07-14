import { useEffect, useRef, useCallback } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const trailPositionsRef = useRef<{ x: number; y: number }[]>([])

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const updateCursor = useCallback((e: MouseEvent) => {
    targetRef.current.x = e.clientX
    targetRef.current.y = e.clientY
  }, [])

  const handleHoverableEnter = useCallback(() => {
    if (cursorRef.current) cursorRef.current.classList.add('custom-cursor--hover')
  }, [])

  const handleHoverableLeave = useCallback(() => {
    if (cursorRef.current) cursorRef.current.classList.remove('custom-cursor--hover')
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    document.documentElement.style.cursor = 'none'
    document.body.style.cursor = 'none'

    const style = document.createElement('style')
    style.textContent = `
      a, button, [role="button"], input, select, textarea,
      .navbar__link, .hero__cta, .final-cta__button,
      .event-brief__brochure-cta, .venue__maps-cta,
      .circuit-card, .faculty__card, .contact__card,
      .protocol-card__trigger, .accordion__trigger,
      .stats__prize-teaser, .navbar__mobile-link,
      .navbar__cta, .footer__link, .intro__skip {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    document.addEventListener('mousemove', updateCursor, { passive: true })

    const hoverables = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea'
    )
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverableEnter)
      el.addEventListener('mouseleave', handleHoverableLeave)
    })

    return () => {
      document.documentElement.style.cursor = ''
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', updateCursor)
      document.head.removeChild(style)
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverableEnter)
        el.removeEventListener('mouseleave', handleHoverableLeave)
      })
      cancelAnimationFrame(rafRef.current)
    }
  }, [isTouchDevice, updateCursor, handleHoverableEnter, handleHoverableLeave])

  useEffect(() => {
    if (isTouchDevice) return

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 5}px, ${posRef.current.y - 5}px)`
      }

      trailPositionsRef.current.unshift({ x: targetRef.current.x, y: targetRef.current.y })
      if (trailPositionsRef.current.length > 15) {
        trailPositionsRef.current.pop()
      }

      if (trailRef.current) {
        const trail = trailRef.current
        const dots = trail.children
        for (let i = 0; i < dots.length; i++) {
          const idx = Math.min(Math.floor(i * 2), trailPositionsRef.current.length - 1)
          const p = trailPositionsRef.current[idx] || trailPositionsRef.current[0] || { x: 0, y: 0 }
          const dot = dots[i] as HTMLElement
          dot.style.transform = `translate(${p.x - 2}px, ${p.y - 2}px)`
          const opacity = 0.25 - (i / dots.length) * 0.25
          dot.style.opacity = String(Math.max(0, opacity))
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
        <div className="custom-cursor__dot" />
        <div className="custom-cursor__ring" />
      </div>
      <div ref={trailRef} className="custom-cursor__trail" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="custom-cursor__trail-dot" />
        ))}
      </div>
    </>
  )
}
