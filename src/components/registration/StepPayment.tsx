import type { PaymentInfo } from '../../types'
import { eventConfig } from '../../data/eventConfig'
import './RegistrationForm.css'

interface StepPaymentProps {
  data: PaymentInfo
  onChange: (data: PaymentInfo) => void
  errors: Record<string, string>
}

export function StepPayment({ data, onChange, errors }: StepPaymentProps) {
  const handleUTRChange = (value: string) => {
    onChange({ ...data, utr: value })
  }

  const handleFileChange = (file: File | null) => {
    onChange({ ...data, screenshot: file })
  }

  return (
    <div className="reg-step">
      <h3 className="reg-step__title">Payment</h3>
      <p className="reg-step__desc">
        Registration fee: <strong>{eventConfig.registrationFeeFormatted}</strong> per team.
      </p>

      <div className="reg-step__notice">
        <p className="reg-step__notice-text">
          A payment screenshot alone does not confirm successful payment. The organising team will
          manually verify the UTR or transaction reference against the receiving account. Your
          registration will be confirmed only after successful payment verification.
        </p>
      </div>

      <div className="reg-step__fields">
        <div className="reg-field">
          <label className="reg-field__label" htmlFor="utr">UTR / Transaction Reference</label>
          <input
            id="utr"
            className={`reg-field__input${errors.utr ? ' reg-field__input--error' : ''}`}
            type="text"
            value={data.utr}
            onChange={(e) => handleUTRChange(e.target.value)}
            placeholder="Enter UTR number"
          />
          {errors.utr && <span className="reg-field__error">{errors.utr}</span>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="screenshot">Payment Screenshot</label>
          <div className="reg-field__file">
            <input
              id="screenshot"
              className="reg-field__file-input"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />
            <span className="reg-field__file-label">
              {data.screenshot ? data.screenshot.name : 'Choose file (JPG, PNG, WebP, PDF — max 5 MB)'}
            </span>
          </div>
          {errors.screenshot && <span className="reg-field__error">{errors.screenshot}</span>}
        </div>
      </div>
    </div>
  )
}
