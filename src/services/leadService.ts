import type { LeadRepo } from '../domain/leadRepo'
import { scoreActivities, type ScoredLead } from '../domain/scoring'
import type { Activity, Lead } from '../domain/types'

/**
 * Read/shape leads for the UI. Built over the LeadRepo seam so it's testable
 * through this interface (see leadService.test.ts).
 *
 * Lead Scoring stays above the repository seam so storage remains concerned
 * only with leads and activities. Both list and detail reads use the same
 * projection, which keeps their priority values consistent.
 */
export function createLeadService(repo: LeadRepo) {
  const scoreLead = (lead: Lead): ScoredLead => ({
    ...lead,
    ...scoreActivities(repo.getActivities(lead.id)),
  })

  return {
    /** All leads, highest buying intent first. */
    listLeads(): ScoredLead[] {
      return repo.getLeads().map(scoreLead).sort((a, b) => {
        const byScore = b.points - a.points
        if (byScore !== 0) return byScore
        const byRecency = b.lastActivityAt.localeCompare(a.lastActivityAt)
        return byRecency !== 0 ? byRecency : a.name.localeCompare(b.name)
      })
    },

    getLead(id: string): ScoredLead | undefined {
      const lead = repo.getLead(id)
      return lead ? scoreLead(lead) : undefined
    },

    getActivities(leadId: string): Activity[] {
      return repo
        .getActivities(leadId)
        .sort((a, b) => b.at.localeCompare(a.at))
    },

    /** A lead replies to one of our emails. Records the activity (and, today,
     *  just bumps recency). This is the seam Lead Scoring hooks into. */
    logReply(leadId: string): Activity {
      return repo.recordActivity({ leadId, kind: 'email_reply' })
    },
  }
}

export type LeadService = ReturnType<typeof createLeadService>
