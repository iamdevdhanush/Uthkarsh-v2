'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const GRID_SPACING = 64

export function AmbientGrid() {
  const reducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const isMobile = window.innerWidth < 768
    const spacing = isMobile ? GRID_SPACING * 1.5 : GRID_SPACING
    const speed = isMobile ? 0.1 : 0.15

    const draw = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1

      for (let i = 0; i < cols; i++) {
        const x = i * spacing + ((time * speed * 30) % spacing)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.strokeStyle = 'rgba(9, 9, 9, 0.04)'
        ctx.lineWidth = isMobile ? 0.5 : 1
        ctx.stroke()
      }

      for (let i = 0; i < rows; i++) {
        const y = i * spacing + ((time * speed * 20) % spacing)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.strokeStyle = 'rgba(9, 9, 9, 0.04)'
        ctx.lineWidth = isMobile ? 0.5 : 1
        ctx.stroke()
      }

      if (!isMobile) {
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * spacing + ((time * speed * 30) % spacing)
            const y = j * spacing + ((time * speed * 20) % spacing)
            const pulse = Math.sin(time * 2 + i * 0.5 + j * 0.5) * 0.5 + 0.5
            if (pulse > 0.85) {
              ctx.fillStyle = `rgba(255, 77, 0, ${pulse * 0.06})`
              ctx.fillRect(x - 1, y - 1, 2, 2)
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  )
}
