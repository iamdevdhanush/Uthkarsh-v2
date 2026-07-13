import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { eventConfig } from '../../data/eventConfig'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__scanline" />
        <div className="hero__corner-tl" />
        <div className="hero__corner-tr" />
        <div className="hero__corner-bl" />
        <div className="hero__corner-br" />
      </div>

      <div className="container">
        <div className="hero__top-bar">
          <div className="hero__top-left">
            <span className="hero__top-dot" />
            <span className="hero__top-label">UTKARSH PROTOCOL</span>
          </div>
          <div className="hero__top-right">
            <span className="hero__top-item">
              <span className="hero__top-meta">STATUS</span>
              <span className="hero__top-val hero__top-val--active">ACTIVE</span>
            </span>
            <span className="hero__top-divider" />
            <span className="hero__top-item">
              <span className="hero__top-meta">SYSTEM TIME</span>
              <span className="hero__top-val">09:00</span>
            </span>
            <span className="hero__top-divider" />
            <span className="hero__top-item">
              <span className="hero__top-meta">CAPACITY</span>
              <span className="hero__top-val">{eventConfig.maximumTeams} TEAMS</span>
            </span>
          </div>
        </div>

        <div className="hero__layout">
          <div className="hero__main">
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="crosshair" />
              <span>EVENT COMMAND // ACTIVE</span>
            </motion.div>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero__title-event">UTKARSH</span>
              <span className="hero__title-num">26</span>
            </motion.h1>

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              SIX-HOUR INTER-COLLEGE HACKATHON
            </motion.p>

            <motion.p
              className="hero__date"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {eventConfig.eventDate}
            </motion.p>

            <motion.div
              className="hero__meta"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero__meta-item">
                <span className="hero__meta-label">HOST</span>
                <span className="hero__meta-value">{eventConfig.institutionShort}</span>
              </span>
              <span className="hero__meta-divider" />
              <span className="hero__meta-item">
                <span className="hero__meta-label">DEPARTMENT</span>
                <span className="hero__meta-value">{eventConfig.department}</span>
              </span>
              <span className="hero__meta-divider" />
              <span className="hero__meta-item">
                <span className="hero__meta-label">LOCATION</span>
                <span className="hero__meta-value">{eventConfig.location}</span>
              </span>
            </motion.div>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/register" className="hero__cta hero__cta--primary">
                <span className="hero__cta-text">Register Your Team</span>
                <span className="hero__cta-line" />
              </Link>
              <a href="#about" className="hero__cta hero__cta--secondary">
                <span className="hero__cta-text">Explore System</span>
                <span className="hero__cta-arrow">&#8595;</span>
              </a>
            </motion.div>
          </div>

          <div className="hero__side">
            <motion.div
              className="hero__data-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero__data-item">
                <span className="hero__data-num">{eventConfig.maximumTeams}</span>
                <span className="hero__data-label">TEAMS</span>
              </div>
              <div className="hero__data-divider" />
              <div className="hero__data-item">
                <span className="hero__data-num">200</span>
                <span className="hero__data-label">MINDS</span>
              </div>
              <div className="hero__data-divider" />
              <div className="hero__data-item">
                <span className="hero__data-num">06:00</span>
                <span className="hero__data-label">DURATION</span>
              </div>
              <div className="hero__data-divider" />
              <div className="hero__data-item">
                <span className="hero__data-num">02–04</span>
                <span className="hero__data-label">TEAM SIZE</span>
              </div>
            </motion.div>

            <motion.div
              className="hero__time-display"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero__time-header">
                <span className="hero__time-tag">EVENT WINDOW</span>
                <span className="status-dot status-dot--active" />
              </div>
              <div className="hero__time-digits">
                <span>06</span>
                <span className="hero__time-sep">:</span>
                <span>00</span>
                <span className="hero__time-sep">:</span>
                <span>00</span>
              </div>
              <div className="hero__time-range">
                <span>09:00</span>
                <span className="hero__time-bar">
                  <span className="hero__time-fill" />
                </span>
                <span>17:00</span>
              </div>
              <div className="hero__time-caption">THE CLOCK IS ALREADY TICKING.</div>
            </motion.div>
          </div>
        </div>

        <div className="hero__bottom-bar">
          <span className="hero__bottom-coord">N13°43' E75°37'</span>
          <span className="hero__bottom-divider" />
          <span className="hero__bottom-text">PESIAMS // SHIVAMOGGA</span>
          <span className="hero__bottom-divider" />
          <span className="hero__bottom-text">09:00 — 17:00</span>
        </div>
      </div>
    </section>
  )
}