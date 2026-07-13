import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { eventConfig } from '../../data/eventConfig'
import './Statistics.css'

const stats = [
  { value: '50', label: 'MAXIMUM TEAMS', sub: 'LIMITED' },
  { value: '200', label: 'MAXIMUM PARTICIPANTS', sub: null },
  { value: '6 HOURS', label: 'HACKATHON DURATION', sub: null },
  { value: '2–4', label: 'TEAM SIZE', sub: 'PER TEAM' },
]

export function Statistics() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="stats light-section" id="stats">
      <div className="container">
        <div className="stats__header">
          <span className="section-eyebrow">ACT 03 — SYSTEM METRICS</span>
        </div>
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stats__item"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="stats__index">
                <span className="stats__index-num">0{i + 1}</span>
                <span className="stats__index-line" />
              </div>
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
              {stat.sub && <span className="stats__sub">{stat.sub}</span>}
              <div className="stats__bar">
                <div className="stats__bar-fill" style={{ width: i === 0 ? '100%' : i === 1 ? '80%' : i === 2 ? '50%' : '60%' }} />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="stats__footer">
          <span className="status-dot status-dot--active" />
          <span className="stats__footer-text">Real-time capacity — {eventConfig.maximumTeams} teams max</span>
        </div>
      </div>
    </section>
  )
}