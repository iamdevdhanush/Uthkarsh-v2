import type { FAQItem } from '../types'
import { eventConfig } from './eventConfig'

export const faqItems: FAQItem[] = [
  {
    question: 'Who can participate?',
    answer: 'Any inter-college student team can participate. Specific eligibility criteria will be detailed in the official event guidelines.',
  },
  {
    question: 'How many members are allowed per team?',
    answer: `Each team must have a minimum of ${eventConfig.minTeamSize} and a maximum of ${eventConfig.maxTeamSize} participants. The team leader counts as one participant.`,
  },
  {
    question: 'What is the registration fee?',
    answer: `The registration fee is ${eventConfig.registrationFeeFormatted} per team, regardless of whether the team has 2, 3, or 4 participants.`,
  },
  {
    question: 'How is payment verified?',
    answer: 'Payment is verified manually by the organising team using the UTR / transaction reference against the receiving account. Your registration status will be updated after successful verification.',
  },
  {
    question: 'When is registration confirmed?',
    answer: 'Registration is confirmed only after payment verification. You will receive a confirmation with a unique registration ID.',
  },
  {
    question: 'Will lunch be provided?',
    answer: `Yes, lunch will be provided by the college to all registered participants.`,
  },
  {
    question: 'Should participants bring laptops?',
    answer: 'Yes, participants are expected to bring their own laptops and necessary equipment for the hackathon.',
  },
  {
    question: 'Can AI tools be used?',
    answer: 'Policy on AI tool usage during the hackathon will be communicated in the official guidelines and announced on the event day.',
  },
  {
    question: 'When are problem statements revealed?',
    answer: 'The problem statement is revealed on the day of the event, at the start of the hackathon.',
  },
  {
    question: 'How can participants reach the venue?',
    answer: `The event is hosted at ${eventConfig.institutionFull}, Shivamogga, Karnataka. Detailed directions will be shared with registered participants.`,
  },
]
