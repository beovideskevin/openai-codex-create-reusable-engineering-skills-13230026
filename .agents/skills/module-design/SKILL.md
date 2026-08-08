---
name: module-design
description: >-
  Vocabulary and rules for designing a module: a lot of behavior behind a small interface, placed
  at a clean seam, tested through that interface. Use when shaping an interface, deciding where a
  seam belongs, making code testable, or when another skill needs this vocabulary. Triggers:
  "design this module", "where does the seam go", "is this interface right". Not for writing the
  implementation (use the build skill).
---

# Module Design

Hide a lot of behavior behind a small interface, at a seam a test can attach to.

## Glossary

Use these words exactly. Do not swap in "component", "service", "layer", or "API".

- **Module**: an Interface with an Implementation hidden behind it.
- **Interface**: the surface other code imports. Names, inputs, outputs. No logic.
- **Implementation**: everything behind the Interface. All the logic lives here.
- **Depth**: how much Implementation sits behind how little Interface. Depth is the goal.
- **Seam**: the point where one Implementation can be swapped for another. Tests attach here.
- **Adapter**: a logic-free wrapper translating the Interface to something external: a database, an HTTP API, a queue.

## Principles

- **Push complexity down, not out.** A caller should learn a little and get a lot. A wide Interface over a thin Implementation makes every caller pay and hands back nothing.
- **The Interface is the test surface.** If you cannot test the behavior through the Interface, the Interface is wrong. A test that reaches behind it welds itself to detail that should be free to move.
- **Measure depth by deletion.** If this Module vanished, how much would its callers have to learn to cope? A lot means it was deep. Almost nothing means it was never earning its place.
- **One Adapter is a guess at a Seam. Two Adapters is a Seam.** Do not build a swap point until a second real Implementation exists.
- **Make the change easy, then make it.** When a change fights the current shape, reshape first. Forcing it through the wrong shape leaves you with both problems.

## Design it twice

Before settling on an Interface, sketch two or three that differ structurally: the smallest surface a caller must learn, the most permissive surface, and the one easiest for the call site you write most often. Pick the deepest. Sketching costs minutes. The wrong Interface costs every caller that imports it.

## Hard rules

- Define the Interface before writing any logic, and let callers import only the Interface. Why: the Interface is the promise you have to keep, and the Implementation is free to change only because nothing reaches past it.
- An Interface past roughly fifteen methods is two Modules. Why: Interface size is what callers pay to learn, and one Module should teach one idea.
- Never add a Seam, Interface, or Adapter for a single Implementation. Why: an unused swap point is pure cost, an extra hop to read and a fake to maintain, with nothing on the other side of it.
