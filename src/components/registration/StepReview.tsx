import type { RegistrationData, Consents } from '../../types'
import { eventConfig } from '../../data/eventConfig'
import './RegistrationForm.css'

interface StepReviewProps {
  data: RegistrationData
  onConsentChange: (consents: Consents) => void
  errors: Record<string, string>
}

export function StepReview({ data, onConsentChange, errors }: StepReviewProps) {
  const handleConsent = (field: keyof Consents, value: boolean) => {
    onConsentChange({ ...data.consents, [field]: value })
  }

  const totalParticipants = 1 + data.members.length

  return (
    <div className="reg-step">
      <h3 className="reg-step__title">Review & Consent</h3>
      <p className="reg-step__desc">Please review your information before submitting.</p>

      <div className="reg-review">
        <div className="reg-review__section">
          <h4 className="reg-review__heading">Team</h4>
          <div className="reg-review__grid">
            <div><strong>Name:</strong> {data.team.teamName}</div>
            <div><strong>College:</strong> {data.team.collegeName}</div>
            <div><strong>District:</strong> {data.team.district}</div>
            <div><strong>City:</strong> {data.team.city}</div>
          </div>
        </div>

        <div className="reg-review__section">
          <h4 className="reg-review__heading">Leader</h4>
          <div className="reg-review__grid">
            <div><strong>Name:</strong> {data.leader.fullName}</div>
            <div><strong>Email:</strong> {data.leader.email}</div>
            <div><strong>Phone:</strong> {data.leader.phone}</div>
            <div><strong>Course:</strong> {data.leader.course}</div>
            <div><strong>Semester:</strong> {data.leader.semester}</div>
          </div>
        </div>

        {data.members.length > 0 && (
          <div className="reg-review__section">
            <h4 className="reg-review__heading">Members ({totalParticipants} total participants)</h4>
            {data.members.map((member, i) => (
              <div key={i} className="reg-review__grid">
                <div><strong>Member {i + 2}:</strong> {member.fullName}</div>
                <div><strong>Email:</strong> {member.email}</div>
                <div><strong>Course:</strong> {member.course}</div>
                <div><strong>Semester:</strong> {member.semester}</div>
              </div>
            ))}
          </div>
        )}

        <div className="reg-review__section">
          <h4 className="reg-review__heading">Payment</h4>
          <div className="reg-review__grid">
            <div><strong>UTR:</strong> {data.payment.utr}</div>
            <div><strong>Screenshot:</strong> {data.payment.screenshot ? data.payment.screenshot.name : 'Not uploaded'}</div>
          </div>
        </div>
      </div>

      <div className="reg-consent">
        <h4 className="reg-consent__title">Consent</h4>

        <label className="reg-consent__item">
          <input
            type="checkbox"
            checked={data.consents.consent}
            onChange={(e) => handleConsent('consent', e.target.checked)}
          />
          <span>I agree to participate in {eventConfig.eventName}.</span>
        </label>
        {errors.consent && <span className="reg-field__error">{errors.consent}</span>}

        <label className="reg-consent__item">
          <input
            type="checkbox"
            checked={data.consents.consentInfoAccuracy}
            onChange={(e) => handleConsent('consentInfoAccuracy', e.target.checked)}
          />
          <span>I confirm that all information provided is accurate and complete.</span>
        </label>
        {errors.consentInfoAccuracy && <span className="reg-field__error">{errors.consentInfoAccuracy}</span>}

        <label className="reg-consent__item">
          <input
            type="checkbox"
            checked={data.consents.consentRules}
            onChange={(e) => handleConsent('consentRules', e.target.checked)}
          />
          <span>I agree to abide by the event rules and guidelines.</span>
        </label>
        {errors.consentRules && <span className="reg-field__error">{errors.consentRules}</span>}

        <label className="reg-consent__item">
          <input
            type="checkbox"
            checked={data.consents.consentNoGuarantee}
            onChange={(e) => handleConsent('consentNoGuarantee', e.target.checked)}
          />
          <span>I acknowledge that registration is subject to payment verification and slot availability.</span>
        </label>
        {errors.consentNoGuarantee && <span className="reg-field__error">{errors.consentNoGuarantee}</span>}

        <label className="reg-consent__item">
          <input
            type="checkbox"
            checked={data.consents.consentDataProcessing}
            onChange={(e) => handleConsent('consentDataProcessing', e.target.checked)}
          />
          <span>I consent to the processing of my data for event administration purposes.</span>
        </label>
        {errors.consentDataProcessing && <span className="reg-field__error">{errors.consentDataProcessing}</span>}
      </div>
    </div>
  )
}
