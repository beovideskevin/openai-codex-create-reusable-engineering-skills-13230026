import type { ScoredLead } from '../domain/scoring'
import { LeadRow } from './LeadRow'

export function LeadList({
  leads,
  selectedId,
  onSelect,
  onLogReply,
}: {
  leads: ScoredLead[]
  selectedId: string | null
  onSelect: (id: string) => void
  onLogReply: (id: string) => void
}) {
  return (
    <table className="leads">
      <thead>
        <tr>
          <th>Lead</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Priority</th>
          <th>Last activity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <LeadRow
            key={lead.id}
            lead={lead}
            selected={lead.id === selectedId}
            onSelect={onSelect}
            onLogReply={onLogReply}
          />
        ))}
      </tbody>
    </table>
  )
}
