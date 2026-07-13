import type { Rule } from '../types'
import { eventConfig } from './eventConfig'

export const rules: Rule[] = [
  {
    category: 'Eligibility',
    items: [
      'Open to all inter-college students with valid institutional ID.',
      'Participants must be currently enrolled in a recognised institution.',
    ],
  },
  {
    category: 'Team Composition',
    items: [
      `Each team must consist of ${eventConfig.minTeamSize} to ${eventConfig.maxTeamSize} participants.`,
      'The team leader counts as one participant.',
      'Team members may be from different institutions unless specified otherwise.',
    ],
  },
  {
    category: 'Development Rules',
    items: [
      'All development must happen within the designated hackathon hours.',
      'Teams must build working solutions; theoretical submissions will not be accepted.',
      'Pre-built solutions or code not written during the hackathon are not permitted.',
    ],
  },
  {
    category: 'AI Tool Policy',
    items: [
      'Use of AI tools and code assistants is subject to guidelines announced on the event day.',
      'All submitted code must be reviewed and understood by team members.',
    ],
  },
  {
    category: 'Submission Requirements',
    items: [
      'A working prototype or application must be submitted before the hard deadline.',
      'Source code and documentation must be provided as per submission guidelines.',
      'Late submissions will not be accepted under any circumstances.',
    ],
  },
  {
    category: 'Judging',
    items: [
      'Submissions will be evaluated by a panel of judges.',
      'Judging criteria will be shared at the start of the hackathon.',
      'The decision of the judges is final and binding.',
    ],
  },
]
