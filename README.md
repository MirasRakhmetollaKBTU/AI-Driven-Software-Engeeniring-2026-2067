# Software Engineering Assignment 04

**Smart Campus Room Availability Checker**

- Student: **Rakhmetolla Miras**
- Class: **Wednesday 8:00-11:00**
- AI assistant: OpenAI Codex

This project extends the supplied single-room React and TypeScript prototype into a fictional four-room catalog. It filters rooms by capacity and all required equipment, then checks availability using the selected room's own bookings. No backend, login, database, live API or booking creation is included.

## Repository structure

```text
.
├── screenshots/     Interface, filtering, room switching and test screenshots
├── initial/         Original source preserved without edits
├── final/           Extended application and executable tests
├── evidence/        Test logs, pre-edit analysis, AI record and review notes
├── README.md
└── Assignment_04_Report_Rakhmetolla_Miras.pdf  (local only; Git-ignored)
```

The assignment report is kept locally and submitted separately. It is excluded from Git because it contains the student ID. [Қазақша нұсқаулық](evidence/START_HERE_KK.md)

## Setup and run

Install Node.js 20 or newer with npm. Internet is needed for the first dependency installation.

```sh
cd final
npm ci
npm run dev
```

Open the local address printed by Vite, usually http://localhost:5173/. Run these commands inside `final/`, where the application package.json is located.

## Automated verification

```sh
cd final
npm test -- --reporter=verbose
npm run typecheck
npm run lint
npm run build
```

If already inside `final/`, omit `cd final`.

| Check | Original | Final |
| --- | --- | --- |
| Executable tests | 38/38 passed | 64/64 passed across 3 files |
| Type checking | Passed | Passed |
| Lint | Passed | Passed |
| Production build | Passed after output-directory retry | Passed |

Execution logs are in [evidence/](evidence/); local machine paths have been redacted for publication. Original logs remain in the Git-ignored `evidence/private/` directory. The original build first failed with a Windows directory permission error; a retry to a fresh output directory passed. Both outputs are preserved. The original test file remains unchanged. The final suite adds 25 domain/catalog cases and one mounted React DOM integration scenario.

To reproduce the baseline, run `npm ci` and the same verification commands from `initial/`. Dependencies and build outputs are excluded from Git.

## Acceptance criteria and new features

- AC1: whole minutes within `0 <= start < end <= 1440`, with `start > now`.
- AC2: at most 120 minutes; exactly 120 is accepted.
- AC3: a blocked room is unavailable.
- AC4: intervals overlap only when `start < existing.end && existing.start < end`; touching endpoints are allowed.
- AC5: validation does not mutate booking fixtures.
- AC6: clear feedback, labelled controls and a responsive layout.
- F1-F5: capacity and ALL-equipment filters, blocked rejection, empty state and immediate room-specific result refresh.

## Demonstration

1. Leave attendees at 1 and equipment empty. For Engineering Hall, current time `615`, start `660`, end `720`: **Available**.
2. Switch to Library Seminar 101 with the same values: **Unavailable**, overlapping its `660-720` booking. Both schedule and verdict update.
3. Set attendees to `30` and select Computers: only Computing Lab matches. Add Video conferencing: no matches.
4. Set attendees to `101`: clear empty state and **Unavailable**; no stale room remains selected.
5. Clear filters and select Campus Auditorium: **Unavailable** because it is blocked.
6. Engineering Hall, now `615`: `780-900` is accepted (120 minutes), `780-901` is rejected (121 minutes), `615-645` is rejected (starts now).
7. Toggle demo status to test blocking. Overrides affect only the selected room and never modify bookings. Reload resets demo state.

## Screenshots

| Screenshot | Evidence shown |
| --- | --- |
| [01 Available request](screenshots/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202026-11-05%20231217.png) | Engineering Hall, now 615, request 660-720: Available. |
| [02 Room switch and overlap](screenshots/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202026-11-05%20231259.png) | Same request in Library Seminar: Unavailable with its own 11:00-12:00 overlap. |
| [03 Capacity and equipment](screenshots/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202026-11-05%20231328.png) | 30 attendees and Computers: only Computing Lab 302 matches. |
| [04 Empty state](screenshots/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202026-11-05%20231338.png) | 101 attendees: no matching rooms and Unavailable. |
| [05 Blocked room](screenshots/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202026-11-05%20231403.png) | Campus Auditorium: Unavailable because it is blocked. |
| [06 Test results](screenshots/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%202026-11-05%20231557.png) | Student-supplied terminal screenshot: all 64 tests passed. |
| [07 Mobile browser review](screenshots/mobile-375px-verified.png) | Assistant-captured 375px browser view; stacked panels without horizontal overflow. |

The six original screenshots were supplied by the student. The seventh records the later browser review by the assistant. Images stay in their original form.

## Design and evidence

- `fixtures.ts`: room metadata and separate fictional booking schedules.
- `booking.tsx`: pure availability rules and the existing boolean wrapper.
- `filtering.ts`: strict integer parsing, capacity/equipment matching and visible selection.
- `availability.ts`: raw-input adapter using the chosen room.
- `components/`: filters, request feedback and read-only schedule presentation.
- `App.tsx`: state orchestration and derived verdict.

[Pre-edit analysis](evidence/01-analysis-before-edit.md) records risks and priorities. [AI-use record](evidence/AI-use-record.md) explains context, outputs and decisions. [Browser review](evidence/browser-review.md) records the successful follow-up after the initial browser-launch failure.

Desktop and 375px layouts were inspected in the follow-up browser session. Capacity/equipment filtering, room switching, blocked rejection, empty state and the 120/121-minute boundary were exercised. No formal accessibility audit or performance benchmark is claimed. The direct validator assumes a valid current-time parameter; the UI adapter checks it. Legacy T16 uses `now=-1` outside that precondition and remains unchanged for compatibility.

## Submission review

Review the report, reproduce the demonstration and add your own observations in the local `evidence/human-review.md` file (Git-ignored). The dated AI and test records are retained because the assignment requires an AI-use date; a preparation date is omitted from the cover.

Deadline in the supplied brief: **8 November 2026, 23:59:59**. Email subject: `Software Engineering - Assignment #04 - Rakhmetolla Miras`. No email has been sent.

## Publication privacy

PDF/Word reports, ZIP archives, human-review notes, raw private evidence, environment files and common credential/key files are ignored by Git. The student ID is omitted from tracked text. Screenshots show fictional application data and a test summary. The report is provided to the reviewer separately, so a public code repository can be reviewed without publishing the student ID.
