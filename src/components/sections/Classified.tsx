import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Classified.css'

export function Classified() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="classified">
      <div className="classified__overlay" />
      <div className="classified__scanline" />
      <div className="classified__grid" />

      <div className="container">
        <motion.div
          className="classified__content"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="classified__label"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="classified__label-dash" />
            ACCESS RESTRICTED
          </motion.div>

          <motion.h2
            className="classified__title"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            THE PROBLEM?
          </motion.h2>

          <motion.div
            className="classified__sealed"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="classified__sealed-text">CLASSIFIED</span>
            <div className="classified__sealed-bar" />
            <span className="classified__sealed-sub">REVEALED WHEN THE CLOCK STARTS</span>
          </motion.div>

          <motion.div
            className="classified__code"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="classified__code-line">// ACCESS LEVEL: RESTRICTED</span>
            <span className="classified__code-line">// REVEAL TIME: 10:00 AM</span>
            <span className="classified__code-line classified__code-line--status">// STATUS: SEALED</span>
          </motion.div>

          <motion.div
            className="classified__stamp"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.2, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
              <rect x="2" y="2" width="76" height="76" fill="none" stroke="#FF4D00" strokeWidth="2" />
              <line x1="2" y1="2" x2="78" y2="78" stroke="#FF4D00" strokeWidth="1.5" />
              <line x1="78" y1="2" x2="2" y2="78" stroke="#FF4D00" strokeWidth="1.5" />
              <text x="40" y="36" textAnchor="middle" fill="#FF4D00" fontSize="10" fontWeight="700" fontFamily="monospace">SEALED</text>
              <text x="40" y="52" textAnchor="middle" fill="#FF4D00" fontSize="8" fontWeight="500" fontFamily="monospace">RESTRICTED</text>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
