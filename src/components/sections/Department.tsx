import { motion } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Department.css'

export function Department() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="department">
      <div className="container">
        <div className="department__layout">
          <motion.div
            className="department__content"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="department__tag">THE MINDS BEHIND THE CHALLENGE</span>
            <h2 className="department__name">
              {eventConfig.department}
            </h2>
            <p className="department__text">
              Organised by the Department of Computer Applications, {eventConfig.institutionShort}.
            </p>
          </motion.div>

          <motion.div
            className="department__code"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="department__code-block">
              {[
                'import { Problem } from "./challenge"',
                'import { Team } from "./participants"',
                '',
                'const hackathon = new Event({',
                '  duration: "6 hours",',
                '  teams: 50,',
                '  location: "Shivamogga",',
                '});',
                '',
                '// The problem is revealed on-site.',
                '// Every team starts equal.',
              ].map((line, i) => (
                <span key={i} className="department__code-line">
                  <span className="department__code-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{line}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
