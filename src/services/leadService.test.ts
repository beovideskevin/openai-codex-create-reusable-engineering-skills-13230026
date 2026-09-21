import { describe, expect, it } from "vitest";
import { InMemoryLeadRepo } from "../domain/leadRepo";
import type { Activity, Lead } from "../domain/types";
import { makeTestRepo } from "../test/makeTestRepo";
import { createLeadService } from "./leadService";

// These tests describe behaviour through the LeadRepo / service interface. They
// say nothing about how data is stored, so they survive any refactor. Use them
// as the template when you TDD Lead Scoring.

describe("leadService.listLeads", () => {
  it("calculates real priority and sorts leads by score, recency, then name", () => {
    const leads: Lead[] = [
      {
        id: "warm",
        name: "Warm Lead",
        company: "Acme",
        title: "Buyer",
        email: "warm@acme.com",
        owner: "priya",
        status: "new",
        createdAt: "2026-06-01T09:00:00.000Z",
        lastActivityAt: "2026-06-20T09:00:00.000Z",
      },
      {
        id: "hot",
        name: "Hot Lead",
        company: "Acme",
        title: "Buyer",
        email: "hot@acme.com",
        owner: "priya",
        status: "new",
        createdAt: "2026-06-01T09:00:00.000Z",
        lastActivityAt: "2026-06-10T09:00:00.000Z",
      },
      {
        id: "cold",
        name: "Cold Lead",
        company: "Acme",
        title: "Buyer",
        email: "cold@acme.com",
        owner: "priya",
        status: "new",
        createdAt: "2026-06-01T09:00:00.000Z",
        lastActivityAt: "2026-06-20T09:00:00.000Z",
      },
      {
        id: "empty",
        name: "Empty Lead",
        company: "Acme",
        title: "Buyer",
        email: "empty@acme.com",
        owner: "priya",
        status: "new",
        createdAt: "2026-06-01T09:00:00.000Z",
        lastActivityAt: "2026-06-01T09:00:00.000Z",
      },
    ];
    const activities: Activity[] = [
      {
        id: "activity-1",
        leadId: "warm",
        kind: "email_reply",
        at: "2026-06-20T09:00:00.000Z",
      },
      {
        id: "activity-2",
        leadId: "hot",
        kind: "demo_booked",
        at: "2026-06-10T09:00:00.000Z",
      },
      {
        id: "activity-3",
        leadId: "hot",
        kind: "email_open",
        at: "2026-06-09T09:00:00.000Z",
      },
      {
        id: "activity-4",
        leadId: "cold",
        kind: "email_open",
        at: "2026-06-20T09:00:00.000Z",
      },
    ];
    const service = createLeadService(
      new InMemoryLeadRepo({ leads, activities }),
    );

    expect(
      service.listLeads().map((lead) => ({
        id: lead.id,
        points: lead.priority.points,
        tier: lead.priority.tier,
      })),
    ).toEqual([
      { id: "hot", points: 51, tier: "hot" },
      { id: "warm", points: 25, tier: "warm" },
      { id: "cold", points: 1, tier: "cold" },
      { id: "empty", points: 0, tier: "cold" },
    ]);
  });

  it("returns the same priority from getLead as from listLeads", () => {
    const repo = new InMemoryLeadRepo({
      leads: [
        {
          id: "selected",
          name: "Selected Lead",
          company: "Acme",
          title: "Buyer",
          email: "selected@acme.com",
          owner: "priya",
          status: "new",
          createdAt: "2026-06-01T09:00:00.000Z",
          lastActivityAt: "2026-06-20T09:00:00.000Z",
        },
      ],
      activities: [
        {
          id: "activity-selected",
          leadId: "selected",
          kind: "demo_booked",
          at: "2026-06-20T09:00:00.000Z",
        },
      ],
    });
    const service = createLeadService(repo);

    const listed = service.listLeads()[0];
    const selected = service.getLead("selected");

    expect(selected?.priority).toEqual(listed.priority);
  });

  it("orders leads by most recent activity first", () => {
    const repo = makeTestRepo([
      { id: "old", lastActivityAt: "2026-06-01T09:00:00.000Z" },
      { id: "fresh", lastActivityAt: "2026-06-20T09:00:00.000Z" },
      { id: "mid", lastActivityAt: "2026-06-10T09:00:00.000Z" },
    ]);
    const service = createLeadService(repo);

    expect(service.listLeads().map((l) => l.id)).toEqual([
      "fresh",
      "mid",
      "old",
    ]);
  });

  it("breaks ties on equal recency by name", () => {
    const repo = makeTestRepo([
      { id: "b", name: "Bravo", lastActivityAt: "2026-06-10T09:00:00.000Z" },
      { id: "a", name: "Alpha", lastActivityAt: "2026-06-10T09:00:00.000Z" },
    ]);
    const service = createLeadService(repo);

    expect(service.listLeads().map((l) => l.name)).toEqual(["Alpha", "Bravo"]);
  });
});

describe("leadService.logReply", () => {
  it("adds 25 points and immediately reorders the queue by scored priority", () => {
    const repo = new InMemoryLeadRepo({
      leads: [
        {
          id: "target",
          name: "Target Lead",
          company: "Acme",
          title: "Buyer",
          email: "target@acme.com",
          owner: "priya",
          status: "new",
          createdAt: "2026-06-01T09:00:00.000Z",
          lastActivityAt: "2026-06-10T09:00:00.000Z",
        },
        {
          id: "other",
          name: "Other Lead",
          company: "Acme",
          title: "Buyer",
          email: "other@acme.com",
          owner: "priya",
          status: "new",
          createdAt: "2026-06-01T09:00:00.000Z",
          lastActivityAt: "2026-06-20T09:00:00.000Z",
        },
      ],
      activities: [
        {
          id: "activity-target",
          leadId: "target",
          kind: "email_open",
          at: "2026-06-10T09:00:00.000Z",
        },
        {
          id: "activity-other",
          leadId: "other",
          kind: "email_reply",
          at: "2026-06-20T09:00:00.000Z",
        },
      ],
    });
    const service = createLeadService(repo);

    service.logReply("target");

    expect(service.getLead("target")?.priority.points).toBe(26);
    expect(service.listLeads().map((lead) => lead.id)).toEqual([
      "target",
      "other",
    ]);
  });

  it("records an email reply and moves the lead to the front of the list", () => {
    const repo = makeTestRepo([
      { id: "target", lastActivityAt: "2026-06-01T09:00:00.000Z" },
      { id: "other", lastActivityAt: "2026-06-15T09:00:00.000Z" },
    ]);
    const service = createLeadService(repo);

    service.logReply("target");

    // recency-only ordering: a fresh reply jumps the lead to the top — even
    // though "worth" hasn't been considered at all. (That's the bug to fix.)
    expect(service.listLeads()[0].id).toBe("target");
    expect(service.getActivities("target")[0].kind).toBe("email_reply");
  });
});
