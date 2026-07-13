import { motion } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Institution.css'

export function Institution() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="institution" id="institution">
      <div className="container">
        <div className="institution__layout">
          <motion.div
            className="institution__content"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="institution__tag">THE INSTITUTION</span>
            <h2 className="institution__name">
              {eventConfig.institutionFull}
            </h2>
            <p className="institution__location">
              {eventConfig.location}
            </p>
            <div className="institution__logo">
              <span className="institution__logo-text">PESIAMS</span>
            </div>
          </motion.div>

          <motion.div
            className="institution__visual"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="institution__graphic">
              <div className="institution__building">
                <div className="institution__building-body">
                  <div className="institution__building-roof" />
                  <div className="institution__building-floor">
                    <div className="institution__building-window" />
                    <div className="institution__building-window" />
                    <div className="institution__building-window" />
                  </div>
                  <div className="institution__building-floor">
                    <div className="institution__building-window" />
                    <div className="institution__building-door" />
                    <div className="institution__building-window" />
                  </div>
                </div>
              </div>
              <div className="institution__graphic-label">
                <span>{eventConfig.institutionShort}</span>
                <span>Established 2008</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
