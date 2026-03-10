# ⚡ Athletics Sports Club — React App

A functional static React application built with **Vite** and **React Router** for managing an athletics sports club. It covers two user stories around athlete roster management and training schedule viewing.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

Verify your versions:

```bash
node --version
npm --version
```

### 1. Clone or unzip the project

```bash
# If using git
git clone <repo-url>
cd ReactApp

# Or unzip the archive and enter the folder
unzip ReactApp.zip
cd ReactApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open your browser at **http://localhost:5173**

### 4. Build for production (optional)

```bash
npm run build
npm run preview   # serve the production build locally
```

---

## 📁 Project Structure

```
src/
├── data/                     # Mock data (JSON files)
│   ├── athletes.json         # 6 athletes with event, pb, status
│   ├── coaches.json          # 3 coaches with specialty and contact
│   └── schedules.json        # 6 training sessions / competitions
│
├── components/
│   ├── Header/               # Sticky nav header with React Router NavLinks
│   ├── Footer/               # Club footer
│   ├── MainLayout/           # Page content wrapper
│   ├── AthleteCard/          # Individual athlete card (Edit/Delete buttons)
│   ├── AthleteList/          # Grid of AthleteCards
│   ├── AthleteForm/          # Add / Edit athlete form (controlled inputs)
│   ├── CoachCard/            # Individual coach card
│   ├── CoachList/            # Grid of CoachCards
│   ├── ScheduleCard/         # Session card with date box, type, intensity
│   └── ScheduleList/         # Grid of ScheduleCards (sorted by date)
│
├── pages/
│   ├── Home.jsx / .css       # Landing page with hero, stats and user story callouts
│   ├── Athletes.jsx / .css   # Full athlete dashboard (useState + filters)
│   ├── Coaches.jsx           # Coaches roster page
│   └── Schedule.jsx / .css   # Schedule page with pill type-filter
│
├── App.jsx / App.css         # Router shell (BrowserRouter + Routes)
├── main.jsx                  # React entry point
└── index.css                 # Global style book (CSS variables, utilities)
```

---

## 🧩 Component Hierarchy

```
App  (BrowserRouter + Routes)
├── Header          (static — NavLinks to all routes)
├── MainLayout      (content wrapper)
│   ├── / → Home
│   │         (hero, stats strip, feature cards, user story cards)
│   │
│   ├── /athletes → Athletes
│   │   ├── AthleteForm   (useState — add / edit; triggered by onAddAthlete / onUpdateAthlete props)
│   │   └── AthleteList   (receives athlete array as props)
│   │       └── AthleteCard × N  (receives individual athlete; Edit/Delete callbacks)
│   │
│   ├── /coaches → Coaches
│   │   └── CoachList     (receives coaches array as props)
│   │       └── CoachCard × N
│   │
│   └── /schedule → Schedule
│       └── ScheduleList  (receives sessions array as props)
│           └── ScheduleCard × N
│
└── Footer          (static)
```

---

## 📖 User Stories

### User Story 1 — Coach manages athlete roster
> **"As a coach, I want to manage my athlete roster so that I can track the progress and performance of each athlete."**

**Workflow:**
1. Coach opens the **Athletes** page.
2. Clicks **Add New Athlete** → form expands.
3. Fills in name, category, event, personal best, nationality, status.
4. Submits → athlete card appears in the grid (added to `useState`).
5. Clicks **Edit** on any card → form pre-fills with existing data.
6. Saves → card updates in place.
7. Clicks **Delete** → confirmation dialog → card is removed.
8. Uses the **Status / Category** filters to narrow the list.

**See file:** `user-story-manage-athletes.png`

---

### User Story 2 — Athlete views training schedule
> **"As an athlete, I want to view my training schedule so that I can prepare for upcoming sessions and competitions."**

**Workflow:**
1. Athlete opens the **Schedule** page.
2. Sees all upcoming sessions sorted by date as cards showing: title, date, time, duration, location, intensity, type, description, and athlete count.
3. Uses the **pill filters** (All / Training / Competition / Recovery) to focus on relevant sessions.
4. Reads the session description to prepare.
5. Identifies the single upcoming **Competition** session.

**See file:** `user-story-view-schedule.png`

---

## 🎨 Style Book

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1a3a5c` | Dark navy blue — brand, headings, nav bg |
| `--color-primary-mid` | `#2563a8` | Mid blue — hover states, links |
| `--color-accent-red` | `#e63946` | Energy red — delete, competition, accent buttons |
| `--color-accent-gold` | `#f4a100` | Gold — active nav, CTA button, section title underline |
| `--color-bg` | `#f0f4f8` | Page background |
| `--color-surface` | `#ffffff` | Card / form surface |
| `--font-heading` | Montserrat 700/800 | All headings, labels, nav, badges |
| `--font-body` | Open Sans 400/600 | Body copy, inputs |

---

## ✅ Technical Requirements Checklist

- [x] Scaffolded with **Vite** (`npm create vite@latest`)
- [x] **No backend** — pure frontend React
- [x] **5+ functional components** (Header, Footer, MainLayout, AthleteCard, AthleteList, AthleteForm, CoachCard, CoachList, ScheduleCard, ScheduleList)
- [x] **Mock data in `src/data/`** — `athletes.json`, `coaches.json`, `schedules.json`
- [x] Data imported directly (no `fetch`)
- [x] **`useState`** used in Athletes page (athletes array, editing state, filters) and Schedule page (filter state)
- [x] **React Router** (`react-router-dom`) with 4 views: Home, Athletes, Coaches, Schedule *(extra credit)*
- [x] Color palette + typography applied via CSS custom properties

---

## 📦 Deliverables

| File | Description |
|---|---|
| `user-story-manage-athletes.png` | Workflow + mock-up for User Story 1 |
| `user-story-view-schedule.png` | Workflow + mock-up for User Story 2 |
| `chm.png` | Component hierarchy map diagram |
| `README.md` | This file |
| `ReactApp.zip` | Source code (no `node_modules`) |
