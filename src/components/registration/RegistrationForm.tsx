import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { StepIndicator } from './StepIndicator'
import { StepTeam } from './StepTeam'
import { StepLeader } from './StepLeader'
import { StepMembers } from './StepMembers'
import { StepPayment } from './StepPayment'
import { StepReview } from './StepReview'
import { submitRegistration } from '../../lib/registrationService'
import { validateRegistration } from '../../lib/validation'
import type { RegistrationData, RegistrationResponse } from '../../types'
import './RegistrationForm.css'

const stepLabels = ['Team', 'Leader', 'Members', 'Payment', 'Review']

const initialData: RegistrationData = {
  team: { teamName: '', collegeName: '', district: '', city: '' },
  leader: { fullName: '', email: '', phone: '', course: '', semester: '' },
  members: [{ fullName: '', email: '', course: '', semester: '' }],
  payment: { utr: '', screenshot: null },
  consents: {
    consent: false,
    consentInfoAccuracy: false,
    consentRules: false,
    consentNoGuarantee: false,
    consentDataProcessing: false,
  },
}

export function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<RegistrationData>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<RegistrationResponse | null>(null)
  const [errorBanner, setErrorBanner] = useState('')
  const submittingRef = useRef(false)

  const handleNext = () => {
    setErrors({})
    setErrorBanner('')
    const fieldErrors: Record<string, string> = {}

    if (step === 1) {
      if (!data.team.teamName.trim()) fieldErrors.teamName = 'Team name is required.'
      if (!data.team.collegeName.trim()) fieldErrors.collegeName = 'College name is required.'
      if (!data.team.district.trim()) fieldErrors.district = 'District is required.'
      if (!data.team.city.trim()) fieldErrors.city = 'City is required.'
    }

    if (step === 2) {
      if (!data.leader.fullName.trim()) fieldErrors.leaderName = 'Full name is required.'
      if (!data.leader.email.trim()) {
        fieldErrors.leaderEmail = 'Email is required.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.leader.email)) {
        fieldErrors.leaderEmail = 'Enter a valid email address.'
      }
      if (!data.leader.phone?.trim()) {
        fieldErrors.leaderPhone = 'Mobile number is required.'
      } else if (!/^[6-9]\d{9}$/.test(data.leader.phone.replace(/[\s-]/g, '').replace(/^(\+91|91)/, ''))) {
        fieldErrors.leaderPhone = 'Enter a valid 10-digit mobile number.'
      }
      if (!data.leader.course.trim()) fieldErrors.leaderCourse = 'Course is required.'
      if (!data.leader.semester.trim()) fieldErrors.leaderSemester = 'Semester is required.'
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setStep((s) => Math.min(s + 1, 5))
  }

  const handlePrev = () => {
    setErrors({})
    setErrorBanner('')
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleSubmit = async () => {
    if (submittingRef.current) return
    setErrors({})
    setErrorBanner('')
    const validationErrors = validateRegistration(data)

    if (validationErrors.length > 0) {
      const fieldErrors: Record<string, string> = {}
      validationErrors.forEach((e) => {
        fieldErrors[e.field] = e.message
      })
      setErrors(fieldErrors)
      return
    }

    submittingRef.current = true
    setLoading(true)
    try {
      const result = await submitRegistration(data)
      setResponse(result)
      if (!result.success) {
        setErrorBanner(result.message)
      }
    } catch {
      setErrorBanner('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      submittingRef.current = false
    }
  }

  if (response?.success) {
    return (
      <div className="reg-success">
        <h2 className="reg-success__title">Registration Submitted</h2>
        {response.registrationId && (
          <p className="reg-success__id">{response.registrationId}</p>
        )}
        {response.status && (
          <p className="reg-success__status">Status: {response.status.replace(/_/g, ' ')}</p>
        )}
        <p className="reg-success__message">{response.message}</p>
        <Link to="/" className="reg-actions__btn reg-actions__btn--next" style={{ display: 'inline-flex', marginTop: '2rem' }}>
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="reg-form">
      <StepIndicator currentStep={step} totalSteps={5} labels={stepLabels} />

      {errorBanner && <div className="reg-error-banner">{errorBanner}</div>}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 1 && (
            <StepTeam
              data={data.team}
              onChange={(team) => setData({ ...data, team })}
              errors={errors}
            />
          )}
          {step === 2 && (
            <StepLeader
              data={data.leader}
              onChange={(leader) => setData({ ...data, leader })}
              errors={errors}
            />
          )}
          {step === 3 && (
            <StepMembers
              members={data.members}
              onChange={(members) => setData({ ...data, members })}
              errors={errors}
            />
          )}
          {step === 4 && (
            <StepPayment
              data={data.payment}
              onChange={(payment) => setData({ ...data, payment })}
              errors={errors}
            />
          )}
          {step === 5 && (
            <StepReview
              data={data}
              onConsentChange={(consents) => setData({ ...data, consents })}
              errors={errors}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="reg-actions">
        {step > 1 && (
          <button
            type="button"
            className="reg-actions__btn reg-actions__btn--prev"
            onClick={handlePrev}
            disabled={loading}
          >
            Previous
          </button>
        )}
        {step < 5 ? (
          <button
            type="button"
            className="reg-actions__btn reg-actions__btn--next"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="reg-actions__btn reg-actions__btn--submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'REGISTERING...' : 'Submit Registration'}
          </button>
        )}
      </div>
    </div>
  )
}

