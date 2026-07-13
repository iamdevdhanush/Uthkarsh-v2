import type { TeamInfo } from '../../types'
import './RegistrationForm.css'

interface StepTeamProps {
  data: TeamInfo
  onChange: (data: TeamInfo) => void
  errors: Record<string, string>
}

export function StepTeam({ data, onChange, errors }: StepTeamProps) {
  const handleChange = (field: keyof TeamInfo, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="reg-step">
      <h3 className="reg-step__title">Team Information</h3>
      <p className="reg-step__desc">Tell us about your team and college.</p>

      <div className="reg-step__fields">
        <div className="reg-field">
          <label className="reg-field__label" htmlFor="teamName">Team Name</label>
          <input
            id="teamName"
            className={`reg-field__input${errors.teamName ? ' reg-field__input--error' : ''}`}
            type="text"
            value={data.teamName}
            onChange={(e) => handleChange('teamName', e.target.value)}
            placeholder="Enter your team name"
          />
          {errors.teamName && <span className="reg-field__error">{errors.teamName}</span>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="collegeName">College / Institution Name</label>
          <input
            id="collegeName"
            className={`reg-field__input${errors.collegeName ? ' reg-field__input--error' : ''}`}
            type="text"
            value={data.collegeName}
            onChange={(e) => handleChange('collegeName', e.target.value)}
            placeholder="Enter your college name"
          />
          {errors.collegeName && <span className="reg-field__error">{errors.collegeName}</span>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="district">District</label>
          <input
            id="district"
            className={`reg-field__input${errors.district ? ' reg-field__input--error' : ''}`}
            type="text"
            value={data.district}
            onChange={(e) => handleChange('district', e.target.value)}
            placeholder="Enter district"
          />
          {errors.district && <span className="reg-field__error">{errors.district}</span>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="city">City / Taluk</label>
          <input
            id="city"
            className={`reg-field__input${errors.city ? ' reg-field__input--error' : ''}`}
            type="text"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Enter city or taluk"
          />
          {errors.city && <span className="reg-field__error">{errors.city}</span>}
        </div>
      </div>
    </div>
  )
}
