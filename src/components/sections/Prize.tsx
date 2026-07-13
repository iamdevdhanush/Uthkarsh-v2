import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Prize.css'

export function Prize() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="prize" id="prize">
      <div className="container">
        <motion.div
          className="prize__content"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="prize__tag">PRIZE POOL</span>

          <div className="prize__reveal">
            <div className="prize__redacted">
              <span className="prize__redacted-bar" />
              <span className="prize__redacted-bar" />
              <span className="prize__redacted-bar prize__redacted-bar--short" />
            </div>
            <p className="prize__reveal-text">TO BE REVEALED</p>
          </div>

          <div className="prize__categories">
            <div className="prize__cat">
              <span className="prize__cat-icon">01</span>
              <span className="prize__cat-label">Winner</span>
            </div>
            <div className="prize__cat">
              <span className="prize__cat-icon">02</span>
              <span className="prize__cat-label">Runner-up</span>
            </div>
            <div className="prize__cat">
              <span className="prize__cat-icon">03</span>
              <span className="prize__cat-label">Recognition</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
