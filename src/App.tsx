import { useMemo, useRef, useState } from 'react'
import { seededRepo } from './domain/seed'
import { createLeadService } from './services/leadService'
import { LeadList } from './ui/LeadList'
import { LeadDetail } from './ui/LeadDetail'

export default function App() {
  // One in-memory repo for the session; a `tick` forces a re-read after writes.
  const repoRef = useRef(seededRepo())
  const service = useMemo(() => createLeadService(repoRef.current), [])
  const [, setTick] = useState(0)
  const refresh = () => setTick((t) => t + 1)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const leads = service.listLeads()
  const selected = selectedId ? service.getLead(selectedId) : undefined

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">◈</span> Red30 CRM
        </div>
        <nav className="nav">
          <span className="nav-item active">Leads</span>
          <span className="nav-item">Deals</span>
          <span className="nav-item">Reports</span>
        </nav>
        <div className="user">priya@red30.com</div>
      </header>

      <div className="session-banner">
        <strong>Lead Scoring:</strong> the queue now ranks leads by buying intent, not recency alone.
      </div>

      <main className="content">
        <section className="leads-panel">
          <div className="panel-head">
            <h1>Leads</h1>
            <span className="count">{leads.length} leads · sorted by score</span>
          </div>
          <LeadList
            leads={leads}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onLogReply={(id) => {
              service.logReply(id)
              refresh()
            }}
          />
        </section>

        {selected && (
          <LeadDetail
            lead={selected}
            activities={service.getActivities(selected.id)}
            onClose={() => setSelectedId(null)}
          />
        )}
      </main>
    </div>
  )
}
