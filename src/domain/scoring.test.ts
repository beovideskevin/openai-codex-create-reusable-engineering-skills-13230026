import { describe, expect, it } from 'vitest'
import type { Activity, ActivityKind } from './types'
import { scoreActivities } from './scoring'

const activity = (kind: ActivityKind, index: number): Activity => ({
  id: `activity_${index}`,
  leadId: 'lead',
  kind,
  at: `2026-06-${String(index).padStart(2, '0')}T09:00:00.000Z`,
})

describe('scoreActivities', () => {
  it('adds the accepted points for every activity occurrence', () => {
    const activities = [
      activity('demo_booked', 1),
      activity('email_reply', 2),
      activity('pricing_visit', 3),
      activity('call_logged', 4),
      activity('email_open', 5),
      activity('email_open', 6),
    ]

    expect(scoreActivities(activities)).toEqual({ points: 92, tier: 'hot' })
  })

  it('returns cold with zero points when there is no activity', () => {
    expect(scoreActivities([])).toEqual({ points: 0, tier: 'cold' })
  })

  it('uses the accepted warm and hot thresholds', () => {
    expect(scoreActivities([activity('email_reply', 1)])).toEqual({ points: 25, tier: 'warm' })
    expect(scoreActivities([activity('demo_booked', 1)])).toEqual({ points: 50, tier: 'hot' })
  })
})
