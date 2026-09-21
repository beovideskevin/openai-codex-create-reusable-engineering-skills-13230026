import type { LeadRepo } from "../domain/leadRepo";
import { scoreActivities } from "../domain/leadScoring";
import type { LeadScore } from "../domain/leadScoring";
import type { Activity, Lead } from "../domain/types";

export interface ScoredLead extends Lead {
  priority: LeadScore;
}

/** Read and shape leads for the UI through the LeadRepo seam. */
export function createLeadService(repo: LeadRepo) {
  return {
    /** All leads, prioritized by activity-derived score. */
    listLeads(): ScoredLead[] {
      return repo
        .getLeads()
        .map((lead) => ({
          ...lead,
          priority: scoreActivities(repo.getActivities(lead.id)),
        }))
        .sort((a, b) => {
          const byScore = b.priority.points - a.priority.points;
          if (byScore !== 0) return byScore;
          const byRecency = b.lastActivityAt.localeCompare(a.lastActivityAt);
          return byRecency !== 0 ? byRecency : a.name.localeCompare(b.name);
        });
    },

    getLead(id: string): ScoredLead | undefined {
      const lead = repo.getLead(id);
      if (!lead) return undefined;
      return {
        ...lead,
        priority: scoreActivities(repo.getActivities(id)),
      };
    },

    getActivities(leadId: string): Activity[] {
      return repo
        .getActivities(leadId)
        .sort((a, b) => b.at.localeCompare(a.at));
    },

    /** A lead replies to one of our emails. */
    logReply(leadId: string): Activity {
      return repo.recordActivity({ leadId, kind: "email_reply" });
    },
  };
}

export type LeadService = ReturnType<typeof createLeadService>;
