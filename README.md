# Athletics Sports Club - Phase 2

Dynamic multi-page React app built with Vite. This phase upgrades the static prototype to consume the local Athletics Sports Club REST API with read-only flows (GET endpoints), asynchronous state handling, and route-based navigation.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Local Athletics Sports Club REST API running (Docker Compose backend)

### Install and run

```bash
npm install
npm run dev
```

Open: http://localhost:5173

### API base URL

The frontend reads this environment variable:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

If not provided, the app uses `http://localhost:8000/api/v1` by default.

## Phase 2 Scope Implemented

- Replaced static JSON imports with `fetch()` calls to REST API endpoints.
- Implemented `useEffect` + `useState` for asynchronous data fetching.
- Added loading and error UI states in API-driven pages.
- Implemented multi-page routing with list and detail views.
- Kept this phase read-only (GET only), as requested.

## Routes

- `/` - Home
- `/athletes` - Athletes list (GET `/people/athletes`)
- `/athletes/:publicId` - Athlete detail (GET `/people/athletes/{public_id}`)
- `/coaches` - Coaches list (GET `/people/coaches`)
- `/coaches/:publicId` - Coach detail (GET `/people/coaches/{public_id}`)
- `/schedule` - Trainings/sessions list (GET `/scheduling/trainings`)
- `/competitions` - Competitions list (GET `/scheduling/competitions`)
- `/competitions/:publicId` - Competition detail (GET `/scheduling/competitions/{public_id}`)

## Component Expansion

New components added for phase 2 include:

- `src/components/common/LoadingState/LoadingState.jsx`
- `src/components/common/ErrorState/ErrorState.jsx`
- `src/components/common/EmptyState/EmptyState.jsx`
- `src/components/CompetitionList/CompetitionList.jsx`
- `src/components/CompetitionCard/CompetitionCard.jsx`

New page components include:

- `src/pages/Competitions.jsx`
- `src/pages/AthleteDetail.jsx`
- `src/pages/CoachDetail.jsx`
- `src/pages/CompetitionDetail.jsx`

## User Stories (4)

1. As a coach, I want to review athlete profiles so that I can monitor performance and readiness.
2. As an athlete, I want to view trainings and recovery sessions so that I can prepare my week.
3. As a coordinator, I want to inspect coach profiles so that I can assign athletes to the right specialist.
4. As a club member, I want to browse competitions so that I can follow upcoming events.

## Technical Checklist

- [x] Vite-based React app
- [x] API integration using GET endpoints
- [x] Read-only implementation for phase 2
- [x] `useEffect` and `useState` used for async fetch/state management
- [x] Loading and error states implemented
- [x] React Router with multiple distinct views and detail routes
- [x] Clean component separation and external CSS styling
- [x] Semantic layout structure (`header`, `main`, `nav`, `section`, etc.)

## Deliverables

- `user-story-manage-athletes.png`
- `user-story-view-schedule.png`
- `user-story-coach-directory.png` (to create)
- `user-story-competitions-overview.png` (to create)
- `chm.png` (update with new routes/components/fetch points)
- `README.md`
- ZIP of source code (without `node_modules`)
- Optional public GitHub repository link
