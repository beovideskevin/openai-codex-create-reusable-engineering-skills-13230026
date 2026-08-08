# Red30 CRM glossary

This is the shared language for the Red30 CRM domain. It is a glossary, not a product specification.

**Lead**: a prospective customer the sales team is trying to win. A lead has an owner, a status, and a stream of activity. Today the list is ordered only by recency.

**Activity**: a recorded action taken by a lead, represented by a fixed `ActivityKind`.

**ActivityKind**: one of `email_reply`, `email_open`, `demo_booked`, `pricing_visit`, or `call_logged`. The course will decide which activities signal buying intent.

**Owner**: the sales rep responsible for a lead, such as `priya` or `sam`. This is not the lead's company contact.

**Status**: the pipeline stage, currently `new`, `working`, or `qualified`.

**LeadRepo**: the data seam for leads and activities. Services and tests cross this interface.

<!-- Add Score and Tier only after the requirements lesson defines them. -->
