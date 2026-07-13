import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { eventConfig } from '../../data/eventConfig'
import './FinalCTA.css'

export function FinalCTA() {
  return (
    <section className="final-cta" id="register">
      <div className="container">
        <div className="final-cta__system-bar">
          <div className="final-cta__sys-item">
            <span className="final-cta__sys-label">SYSTEM TIME</span>
            <span className="final-cta__sys-value">16:00</span>
          </div>
          <div className="final-cta__sys-divider" />
          <div className="final-cta__sys-item">
            <span className="final-cta__sys-label">STATUS</span>
            <span className="final-cta__sys-value final-cta__sys-value--deadline">DEADLINE ACTIVE</span>
          </div>
        </div>

        <motion.div
          className="final-cta__content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="final-cta__title">
            <span className="final-cta__line">THE CLOCK</span>
            <span className="final-cta__line final-cta__line--accent">WON'T WAIT.</span>
            <span className="final-cta__line">WILL YOU?</span>
          </h2>

          <div className="final-cta__data">
            <div className="final-cta__data-item">
              <span className="final-cta__data-num">{eventConfig.maximumTeams}</span>
              <span className="final-cta__data-label">TEAMS</span>
            </div>
            <span className="final-cta__data-sep">·</span>
            <div className="final-cta__data-item">
              <span className="final-cta__data-num">{eventConfig.minTeamSize}–{eventConfig.maxTeamSize}</span>
              <span className="final-cta__data-label">PER TEAM</span>
            </div>
            <span className="final-cta__data-sep">·</span>
            <div className="final-cta__data-item">
              <span className="final-cta__data-num">{eventConfig.registrationFeeFormatted}</span>
              <span className="final-cta__data-label">FEE</span>
            </div>
          </div>

          <Link to="/register" className="final-cta__button">
            <span>Register Your Team</span>
            <span className="final-cta__button-line" />
          </Link>

          <p className="final-cta__note">
            Spots are limited to {eventConfig.maximumTeams} teams.
            Registration is subject to payment verification.
          </p>
        </motion.div>

        <div className="final-cta__footer-bar">
          <span>{eventConfig.eventName}</span>
          <span className="final-cta__footer-sep">//</span>
          <span>{eventConfig.institutionShort}</span>
          <span className="final-cta__footer-sep">//</span>
          <span>{eventConfig.location}</span>
          <span className="final-cta__footer-sep">//</span>
          <span className="final-cta__footer-status">SYSTEM ACTIVE</span>
        </div>
      </div>
    </section>
  )
}