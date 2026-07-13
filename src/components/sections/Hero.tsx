import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Hero.css'

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__scanline" />
        <div className="hero__corner hero__corner--tl" />
        <div className="hero__corner hero__corner--tr" />
        <div className="hero__corner hero__corner--bl" />
        <div className="hero__corner hero__corner--br" />
      </div>

      <div className="hero__content">
        <div className="container">
          <div className="hero__layout">
            <div className="hero__left">
              <motion.div
                className="hero__badge"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hero__badge-dash" />
                <span>{eventConfig.institutionShort} · {eventConfig.department}</span>
              </motion.div>

              <motion.h1
                className="hero__title"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hero__title-utkarsh">UTKARSH</span>
                <span className="hero__title-twenty">26</span>
              </motion.h1>

              <motion.p
                className="hero__subtitle"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {eventConfig.institutionFull}
                <br />
                {eventConfig.location}
              </motion.p>

              <motion.div
                className="hero__stats"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hero__stat-item">
                  <span className="hero__stat-value">{eventConfig.maximumTeams}</span>
                  <span className="hero__stat-label">TEAMS</span>
                </div>
                <div className="hero__stat-divider" />
                <div className="hero__stat-item">
                  <span className="hero__stat-value">200</span>
                  <span className="hero__stat-label">MINDS</span>
                </div>
                <div className="hero__stat-divider" />
                <div className="hero__stat-item">
                  <span className="hero__stat-value">6</span>
                  <span className="hero__stat-label">HOURS</span>
                </div>
                <div className="hero__stat-divider" />
                <div className="hero__stat-item">
                  <span className="hero__stat-value">2–4</span>
                  <span className="hero__stat-label">PER TEAM</span>
                </div>
              </motion.div>
            </div>

            <div className="hero__right">
              <motion.div
                className="hero__twenty-six"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hero__twenty-six-inner">
                  <span className="hero__twenty-six-text">26</span>
                  <div className="hero__twenty-six-ring" />
                  <div className="hero__twenty-six-ring hero__twenty-six-ring--slow" />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="hero__bottom"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero__deadline">THE CLOCK IS ALREADY TICKING.</p>
            <div className="hero__actions">
              <Link to="/register" className="hero__cta hero__cta--primary">
                Register Your Team
              </Link>
              <a href="#about" className="hero__cta hero__cta--secondary">
                Explore the Challenge
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
