import { motion } from 'motion/react'
import { Accordion } from '../ui/Accordion'
import { rules as rulesData } from '../../data/rules'
import { faqItems } from '../../data/faq'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Guidelines.css'

export function Guidelines() {
  const reducedMotion = useReducedMotion()

  const accordionItems = rulesData.map((rule) => ({
    id: rule.category.toLowerCase().replace(/\s+/g, '-'),
    title: rule.category,
    content: (
      <ul className="event-brief__list">
        {rule.items.map((item, i) => (
          <li key={i} className="event-brief__item">{item}</li>
        ))}
      </ul>
    ),
  }))

  const faqAccordionItems = faqItems.map((faq) => ({
    id: faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
    title: faq.question,
    content: faq.answer,
  }))

  const sections = [
    {
      id: 'brochure',
      title: '01 // OFFICIAL BROCHURE',
      content: eventConfig.documents.brochureUrl ? (
        <div className="event-brief__brochure">
          <div className="event-brief__brochure-icon">
            <span className="event-brief__brochure-doc" />
          </div>
          <div className="event-brief__brochure-info">
            <p className="event-brief__brochure-name">
              {eventConfig.eventName} — Event Brochure
            </p>
            <p className="event-brief__brochure-desc">
              Complete event information, participation details and guidelines.
            </p>
          </div>
          <a
            href={eventConfig.documents.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="event-brief__brochure-cta"
          >
            <span>View Brochure</span>
            <span className="event-brief__brochure-arrow">&rarr;</span>
          </a>
        </div>
      ) : (
        <p className="event-brief__placeholder">Brochure will be available soon.</p>
      ),
    },
    {
      id: 'prize',
      title: '02 // PRIZE POOL',
      content: (
        <>
          <p className="event-brief__placeholder">To be revealed. Winners receive certificates and recognition.</p>
          <div className="event-brief__categories">
            <div className="event-brief__cat">
              <span className="event-brief__cat-num">01</span>
              <span className="event-brief__cat-label">Winner</span>
            </div>
            <div className="event-brief__cat">
              <span className="event-brief__cat-num">02</span>
              <span className="event-brief__cat-label">Runner-up</span>
            </div>
            <div className="event-brief__cat">
              <span className="event-brief__cat-num">03</span>
              <span className="event-brief__cat-label">Recognition</span>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'rules',
      title: '03 // PROTOCOL RULES',
      content: <Accordion items={accordionItems} />,
    },
    {
      id: 'faq',
      title: '04 // FREQUENTLY ASKED QUESTIONS',
      content: <Accordion items={faqAccordionItems} />,
    },
  ]

  return (
    <section className="event-brief" id="guidelines">
      <div className="container">
        <div className="section-eyebrow">ACT 09 — EVENT DATABASE</div>
        <h2 className="event-brief__title">Event Brief</h2>

        <div className="event-brief__sections">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              className="event-brief__section"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="event-brief__section-title">
                <span className="event-brief__section-accent">#</span>
                {section.title}
              </h3>
              <div className="event-brief__section-body">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}