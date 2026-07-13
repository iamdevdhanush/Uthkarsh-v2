import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Guidelines.css'

export function Guidelines() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="guidelines" id="guidelines">
      <div className="container">
        <motion.div
          className="guidelines__content"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="guidelines__tag">GUIDELINES</span>
          <h2 className="guidelines__title">Event Guidelines</h2>
          <div className="guidelines__document">
            <div className="guidelines__doc-icon">
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="28" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="26" x2="18" y2="26" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="guidelines__doc-info">
              <span className="guidelines__doc-name">Official Document</span>
              <span className="guidelines__doc-status">
                <span className="guidelines__status-dot" />
                Coming Soon
              </span>
              <span className="guidelines__doc-version">PDF · Version 1.0</span>
            </div>
          </div>
          <p className="guidelines__note">
            Full guidelines will be published here before the event.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
