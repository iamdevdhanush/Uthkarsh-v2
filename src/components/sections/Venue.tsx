import { motion } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Venue.css'

export function Venue() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="venue" id="venue">
      <div className="container">
        <div className="venue__layout">
          <motion.div
            className="venue__map"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="venue__map-graphic">
              <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" className="venue__map-svg">
                <rect x="100" y="60" width="200" height="140" rx="4" stroke="currentColor" strokeWidth="1.5" className="venue__map-building" />
                <rect x="130" y="85" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="1" className="venue__map-window" />
                <rect x="175" y="85" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="1" className="venue__map-window" />
                <rect x="220" y="85" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="1" className="venue__map-window" />
                <rect x="130" y="130" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="1" className="venue__map-window" />
                <rect x="220" y="130" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="1" className="venue__map-window" />
                <rect x="175" y="135" width="40" height="50" rx="2" stroke="var(--color-accent)" strokeWidth="1.5" className="venue__map-door" />
                <circle cx="200" cy="220" r="4" fill="var(--color-accent)" />
                <line x1="200" y1="224" x2="200" y2="260" stroke="var(--color-accent)" strokeWidth="1" className="venue__map-pin" />
                <path d="M60 280 L340 280" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <path d="M60 290 L280 290" stroke="currentColor" strokeWidth="1" opacity="0.15" />
                <path d="M60 270 L300 270" stroke="currentColor" strokeWidth="1" opacity="0.1" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="venue__info"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="venue__tag">VENUE</span>
            <h2 className="venue__title">Where It Happens</h2>
            <p className="venue__name">{eventConfig.institutionFull}</p>
            <p className="venue__location">{eventConfig.location}</p>
            <div className="venue__details">
              <div className="venue__detail">
                <span className="venue__detail-label">Reporting</span>
                <span className="venue__detail-value">{eventConfig.overallStart}</span>
              </div>
              <div className="venue__detail">
                <span className="venue__detail-label">Event Hours</span>
                <span className="venue__detail-value">{eventConfig.overallStart} – {eventConfig.overallEnd}</span>
              </div>
            </div>
            <p className="venue__note">Detailed directions will be shared with registered participants.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
