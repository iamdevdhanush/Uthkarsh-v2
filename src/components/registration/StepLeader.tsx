import type { TeamLeader } from '../../types'
import './RegistrationForm.css'

interface StepLeaderProps {
  data: TeamLeader
  onChange: (data: TeamLeader) => void
  errors: Record<string, string>
}

export function StepLeader({ data, onChange, errors }: StepLeaderProps) {
  const handleChange = (field: keyof TeamLeader, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="reg-step">
      <h3 className="reg-step__title">Team Leader</h3>
      <p className="reg-step__desc">The leader counts as one participant.</p>

      <div className="reg-step__fields">
        <div className="reg-field">
          <label className="reg-field__label" htmlFor="leaderName">Full Name</label>
          <input
            id="leaderName"
            className={`reg-field__input${errors.leaderName ? ' reg-field__input--error' : ''}`}
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Enter full name"
          />
          {errors.leaderName && <span className="reg-field__error">{errors.leaderName}</span>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="leaderEmail">Email</label>
          <input
            id="leaderEmail"
            className={`reg-field__input${errors.leaderEmail ? ' reg-field__input--error' : ''}`}
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter email address"
          />
          {errors.leaderEmail && <span className="reg-field__error">{errors.leaderEmail}</span>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="leaderPhone">Mobile Number</label>
          <input
            id="leaderPhone"
            className={`reg-field__input${errors.leaderPhone ? ' reg-field__input--error' : ''}`}
            type="tel"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter 10-digit mobile number"
          />
          {errors.leaderPhone && <span className="reg-field__error">{errors.leaderPhone}</span>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="leaderCourse">Course</label>
          <input
            id="leaderCourse"
            className={`reg-field__input${errors.leaderCourse ? ' reg-field__input--error' : ''}`}
            type="text"
            value={data.course}
            onChange={(e) => handleChange('course', e.target.value)}
            placeholder="e.g. BCA, B.Sc, MCA"
          />
          {errors.leaderCourse && <span className="reg-field__error">{errors.leaderCourse}</span>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="leaderSemester">Semester</label>
          <input
            id="leaderSemester"
            className={`reg-field__input${errors.leaderSemester ? ' reg-field__input--error' : ''}`}
            type="text"
            value={data.semester}
            onChange={(e) => handleChange('semester', e.target.value)}
            placeholder="e.g. 4th, 6th"
          />
          {errors.leaderSemester && <span className="reg-field__error">{errors.leaderSemester}</span>}
        </div>
      </div>
    </div>
  )
}
