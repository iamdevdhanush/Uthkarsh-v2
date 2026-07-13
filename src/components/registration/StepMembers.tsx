import type { Participant } from '../../types'
import { eventConfig } from '../../data/eventConfig'
import './RegistrationForm.css'

interface StepMembersProps {
  members: Participant[]
  onChange: (members: Participant[]) => void
  errors: Record<string, string>
}

export function StepMembers({ members, onChange, errors }: StepMembersProps) {
  const totalParticipants = 1 + members.length
  const canAdd = totalParticipants < eventConfig.maxTeamSize

  const handleMemberChange = (index: number, field: keyof Participant, value: string) => {
    const updated = members.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    )
    onChange(updated)
  }

  const addMember = () => {
    if (canAdd) {
      onChange([...members, { fullName: '', email: '', course: '', semester: '' }])
    }
  }

  const removeMember = (index: number) => {
    if (members.length > 1) {
      onChange(members.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="reg-step">
      <h3 className="reg-step__title">Team Members</h3>
      <p className="reg-step__desc">
        {members.length === 1
          ? `Add your team members. Minimum ${eventConfig.minTeamSize} participants required.`
          : `You have ${totalParticipants} participant${totalParticipants > 1 ? 's' : ''}. Maximum ${eventConfig.maxTeamSize} allowed.`
        }
      </p>

      {members.map((member, i) => {
        const memberNum = i + 2
        const prefix = `member${memberNum}`
        const canRemove = members.length > 1

        return (
          <div key={i} className="reg-member">
            <div className="reg-member__header">
              <h4 className="reg-member__title">Member {memberNum}</h4>
              {canRemove && (
                <button
                  type="button"
                  className="reg-member__remove"
                  onClick={() => removeMember(i)}
                  aria-label={`Remove member ${memberNum}`}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="reg-step__fields">
              <div className="reg-field">
                <label className="reg-field__label" htmlFor={`member${memberNum}Name`}>Full Name</label>
                <input
                  id={`member${memberNum}Name`}
                  className={`reg-field__input${errors[`${prefix}Name`] ? ' reg-field__input--error' : ''}`}
                  type="text"
                  value={member.fullName}
                  onChange={(e) => handleMemberChange(i, 'fullName', e.target.value)}
                  placeholder="Enter full name"
                />
                {errors[`${prefix}Name`] && <span className="reg-field__error">{errors[`${prefix}Name`]}</span>}
              </div>

              <div className="reg-field">
                <label className="reg-field__label" htmlFor={`member${memberNum}Email`}>Email</label>
                <input
                  id={`member${memberNum}Email`}
                  className={`reg-field__input${errors[`${prefix}Email`] ? ' reg-field__input--error' : ''}`}
                  type="email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(i, 'email', e.target.value)}
                  placeholder="Enter email address"
                />
                {errors[`${prefix}Email`] && <span className="reg-field__error">{errors[`${prefix}Email`]}</span>}
              </div>

              <div className="reg-field">
                <label className="reg-field__label" htmlFor={`member${memberNum}Course`}>Course</label>
                <input
                  id={`member${memberNum}Course`}
                  className={`reg-field__input${errors[`${prefix}Course`] ? ' reg-field__input--error' : ''}`}
                  type="text"
                  value={member.course}
                  onChange={(e) => handleMemberChange(i, 'course', e.target.value)}
                  placeholder="e.g. BCA, B.Sc, MCA"
                />
                {errors[`${prefix}Course`] && <span className="reg-field__error">{errors[`${prefix}Course`]}</span>}
              </div>

              <div className="reg-field">
                <label className="reg-field__label" htmlFor={`member${memberNum}Semester`}>Semester</label>
                <input
                  id={`member${memberNum}Semester`}
                  className={`reg-field__input${errors[`${prefix}Semester`] ? ' reg-field__input--error' : ''}`}
                  type="text"
                  value={member.semester}
                  onChange={(e) => handleMemberChange(i, 'semester', e.target.value)}
                  placeholder="e.g. 4th, 6th"
                />
                {errors[`${prefix}Semester`] && <span className="reg-field__error">{errors[`${prefix}Semester`]}</span>}
              </div>
            </div>
          </div>
        )
      })}

      {canAdd && (
        <button type="button" className="reg-step__add" onClick={addMember}>
          + Add Member
        </button>
      )}
    </div>
  )
}
