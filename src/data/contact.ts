import type { ContactConfig } from '../types'

export const contactConfig: ContactConfig = {
  facultyCoordinators: [
    { name: null, role: null, phone: null, email: null, photo: null },
  ],
  studentCoordinators: [
    { name: 'Dhanush D Prabhu', role: 'Student Coordinator', phone: '7624828817', email: null, photo: null },
    { name: 'ABC', role: 'Student Coordinator', phone: null, email: null, photo: null },
    { name: 'DEF', role: 'Student Coordinator', phone: null, email: null, photo: null },
  ],
  official: {
    email: null,
    phone: null,
    website: null,
  },
  whatsapp: '7624828817',
  registrationSupport: null,
}

export const hasContactData = (): boolean => {
  const { facultyCoordinators, studentCoordinators, official, whatsapp, registrationSupport } = contactConfig

  const hasFaculty = facultyCoordinators.some(c => c.name || c.phone || c.email)
  const hasStudent = studentCoordinators.some(c => c.name || c.phone || c.email)
  const hasOfficial = official.email !== null || official.phone !== null
  const hasWhatsapp = whatsapp !== null
  const hasRegistrationSupport = registrationSupport !== null

  return hasFaculty || hasStudent || hasOfficial || hasWhatsapp || hasRegistrationSupport
}

export const hasAnyCoordinator = (): boolean => {
  const allCoords = [...contactConfig.facultyCoordinators, ...contactConfig.studentCoordinators]
  return allCoords.some(c => c.name || c.phone || c.email)
}

export const hasPhoneContact = (): boolean => {
  const { facultyCoordinators, studentCoordinators, official } = contactConfig
  const allPeople = [...facultyCoordinators, ...studentCoordinators]
  return allPeople.some(p => p.phone !== null) || official.phone !== null
}

export const hasEmailContact = (): boolean => {
  const { facultyCoordinators, studentCoordinators, official } = contactConfig
  const allPeople = [...facultyCoordinators, ...studentCoordinators]
  return allPeople.some(p => p.email !== null) || official.email !== null
}

export const hasWhatsappContact = (): boolean => {
  return contactConfig.whatsapp !== null
}
