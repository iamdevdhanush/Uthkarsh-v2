import { motion } from 'motion/react'
import { RegistrationForm } from '../components/registration/RegistrationForm'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Register.css'

export function Register() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="register-page">
      <div className="container">
        <motion.div
          className="register-page__header"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="register-page__title">Register Your Team</h1>
          <p className="register-page__desc">
            Complete all steps to register for UTKARSH 26.
          </p>
        </motion.div>

        <motion.div
          className="register-page__form"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <RegistrationForm />
        </motion.div>
      </div>
    </div>
  )
}

