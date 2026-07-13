import type { RegistrationData } from '../types'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../config/constants'
import { eventConfig } from '../data/eventConfig'

interface ValidationError {
  field: string
  message: string
}

export function validateTeamInfo(team: RegistrationData['team']): ValidationError[] {
  const errors: ValidationError[] = []

  if (!team.teamName?.trim()) {
    errors.push({ field: 'teamName', message: 'Team name is required.' })
  }

  if (!team.collegeName?.trim()) {
    errors.push({ field: 'collegeName', message: 'College name is required.' })
  }

  if (!team.district?.trim()) {
    errors.push({ field: 'district', message: 'District is required.' })
  }

  if (!team.city?.trim()) {
    errors.push({ field: 'city', message: 'City / Taluk is required.' })
  }

  return errors
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '')
  const normalized = cleaned.replace(/^(\+91|91)/, '')
  return /^[6-9]\d{9}$/.test(normalized)
}

export function validateParticipant(
  p: { fullName: string; email: string; course: string; semester: string },
  prefix: string
): ValidationError[] {
  const errors: ValidationError[] = []

  if (!p.fullName?.trim()) {
    errors.push({ field: `${prefix}Name`, message: 'Full name is required.' })
  }

  if (!p.email?.trim()) {
    errors.push({ field: `${prefix}Email`, message: 'Email is required.' })
  } else if (!validateEmail(p.email.trim())) {
    errors.push({ field: `${prefix}Email`, message: 'Please enter a valid email address.' })
  }

  if (!p.course?.trim()) {
    errors.push({ field: `${prefix}Course`, message: 'Course is required.' })
  }

  if (!p.semester?.trim()) {
    errors.push({ field: `${prefix}Semester`, message: 'Semester is required.' })
  }

  return errors
}

export function validateUTR(utr: string): boolean {
  return /^[A-Za-z0-9]{6,30}$/.test(utr.trim())
}

export function validateFile(file: File | null): ValidationError | null {
  if (!file) {
    return { field: 'screenshot', message: 'Payment screenshot is required.' }
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      field: 'screenshot',
      message: 'Only JPG, PNG, WebP, and PDF files are allowed.',
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      field: 'screenshot',
      message: 'File size must be less than 5 MB.',
    }
  }

  return null
}

export function validateConsents(consents: RegistrationData['consents']): ValidationError[] {
  const errors: ValidationError[] = []

  if (!consents.consent) {
    errors.push({ field: 'consent', message: 'You must agree to participate in UTKARSH 26.' })
  }
  if (!consents.consentInfoAccuracy) {
    errors.push({ field: 'consentInfoAccuracy', message: 'You must confirm that the information provided is accurate.' })
  }
  if (!consents.consentRules) {
    errors.push({ field: 'consentRules', message: 'You must agree to abide by the event rules.' })
  }
  if (!consents.consentNoGuarantee) {
    errors.push({ field: 'consentNoGuarantee', message: 'You must acknowledge that registration is subject to verification.' })
  }
  if (!consents.consentDataProcessing) {
    errors.push({ field: 'consentDataProcessing', message: 'You must consent to data processing for event purposes.' })
  }

  return errors
}

export function validateRegistration(data: RegistrationData): ValidationError[] {
  const errors: ValidationError[] = [
    ...validateTeamInfo(data.team),
    ...validateParticipant(data.leader, 'leader'),
  ]

  data.members.forEach((member, i) => {
    errors.push(...validateParticipant(member, `member${i + 2}`))
  })

  const memberCount = 1 + data.members.length
  if (memberCount < eventConfig.minTeamSize) {
    errors.push({ field: 'members', message: `At least ${eventConfig.minTeamSize} participants are required.` })
  }
  if (memberCount > eventConfig.maxTeamSize) {
    errors.push({ field: 'members', message: `Maximum ${eventConfig.maxTeamSize} participants allowed.` })
  }

  if (!data.payment.utr?.trim()) {
    errors.push({ field: 'utr', message: 'UTR / transaction reference is required.' })
  } else if (!validateUTR(data.payment.utr)) {
    errors.push({ field: 'utr', message: 'Please enter a valid UTR / transaction reference.' })
  }

  const fileError = validateFile(data.payment.screenshot)
  if (fileError) {
    errors.push(fileError)
  }

  errors.push(...validateConsents(data.consents))

  return errors
}

export function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[\s-]/g, '')
  cleaned = cleaned.replace(/^(\+91|91)/, '')
  return cleaned
}
