export type PrototypeTier = 'hot' | 'warm' | 'cold'

export interface PrototypeScore {
  points: number
  tier: PrototypeTier
  reason: string
}

const highlighted: Record<string, PrototypeScore> = {
  lead_2: { points: 86, tier: 'hot', reason: 'Demo booked and replied' },
  lead_5: { points: 72, tier: 'hot', reason: 'Pricing visit and demo booked' },
  lead_13: { points: 68, tier: 'hot', reason: 'Reply followed by a demo' },
  lead_28: { points: 61, tier: 'hot', reason: 'High-intent activity' },
}

export function prototypeScore(leadId: string): PrototypeScore {
  const featured = highlighted[leadId]
  if (featured) return featured

  const numericId = Number(leadId.replace('lead_', ''))
  const points = (numericId * 13) % 51
  const tier: PrototypeTier = points >= 35 ? 'warm' : 'cold'
  return { points, tier, reason: tier === 'warm' ? 'Recent engagement' : 'Low buying intent' }
}
