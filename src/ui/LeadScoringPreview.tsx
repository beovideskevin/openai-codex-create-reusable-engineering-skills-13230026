import { useState } from 'react'

type PriorityTier = 'hot' | 'warm' | 'cold'

interface PreviewLead {
    id: string
    name: string
    title: string
    company: string
    owner: string
    score: number
    tier: PriorityTier
    reason: string
}

const MOCKED_LEADS: PreviewLead[] = [
    { id: 'mock-1', name: 'Lena Petrov', title: 'COO', company: 'Atlas Robotics', owner: 'priya', score: 92, tier: 'hot', reason: 'Recent demo and pricing activity' },
    { id: 'mock-2', name: 'Hugo Martin', title: 'CTO', company: 'Verge Analytics', owner: 'sam', score: 81, tier: 'hot', reason: 'Repeated pricing visits and a reply' },
    { id: 'mock-3', name: 'Dana Okafor', title: 'VP Operations', company: 'Northwind Logistics', owner: 'priya', score: 64, tier: 'warm', reason: 'A recent reply with pricing interest' },
    { id: 'mock-4', name: 'Priya Nair', title: 'Procurement Lead', company: 'Solstice Energy', owner: 'priya', score: 38, tier: 'warm', reason: 'Recent email open without a reply' },
    { id: 'mock-5', name: 'Tom Vargas', title: 'Broker', company: 'Pinnacle Realty', owner: 'sam', score: 17, tier: 'cold', reason: 'Only low-intent activity recorded' },
]

const tierLabel: Record<PriorityTier, string> = {
    hot: 'Hot',
    warm: 'Warm',
    cold: 'Cold',
}

function MockedLabel() {
    return <span className="mocked-label">unconfirmed</span>
}

export function LeadScoringPreview() {
    const [selectedId, setSelectedId] = useState(MOCKED_LEADS[0].id)
    const selected = MOCKED_LEADS.find((lead) => lead.id === selectedId) ?? MOCKED_LEADS[0]

    return (
        <div className="app">
            <header className="topbar">
                <div className="brand"><span className="brand-mark">◈</span> Red30 CRM</div>
                <nav className="nav"><span className="nav-item active">Leads</span><span className="nav-item">Deals</span><span className="nav-item">Reports</span></nav>
                <div className="user">prototype preview</div>
            </header>

            <div className="session-banner prototype-banner">
                <strong>Prototype:</strong> Lead Scoring uses local fake data. Every score and tier is <MockedLabel />.
            </div>

            <main className="content">
                <section className="leads-panel">
                    <div className="panel-head">
                        <h1>Lead priority</h1>
                        <span className="count">{MOCKED_LEADS.length} mocked leads <MockedLabel /> - sorted by score</span>
                    </div>
                    <table className="leads">
                        <thead>
                            <tr><th>Lead</th><th>Priority</th><th>Score</th><th>Owner</th></tr>
                        </thead>
                        <tbody>
                            {MOCKED_LEADS.map((lead) => (
                                <tr className={lead.id === selectedId ? 'row selected' : 'row'} key={lead.id} onClick={() => setSelectedId(lead.id)}>
                                    <td className="cell-lead">
                                        <span className="avatar">{lead.name.split(' ').map((part) => part[0]).join('')}</span>
                                        <span className="lead-text"><span className="lead-name">{lead.name} <MockedLabel /></span><span className="lead-sub">{lead.title} - {lead.company} <MockedLabel /></span></span>
                                    </td>
                                    <td><span className={`priority priority-${lead.tier}`}>{tierLabel[lead.tier]}</span> <MockedLabel /></td>
                                    <td><strong>{lead.score}</strong> <MockedLabel /></td>
                                    <td className="muted">{lead.owner} <MockedLabel /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <aside className="detail">
                    <div className="detail-head">
                        <span className="avatar lg">{selected.name.split(' ').map((part) => part[0]).join('')}</span>
                        <div><h2>{selected.name} <MockedLabel /></h2><p className="muted">{selected.title} - {selected.company} <MockedLabel /></p></div>
                    </div>
                    <div className="priority-callout">
                        <span className={`priority priority-${selected.tier}`}>{tierLabel[selected.tier]}</span>
                        <strong>{selected.score}</strong>
                        <MockedLabel />
                    </div>
                    <dl className="detail-meta">
                        <div><dt>Priority</dt><dd>{tierLabel[selected.tier]} <MockedLabel /></dd></div>
                        <div><dt>Score</dt><dd>{selected.score} <MockedLabel /></dd></div>
                        <div><dt>Owner</dt><dd>{selected.owner} <MockedLabel /></dd></div>
                        <div><dt>Why</dt><dd>{selected.reason} <MockedLabel /></dd></div>
                    </dl>
                    <p className="muted preview-note">This preview asks whether priority makes the next contact obvious. It does not change lead data.</p>
                </aside>
            </main>
        </div>
    )
}