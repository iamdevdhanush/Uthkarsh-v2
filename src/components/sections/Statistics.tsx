import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Statistics.css'

const stats = [
  { value: '50', label: 'Teams', sub: 'Maximum capacity' },
  { value: '200', label: 'Minds', sub: 'Up to competing' },
  { value: '6', label: 'Hours', sub: 'On the clock' },
  { value: '2–4', label: 'Per Team', sub: 'Participants' },
]

export function Statistics() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="stats">
      <div className="container">
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
              <div className="stats__value">{stat.value}</div>
              <div className="stats__label">{stat.label}</div>
              <div className="stats__sub">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
