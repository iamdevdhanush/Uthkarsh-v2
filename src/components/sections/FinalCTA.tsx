import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './FinalCTA.css'

export function FinalCTA() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="final-cta">
      <div className="final-cta__pattern" />
      <div className="final-cta__scanline" />

      <div className="container">
        <motion.div
          className="final-cta__content"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="final-cta__title">
            THE CLOCK<br />
            <span className="final-cta__accent">WON'T WAIT.</span><br />
            WILL YOU?
          </h2>

          <div className="final-cta__facts">
            <p className="final-cta__fact">
              {eventConfig.maximumTeams} teams · {eventConfig.minTeamSize}–{eventConfig.maxTeamSize} participants per team
            </p>
            <p className="final-cta__fact">
              {eventConfig.registrationFeeFormatted} registration fee
              {eventConfig.lunchProvided ? ' · Lunch provided' : ''}
            </p>
          </div>

          <Link to="/register" className="final-cta__button">
            Register Your Team
          </Link>

          <motion.div
            className="final-cta__timer"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="final-cta__timer-text">Spots are limited to {eventConfig.maximumTeams} teams</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
