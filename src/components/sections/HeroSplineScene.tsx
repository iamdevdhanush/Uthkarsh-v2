import { useEffect, useState, useRef } from 'react'

const SPLINE_URL =
  'https://my.spline.design/nexbotbyaximoriscopycopy-VS8SuwNGnNCrVZcFiWCXRJiG/'

interface Props {
  reducedMotion: boolean
}

/**
 * Safe, isolated Spline 3D robot integration using a plain iframe.
 *
 * Design decisions:
 * - Plain iframe instead of @splinetool/react-spline SDK.
 *   The SDK (v4.1.0) calls `throw error` in its render cycle when the
 *   scene fails to load, crashing the entire React tree (blank page).
 *   An iframe is fully sandboxed — any Spline failure stays inside it.
 * - Never uses position:fixed or arbitrary z-index values.
 * - Mobile: hidden below 768px via CSS (.hero__side display:none) —
 *   the mobile layout re-exposes it via .hero__side--mobile in CSS.
 * - Loading placeholder shown until iframe fires onLoad.
 * - Error state shown if iframe fails to load within 20s.
 */
export function HeroSplineScene({ reducedMotion }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // 20-second safety timeout — if spline takes too long or fails silently
    timerRef.current = setTimeout(() => {
      if (!loaded) setTimedOut(true)
    }, 20000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [loaded])

  const handleLoad = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setLoaded(true)
    setTimedOut(false)
  }

  // If reduced motion is requested, skip the heavy 3D scene
  if (reducedMotion) return null

  return (
    <div className="hero__spline" role="presentation" aria-hidden="true">
      <div className="hero__spline-glow" />
      <div
        className={`hero__spline-inner${loaded ? ' hero__spline-inner--loaded' : ''}`}
      >
        {/* Loading placeholder — only shown while iframe is initialising */}
        {!loaded && !timedOut && (
          <div className="hero__spline-loading" aria-hidden="true">
            <span className="hero__spline-loading-text">
              INITIALIZING VISUAL SYSTEM
            </span>
            <span className="hero__spline-loading-bar" />
          </div>
        )}

        {/*
         * The iframe is always in the DOM so it loads in the background.
         * opacity:0 until loaded → avoids flash of white.
         * pointer-events on the wrapper are set to none in CSS;
         * the iframe itself re-enables them so the 3D scene is interactive.
         */}
        {!timedOut && (
          <iframe
            src={SPLINE_URL}
            title="UTKARSH 26 Interactive 3D Robot"
            frameBorder="0"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className={`hero__spline-iframe${loaded ? ' hero__spline-iframe--loaded' : ''}`}
            onLoad={handleLoad}
          />
        )}
      </div>
    </div>
  )
}
