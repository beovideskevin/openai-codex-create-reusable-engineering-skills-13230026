import type { Activity } from "./types";

export type LeadTier = "hot" | "warm" | "cold";

export interface LeadScore {
  points: number;
  tier: LeadTier;
  contributingActivities: readonly Activity[];
}

export function scoreActivities(activities: readonly Activity[]): LeadScore {
  const points = activities.reduce((total, activity) => {
    const weight = {
      demo_booked: 50,
      email_reply: 25,
      pricing_visit: 10,
      call_logged: 5,
      email_open: 1,
    }[activity.kind];
    return total + weight;
  }, 0);

  const tier: LeadTier = points >= 50 ? "hot" : points >= 20 ? "warm" : "cold";
  return { points, tier, contributingActivities: activities };
}
