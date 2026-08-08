import type { Lead } from '../domain/types'
import type { PrototypeScore } from '../prototypes/leadScoringPrototype'
import { initials, relativeTime, statusLabel } from './format'

export function LeadRow({
  lead,
  selected,
  onSelect,
  onLogReply,
  prototypeScore,
}: {
  lead: Lead
  selected: boolean
  onSelect: (id: string) => void
  onLogReply: (id: string) => void
  prototypeScore?: PrototypeScore
}) {
  return (
    <tr className={selected ? 'row selected' : 'row'} onClick={() => onSelect(lead.id)}>
      <td className="cell-lead">
        <span className="avatar">{initials(lead.name)}</span>
        <span className="lead-text">
          <span className="lead-name">{lead.name}</span>
          <span className="lead-sub">
            {lead.title} · {lead.company}
          </span>
        </span>
      </td>
      <td>
        <span className={`status status-${lead.status}`}>{statusLabel[lead.status]}</span>
      </td>
      <td className="muted">{lead.owner}</td>
      {prototypeScore && (
        <td>
          <span className={`score score-${prototypeScore.tier}`}>{prototypeScore.points}</span>
          <span className={`tier tier-${prototypeScore.tier}`}>{prototypeScore.tier}</span>
        </td>
      )}
      <td className="muted">{relativeTime(lead.lastActivityAt)}</td>
      <td className="cell-action">
        <button
          className="btn-reply"
          onClick={(e) => {
            e.stopPropagation()
            onLogReply(lead.id)
          }}
        >
          Log reply
        </button>
      </td>
    </tr>
  )
}
