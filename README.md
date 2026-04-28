# Athletics Sports Club - Phase 3

Dynamic multi-page React app with full CRUD operations built with Vite. This phase completes the write operations (POST, PUT, DELETE) for all user stories, implements controlled forms, UI feedback, and optional Docker containerization.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Local Athletics Sports Club REST API running (Docker Compose backend)
- (Optional) Docker & Docker Compose for containerizing the frontend

### Install and run locally

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

## Phase 3 Scope Implemented

- Completed all 4 previous user stories with write operations (create, update, delete).
- Created 2 new user stories for additional CRUD functionality.
- Implemented controlled forms with input validation.
- Added UI feedback for all write operations (loading states, success/error toasts).
- Implemented all HTTP verbs: GET, POST, PUT, DELETE.
- Containerization with Docker (multi-stage build + NGINX).

## Routes & User Stories

### User Stories (6 total)

1. **Manage Athletes** (Complete CRUD)
   - GET `/athletes` - View athlete roster
   - GET `/athletes/{publicId}` - View athlete detail
   - POST `/athletes` - Create new athlete
   - PUT `/athletes/{publicId}` - Update athlete profile
   - DELETE `/athletes/{publicId}` - Delete athlete

2. **Schedule Training Sessions** (Create + Read)
   - GET `/schedule` - View training schedule with filters
   - POST `/scheduling/trainings` - Create new training session
   - PUT `/ training/{publicId}` - Update training session
   - DELETE `/scheduling/trainings/{publicId}` - Delete training session

3. **Manage Coaches** (Complete CRUD)
   - GET `/coaches` - View coaching staff
   - GET `/coaches/{publicId}` - View coach detail
   - POST `/people/coaches` - Add new coach
   - PUT `/people/coaches/{publicId}` - Update coach profile
   - DELETE `/people/coaches/{publicId}` - Delete coach

4. **Browse & Manage Competitions** (Complete CRUD)
   - GET `/competitions` - View competitions with status filters
   - GET `/competitions/{publicId}` - View competition detail
   - POST `/scheduling/competitions` - Create competition
   - PUT `/scheduling/competitions/{publicId}` - Update competition
   - DELETE `/scheduling/competitions/{publicId}` - Delete competition

5. **Enroll Athletes in Competitions** (NEW - Create enrollment)
   - PUT `/scheduling/competitions/{publicId}` with `athlete_public_ids` - Enroll athlete

6. **Manage Training Venues** (NEW - Complete CRUD)
   - GET `/venues` - View all venues
   - GET `/venues/{publicId}` - View venue detail
   - POST `/inventory/venues` - Create new venue
   - PUT `/inventory/venues/{publicId}` - Update venue
   - DELETE `/inventory/venues/{publicId}` - Delete venue

### Routes

- `/` - Home
- `/athletes` - Athletes list with create button
- `/athletes/:publicId` - Athlete detail with edit/delete
- `/coaches` - Coaches list with create button
- `/coaches/:publicId` - Coach detail with edit/delete
- `/schedule` - Training schedule with create button
- `/competitions` - Competitions list with create button
- `/competitions/:publicId` - Competition detail with edit/delete and enroll button
- `/venues` - Venues list with create button
- `/venues/:publicId` - Venue detail with edit/delete

## Component Hierarchy

New Phase 3 Components:
- **Forms**: `AthleteForm`, `CoachForm`, `TrainingForm`, `CompetitionForm`, `VenueForm`, `EnrollmentForm`
- **Feedback**: `Toast` (success/error notifications), `Modal` (confirmation dialogs)
- **Lists**: `VenueList` (new venue management interface)

All components follow clean code practices:
- Controlled components using `useState`
- Form validation before submission
- Error handling with clear feedback
- Loading states during API calls
- External CSS files (no inline styles)
- Semantic HTML structure

## Docker Setup (Extra Credit)

### Build and run the frontend container

```bash
# Build the Docker image
docker build -f docker/Dockerfile -t athletics-react-app:latest .

# Run the container
docker run -p 3000:80 athletics-react-app:latest
```

Access the app at: http://localhost:3000

### Using Docker Compose

```bash
# Build and start containers
docker-compose -f docker/docker-compose.yml up --build

# Stop containers
docker-compose -f docker/docker-compose.yml down
```

The Docker setup includes:
- **Multi-stage build**: Node.js for build, NGINX for serving
- **Health checks**: Automatic verification of container readiness
- **NGINX configuration**: Proper SPA routing with fallback to `index.html`
- **Environment variables**: Configurable API endpoint

## Technical Checklist

- [x] Vite-based React app
- [x] Full CRUD operations (GET, POST, PUT, DELETE)
- [x] 6 user stories with workflows and mockups
- [x] Controlled forms with validation
- [x] UI feedback (Toast, Modal, Loading states)
- [x] React Router with multi-page views and detail routes
- [x] Clean component separation and external CSS
- [x] Semantic HTML structure
- [x] Docker containerization with multi-stage build
- [x] NGINX configuration for SPA routing
- [x] Health checks for container monitoring

## API Endpoints Used (Phase 3)

### GET (Read)
- `/people/athletes` - List athletes
- `/people/athletes/{public_id}` - Get athlete
- `/people/coaches` - List coaches
- `/people/coaches/{public_id}` - Get coach
- `/scheduling/trainings` - List trainings
- `/scheduling/competitions` - List competitions
- `/scheduling/competitions/{public_id}` - Get competition
- `/inventory/venues` - List venues
- `/inventory/venues/{public_id}` - Get venue

### POST (Create)
- `/people/athletes` - Create athlete
- `/people/coaches` - Create coach
- `/scheduling/trainings` - Create training
- `/scheduling/competitions` - Create competition
- `/scheduling/competitions/{public_id}` - Update competition athletes for enrollment
- `/inventory/venues` - Create venue

### PUT (Update)
- `/people/athletes/{public_id}` - Update athlete
- `/people/coaches/{public_id}` - Update coach
- `/scheduling/trainings/{public_id}` - Update training
- `/scheduling/competitions/{public_id}` - Update competition
- `/inventory/venues/{public_id}` - Update venue

### DELETE
- `/people/athletes/{public_id}` - Delete athlete
- `/people/coaches/{public_id}` - Delete coach
- `/scheduling/trainings/{public_id}` - Delete training
- `/scheduling/competitions/{public_id}` - Delete competition
- `/inventory/venues/{public_id}` - Delete venue

## Deliverables

- `user-story-*.png` (6 files) - Workflows and mockups for all stories
- `chm.png` - Updated component hierarchy map
- `README.md` - This file with complete setup instructions
- `docker/` - Dockerfile, docker-compose.yml, nginx.conf for containerization
- `.env.example` - Environment variables template
- ZIP archive of source code (without node_modules and dist/)
- (Optional) Public GitHub repository link

## Development Notes

- All forms use client-side validation before API submission
- Failed API calls show user-friendly error messages
- Successful operations show confirmation toasts
- Modal dialogs protect against accidental deletions
- Loading states prevent double-submission
- Responsive design works on mobile and desktop
- All state is properly managed to prevent race conditions

