import { useEffect, useState, lazy } from 'react'
import type { Application } from '@splinetool/runtime'

const SplineScene = lazy(() => import('@splinetool/react-spline'))

const SPLINE_URL = 'https://my.spline.design/nexbotbyaximoriscopycopy-sQ3Hkn2BS6tqpuNyI5a6IXQw/'

interface Props {
  reducedMotion: boolean
}

export function HeroSplineScene({ reducedMotion }: Props) {
  const [canRender, setCanRender] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const check = () => setCanRender(mq.matches)
    check()
    mq.addEventListener('change', check)
    return () => mq.removeEventListener('change', check)
  }, [])

  if (reducedMotion || !canRender) return null

  const handleLoad = (_e: Application) => setLoaded(true)
  const handleError = () => setError(true)

  if (error) return null

  return (
    <div className="hero__spline" role="presentation" aria-hidden="true">
      <div className="hero__spline-glow" />
      <div className={`hero__spline-inner${loaded ? ' hero__spline-inner--loaded' : ''}`}>
        {!loaded && (
          <div className="hero__spline-loading">
            <span className="hero__spline-loading-text">INITIALIZING VISUAL SYSTEM</span>
            <span className="hero__spline-loading-bar" />
          </div>
        )}
        <SplineScene
          scene={SPLINE_URL}
          onLoad={handleLoad}
          onError={handleError}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  )
}
