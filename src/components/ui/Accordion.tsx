import { type ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './Accordion.css'

interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="accordion" role="region">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className="accordion__item">
            <button
              className={`accordion__trigger${isOpen ? ' accordion__trigger--open' : ''}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="accordion__title">{item.title}</span>
              <span className={`accordion__icon${isOpen ? ' accordion__icon--open' : ''}`} aria-hidden="true">
                <span className="accordion__icon-bar accordion__icon-bar--h" />
                <span className={`accordion__icon-bar accordion__icon-bar--v${isOpen ? ' accordion__icon-bar--hide' : ''}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="accordion__content"
                  role="region"
                >
                  <div className="accordion__body">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
