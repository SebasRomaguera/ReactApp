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
	- Go to the **Athletes** page from the top navigation or from the Home page.
	- Review the athlete cards and use the status/category filters if needed.
	- Click **View detail** on any athlete card.
	- Read the athlete detail view to confirm event, category, status, personal best, age, nationality, and join date.
	- Use **Back to Athletes** to return to the list.

2. As an athlete, I want to view trainings and recovery sessions so that I can prepare my week.
	- Go to the **Schedule** page from the top navigation or from the Home page.
	- Wait for the sessions to load from the API.
	- Use the filter buttons (**All**, **Training**, **Competition**, **Recovery**) to narrow the list.
	- Inspect each session card for date, time, duration, intensity, description, location, and number of athletes.
	- If no session matches the filter, read the empty-state message and switch to another filter.

3. As a coordinator, I want to inspect coach profiles so that I can assign athletes to the right specialist.
	- Go to the **Coaches** page from the top navigation or from the Home page.
	- Review the coach cards and check the summary data shown on each one.
	- Click **View detail** on the coach you want to inspect.
	- Read the coach detail view to verify specialty, status, experience, certification, athlete count, email, and phone.
	- Use **Back to Coaches** to return to the directory and compare another coach.

4. As a club member, I want to browse competitions so that I can follow upcoming events.
	- Go to the **Competitions** page from the top navigation or from the Home page.
	- Wait for the competition list to load from the API.
	- Use the status filters (**All**, **Scheduled**, **Finished**, **Cancelled**) to focus on the competitions you want.
	- Open a competition card with **View detail** to inspect the event information.
	- Read the detail page for date, status, venue, season, category, and description.
	- Use **Back to Competitions** to return to the list.

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
- `user-story-coach-directory.png`
- `user-story-competitions-overview.png`
- `chm.png` (update with new routes/components/fetch points)
- `README.md`
- ZIP of source code (without `node_modules`)
- Optional public GitHub repository link
