import { useEffect, useRef } from 'react'

export function GlobalLighting() {
  const lightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const light = lightRef.current
    if (!light) return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      light.style.setProperty('--light-x', `${x}%`)
      light.style.setProperty('--light-y', `${y}%`)
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return <div ref={lightRef} className="global-lighting" aria-hidden="true" />
}
