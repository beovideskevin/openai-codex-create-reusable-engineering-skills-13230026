// Red30 CRM core domain types.
//
// EXTENSION POINT: there is deliberately no score or tier here yet.

export type LeadStatus = 'new' | 'working' | 'qualified'

/** The kinds of activity a lead can generate. Some signal real buying intent
 *  while others are noisy. The requirements lesson will define the policy. */
export type ActivityKind =
  | 'email_reply'
  | 'email_open'
  | 'demo_booked'
  | 'pricing_visit'
  | 'call_logged'

export interface Lead {
  id: string
  name: string
  company: string
  title: string
  email: string
  owner: string // the rep who owns the lead
  status: LeadStatus
  createdAt: string // ISO
  lastActivityAt: string // ISO timestamp used by the current list ordering
}

export interface Activity {
  id: string
  leadId: string
  kind: ActivityKind
  at: string // ISO
}
