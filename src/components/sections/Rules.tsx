import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Accordion } from '../ui/Accordion'
import { rules as rulesData } from '../../data/rules'
import './Rules.css'

export function Rules() {
  const reducedMotion = useReducedMotion()

  const accordionItems = rulesData.map((rule) => ({
    id: rule.category.toLowerCase().replace(/\s+/g, '-'),
    title: rule.category,
    content: (
      <ul className="rules__list">
        {rule.items.map((item, i) => (
          <li key={i} className="rules__item">{item}</li>
        ))}
      </ul>
    ),
  }))

  return (
    <section className="rules" id="rules">
      <div className="container">
        <motion.div
          className="rules__content"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="rules__tag">RULES</span>
          <h2 className="rules__heading">Essential Rules</h2>
          <Accordion items={accordionItems} />
        </motion.div>
      </div>
    </section>
  )
}
