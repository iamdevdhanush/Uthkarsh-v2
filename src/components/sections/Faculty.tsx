import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { facultyMembers } from '../../data/faculty'
import './Faculty.css'

const facultyConfig: Record<string, { objectPosition: string; label: string }> = {
  principal: { objectPosition: 'center 25%', label: 'Principal' },
  hod: { objectPosition: 'center 30%', label: 'Head of Department' },
  asma: { objectPosition: 'center 30%', label: 'Faculty' },
  sachidanand: { objectPosition: 'center 30%', label: 'Faculty' },
  banuprakash: { objectPosition: 'center 30%', label: 'Faculty' },
}

function FacultyPortrait({ member, index }: { member: typeof facultyMembers[number]; index: number }) {
  const reducedMotion = useReducedMotion()
  const config = facultyConfig[member.id] || { objectPosition: 'center 30%', label: '' }

  return (
    <motion.div
      className="faculty__card"
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="faculty__image-wrapper">
        <img
          src={member.image}
          alt={member.name ? `${member.name}, ${member.designation || ''}` : `${config.label}`}
          className="faculty__image"
          style={{ objectPosition: config.objectPosition }}
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const placeholder = target.nextElementSibling
            if (placeholder) (placeholder as HTMLElement).style.display = 'flex'
          }}
        />
        <div className="faculty__placeholder">
          <span className="faculty__placeholder-initial">
            {member.id === 'principal' ? 'PR' :
             member.id === 'hod' ? 'HOD' :
             member.id.charAt(0).toUpperCase()}
          </span>
          <span className="faculty__placeholder-label">{config.label}</span>
        </div>
      </div>

      <div className="faculty__info">
        {member.name ? (
          <h3 className="faculty__name">{member.name}</h3>
        ) : (
          <h3 className="faculty__name faculty__name--pending">{config.label}</h3>
        )}
        {member.designation && (
          <p className="faculty__designation">{member.designation}</p>
        )}
      </div>
    </motion.div>
  )
}

export function Faculty() {
  return (
    <section className="faculty" id="faculty">
      <div className="container">
        <div className="faculty__header">
          <motion.span
            className="faculty__tag"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            THE PEOPLE BEHIND UTKARSH
          </motion.span>
          <motion.h2
            className="faculty__heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="faculty__heading-row">Faculty &amp; Leadership</span>
          </motion.h2>
        </div>

        <div className="faculty__grid">
          {facultyMembers.map((member, i) => (
            <FacultyPortrait key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
