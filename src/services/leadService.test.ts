import { describe, expect, it } from 'vitest'
import type { Activity, ActivityKind } from '../domain/types'
import { makeTestRepo } from '../test/makeTestRepo'
import { createLeadService } from './leadService'

// These tests describe behaviour through the LeadRepo / service interface. They
// say nothing about how data is stored, so they survive any refactor. Use them
// as the template when you TDD Lead Scoring.

const activity = (leadId: string, kind: ActivityKind, index: number): Activity => ({
  id: `activity_${index}`,
  leadId,
  kind,
  at: `2026-06-${String(index).padStart(2, '0')}T09:00:00.000Z`,
})

describe('leadService.listLeads', () => {
  it('scores existing history and orders the highest score first', () => {
    const repo = makeTestRepo(
      [
        { id: 'warm', lastActivityAt: '2026-06-20T09:00:00.000Z' },
        { id: 'hot', lastActivityAt: '2026-06-01T09:00:00.000Z' },
        { id: 'cold', lastActivityAt: '2026-06-21T09:00:00.000Z' },
      ],
      [activity('warm', 'email_reply', 1), activity('hot', 'demo_booked', 2)],
    )
    const service = createLeadService(repo)

    expect(service.listLeads().map(({ id, points, tier }) => ({ id, points, tier }))).toEqual([
      { id: 'hot', points: 50, tier: 'hot' },
      { id: 'warm', points: 25, tier: 'warm' },
      { id: 'cold', points: 0, tier: 'cold' },
    ])
  })

  it('breaks equal scores by most recent activity first', () => {
    const repo = makeTestRepo([
      { id: 'old', lastActivityAt: '2026-06-01T09:00:00.000Z' },
      { id: 'fresh', lastActivityAt: '2026-06-20T09:00:00.000Z' },
      { id: 'mid', lastActivityAt: '2026-06-10T09:00:00.000Z' },
    ])
    const service = createLeadService(repo)

    expect(service.listLeads().map((l) => l.id)).toEqual(['fresh', 'mid', 'old'])
  })

  it('breaks ties on equal recency by name', () => {
    const repo = makeTestRepo([
      { id: 'b', name: 'Bravo', lastActivityAt: '2026-06-10T09:00:00.000Z' },
      { id: 'a', name: 'Alpha', lastActivityAt: '2026-06-10T09:00:00.000Z' },
    ])
    const service = createLeadService(repo)

    expect(service.listLeads().map((l) => l.name)).toEqual(['Alpha', 'Bravo'])
  })

  it('returns the same priority from the list and detail read', () => {
    const repo = makeTestRepo(
      [{ id: 'target' }],
      [activity('target', 'pricing_visit', 1), activity('target', 'email_reply', 2)],
    )
    const service = createLeadService(repo)

    const listLead = service.listLeads()[0]
    const detailLead = service.getLead('target')

    expect(detailLead).toMatchObject({ points: listLead.points, tier: listLead.tier })
  })
})

describe('leadService.logReply', () => {
  it('records an email reply and moves the lead to the front of the list', () => {
    const repo = makeTestRepo([
      { id: 'target', lastActivityAt: '2026-06-01T09:00:00.000Z' },
      { id: 'other', lastActivityAt: '2026-06-15T09:00:00.000Z' },
    ])
    const service = createLeadService(repo)

    service.logReply('target')

    expect(service.listLeads()[0]).toMatchObject({ id: 'target', points: 25, tier: 'warm' })
    expect(service.getActivities('target')[0].kind).toBe('email_reply')
  })
})
