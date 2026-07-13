export interface TeamInfo {
  teamName: string
  collegeName: string
  district: string
  city: string
}

export interface Participant {
  fullName: string
  email: string
  course: string
  semester: string
  phone?: string
}

export interface TeamLeader extends Participant {}

export interface RegistrationData {
  team: TeamInfo
  leader: TeamLeader
  members: Participant[]
  payment: PaymentInfo
  consents: Consents
}

export interface PaymentInfo {
  utr: string
  screenshot: File | null
}

export interface Consents {
  consent: boolean
  consentInfoAccuracy: boolean
  consentRules: boolean
  consentNoGuarantee: boolean
  consentDataProcessing: boolean
}

export type RegistrationMode = 'production' | 'mock'
export type RegistrationStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED' | 'CANCELLED'
export type TeamSize = 2 | 3 | 4

export interface RegistrationResponse {
  success: boolean
  registrationId?: string
  status?: RegistrationStatus
  message: string
  error?: string
  errorCode?: string
}

export interface CapacityResponse {
  total: number
  claimed: number
  remaining: number
}

export interface FacultyMember {
  id: string
  name: string | null
  designation: string | null
  image: string
  priority: number
}

export interface TimelineEvent {
  time: string
  label: string
  isActive?: boolean
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Rule {
  category: string
  items: string[]
}

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'DUPLICATE_UTR'
  | 'DUPLICATE_LEADER_EMAIL'
  | 'DUPLICATE_LEADER_PHONE'
  | 'CAPACITY_FULL'
  | 'INVALID_FILE_TYPE'
  | 'FILE_TOO_LARGE'
  | 'STORAGE_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'INTERNAL_ERROR'
