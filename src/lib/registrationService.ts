import type { RegistrationData, RegistrationResponse, CapacityResponse, RegistrationMode } from '../types'
import { REGISTRATION_API_URL } from '../config/constants'

function generateMockId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'UTK-26-'
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function submitRegistration(data: RegistrationData): Promise<RegistrationResponse> {
  const mode = (import.meta.env.VITE_REGISTRATION_MODE as RegistrationMode) || 'mock'

  if (mode === 'production' && !REGISTRATION_API_URL) {
    return {
      success: false,
      message: 'Registration service is temporarily unavailable. Your registration was not submitted. Please try again later.',
      errorCode: 'SERVICE_UNAVAILABLE',
    }
  }

  if (mode === 'mock') {
    await new Promise((r) => setTimeout(r, 1500))

    const requiredConsents = ['consent', 'consentInfoAccuracy', 'consentRules', 'consentNoGuarantee', 'consentDataProcessing'] as const
    for (const key of requiredConsents) {
      if (!data.consents[key]) {
        return {
          success: false,
          message: 'All consent fields are required.',
          errorCode: 'VALIDATION_ERROR',
        }
      }
    }

    return {
      success: true,
      registrationId: generateMockId(),
      status: 'PENDING_VERIFICATION',
      message: 'Your registration has been submitted and is pending payment verification.',
    }
  }

  try {
    console.log('[Registration] Starting production submission')

    const formData = new FormData()
    formData.append('teamName', data.team.teamName)
    formData.append('collegeName', data.team.collegeName)
    formData.append('district', data.team.district)
    formData.append('city', data.team.city)
    formData.append('leaderName', data.leader.fullName)
    formData.append('leaderEmail', data.leader.email)
    formData.append('leaderPhone', data.leader.phone || '')
    formData.append('leaderCourse', data.leader.course)
    formData.append('leaderSemester', data.leader.semester)
    formData.append('members', JSON.stringify(data.members))
    formData.append('utr', data.payment.utr)
    formData.append('consent', JSON.stringify(data.consents))

    if (data.payment.screenshot) {
      formData.append('screenshot', data.payment.screenshot)
    }

    console.log('[Registration] Sending POST to:', REGISTRATION_API_URL)

    const response = await fetch(REGISTRATION_API_URL!, {
      method: 'POST',
      body: formData,
    })

    console.log('[Registration] HTTP status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.log('[Registration] Error response:', errorData)
      return {
        success: false,
        message: errorData?.message || 'Registration failed. Please try again.',
        errorCode: errorData?.errorCode || 'INTERNAL_ERROR',
      }
    }

    const result = await response.json()
    console.log('[Registration] Success response:', result)
    return result
  } catch (err) {
    console.error('[Registration] Network error:', err)
    return {
      success: false,
      message: 'Registration service is temporarily unavailable. Your registration was not submitted. Please try again later.',
      errorCode: 'SERVICE_UNAVAILABLE',
    }
  }
}

export async function getCapacity(): Promise<CapacityResponse> {
  const mode = (import.meta.env.VITE_REGISTRATION_MODE as RegistrationMode) || 'mock'

  if (mode === 'production' && REGISTRATION_API_URL) {
    try {
      const response = await fetch(`${REGISTRATION_API_URL}?action=capacity`, {
        method: 'GET',
      })
      if (response.ok) {
        return await response.json()
      }
    } catch {
      // fall through to mock
    }
  }

  return {
    total: 50,
    claimed: 0,
    remaining: 50,
  }
}
