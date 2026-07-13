import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './HiddenTwist.css'

export function HiddenTwist() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="twist">
      <div className="container">
        <motion.div
          className="twist__layout"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="twist__label">THE HIDDEN TWIST</span>

          <h2 className="twist__title">
            <span className="twist__title-stable">THEN THE</span>{' '}
            <motion.span
              className="twist__title-change"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              RULES
            </motion.span>{' '}
            <motion.span
              className="twist__title-broken"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, rotate: 0, y: 0 }}
              whileInView={{ opacity: 1, rotate: -3, y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              CHANGE.
            </motion.span>
          </h2>

          <motion.p
            className="twist__text"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            A hidden challenge will be revealed during the hackathon.
            The rules shift. The strategy changes.
          </motion.p>

          <motion.div
            className="twist__commands"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="twist__cmd">Adapt.</span>
            <span className="twist__cmd-sep">/</span>
            <span className="twist__cmd">Rebuild.</span>
            <span className="twist__cmd-sep">/</span>
            <span className="twist__cmd">Keep moving.</span>
          </motion.div>

          <motion.div
            className="twist__divider"
            initial={reducedMotion ? { opacity: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </section>
  )
}
