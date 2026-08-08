import type { Lead } from '../domain/types'
import type { PrototypeScore } from '../prototypes/leadScoringPrototype'
import { LeadRow } from './LeadRow'

export function LeadList({
  leads,
  selectedId,
  onSelect,
  onLogReply,
  scoreForLead,
}: {
  leads: Lead[]
  selectedId: string | null
  onSelect: (id: string) => void
  onLogReply: (id: string) => void
  scoreForLead?: (id: string) => PrototypeScore
}) {
  return (
    <table className="leads">
      <thead>
        <tr>
          <th>Lead</th>
          <th>Status</th>
          <th>Owner</th>
          {scoreForLead && <th>Priority</th>}
          <th>Last activity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead: Lead) => (
          <LeadRow
            key={lead.id}
            lead={lead}
            selected={lead.id === selectedId}
            onSelect={onSelect}
            onLogReply={onLogReply}
            prototypeScore={scoreForLead?.(lead.id)}
          />
        ))}
      </tbody>
    </table>
  )
}
