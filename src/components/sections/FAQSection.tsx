import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Accordion } from '../ui/Accordion'
import { faqItems } from '../../data/faq'
import './FAQSection.css'

export function FAQSection() {
  const reducedMotion = useReducedMotion()

  const accordionItems = faqItems.map((faq) => ({
    id: faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
    title: faq.question,
    content: faq.answer,
  }))

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <motion.div
          className="faq-section__content"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="faq-section__tag">FAQ</span>
          <h2 className="faq-section__heading">Frequently Asked Questions</h2>
          <Accordion items={accordionItems} />
        </motion.div>
      </div>
    </section>
  )
}
