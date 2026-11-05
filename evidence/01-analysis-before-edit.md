# Analysis recorded before editing

Date: 5 November 2026. Context: supplied Assignment 04, Assignment 03 report, Practice 06 and exact source ZIP. Preserve AC1-AC6, implement F1-F5, fictional data only, no backend or booking creation.

Repository map: App.tsx owns room state, parsing, request adaptation and all presentation; booking.tsx owns pure validation and boolean wrapper; fixtures.ts owns one room and test fixture; format.ts owns labels; booking.test.tsx owns regression tests.

Risks: (1) App.tsx repeats parseInt conversion for three inputs and silently maps invalid current time to zero; fractions are truncated. (2) App.tsx mixes evaluateRequest, room state and all presentation, making room-switch regression difficult to isolate. (3) fixtures.ts Room has neither ID nor equipment and mutable arrays; a single-room state model cannot isolate per-room schedules. (4) booking.tsx accepts fractional minutes although AC1 requires integers. Existing T16 uses now=-1, outside documented contract; retain as legacy compatibility but add valid-domain boundaries.

Prioritized plan: first execute baseline tests/build/lint/typecheck and preserve source. Next add typed catalog and pure ALL-equipment/capacity filtering. Then centralize strict input adaptation, retain validation signatures/messages and add integer checks. Extract room filters, request feedback and schedule components; derive selected room from visible catalog so stale results cannot survive filter changes. Preserve editable demo reference time and status control using per-room overrides. Add pure and UI integration tests, run full checks and document actual evidence.

Design decisions: pure functions for domain rules, React components for presentation (no extra design patterns). Derive availability on render instead of storing a verdict that can become stale. Blocked rooms remain discoverable if their capacity/equipment match, but can never pass availability while blocked.

AI suggestion modified: avoid a generic strategy/repository framework and full UI rewrite; retain the existing validation module, formatting helpers and Tailwind styling. Centralize parsing instead of copying the baseline parseInt pattern into new filter fields.
