# 📝 Task Management Dashboard

## 📌 Objective
The objective of this project is to build a **simple Task Management Dashboard** using **React.js** that demonstrates understanding of:

- React fundamentals (hooks, functional components)
- Redux Toolkit for state management
- Clean code and modular architecture
- Mock API handling
- Responsive UI design
- Light/Dark theme handling

---

## 🚀 Features

### ✅ Task Management
- Display a list of tasks
- Each task shows:
  - Task title
  - Task status (**Pending / Completed**)
  - Actions: **Edit / Delete / Mark Complete / Mark Pending**

### ➕ Add Task
- Add a new task using a form
- Task title is mandatory
- New task appears immediately in the task list

### ✏️ Edit Task
- Edit an existing task’s title
- Updates are reflected instantly in the UI

### 🗑️ Delete Task
- Delete tasks from the list
- Tasks are removed instantly from the UI

### 🔄 Task Status Management
- Toggle task status between **Completed** and **Pending**
- Status updates immediately

### 🔍 Filter & Search
- Filter tasks by:
  - All
  - Completed
  - Pending
- Search tasks by title
- Search works together with filters

### 🌗 Light / Dark Theme
- Toggle between Light and Dark themes
- UI updates immediately
- Theme persistence is optional

### 🌐 API Handling
- Uses **mock APIs** (static mock data / JSON Server / MSW)
- Supports:
  - Fetch tasks
  - Add task
  - Update task
  - Delete task
- No real backend required

## My Task Hub

Modern task manager built with Vite, React, TypeScript, Tailwind CSS, Redux Toolkit, React Query, and shadcn/ui primitives. It ships with mock API calls, filtering/search, stats, and a persisted light/dark theme.

### Features
- Add, edit, delete, and toggle task completion with optimistic UI backed by a mock API.
- Quick filtering (`all`, `pending`, `completed`) and live search.
- Task stats (total, pending, completed) and inline validation via `react-hook-form`/`zod`.
- Light/dark theme persisted to `localStorage`, with Radix-based UI components.
- Fully typed Redux store plus React Query client wiring and toast/sonner notifications.

### Tech Stack
- Vite + React 18 + TypeScript
- Redux Toolkit + React Query
- Tailwind CSS + shadcn/ui + Radix UI + lucide-react
- ESLint (flat config) + PostCSS + SWC

### Prerequisites
- Node.js 18+ (recommended) and npm (comes with Node).  
  _Other package managers (pnpm/bun/yarn) work if you prefer—adjust commands accordingly._

### Getting Started
1) Install dependencies  
```
npm install
```
2) Start the dev server  
```
npm run dev
```
Then open the printed URL (default `http://localhost:5173`).

3) Build for production  
```
npm run build
```

4) Preview the production build  
```
npm run preview
```

### Available Scripts
- `npm run dev` — start Vite dev server.
- `npm run build` — production build.
- `npm run build:dev` — build with `development` mode flags.
- `npm run preview` — preview the production build.
- `npm run lint` — run ESLint.

### Project Structure
```
my-task-hub-main/
├─ public/                 # Static assets
├─ src/
│  ├─ components/          # UI building blocks
│  │  ├─ Header.tsx        # App header + theme toggle
│  │  ├─ TaskForm.tsx      # Create task form (react-hook-form + zod)
│  │  ├─ TaskFilters.tsx   # Filter buttons (all/pending/completed)
│  │  ├─ TaskList.tsx      # Fetch + render filtered tasks
│  │  ├─ TaskItem.tsx      # Single task row with actions
│  │  ├─ TaskStats.tsx     # Summary metrics
│  │  ├─ SearchBar.tsx     # Live search input
│  │  └─ ui/               # shadcn/ui primitives (Radix-based)
│  ├─ hooks/               # Reusable hooks (theme/device, toast)
│  ├─ pages/
│  │  ├─ Index.tsx         # Main task dashboard
│  │  └─ NotFound.tsx      # 404 page
│  ├─ services/
│  │  └─ mockApi.ts        # In-memory mock API with latency
│  ├─ store/               # Redux store, slices, typed hooks
│  ├─ types/               # Shared TypeScript types
│  ├─ App.tsx              # Providers (Redux, Query, theme, router)
│  ├─ main.tsx             # App entrypoint
│  ├─ index.css / App.css  # Global + layout styles
│  └─ lib/utils.ts         # Utility helpers
├─ index.html
├─ package.json
├─ tailwind.config.ts
├─ tsconfig*.json
└─ vite.config.ts
```

### Data & State
- Tasks are served by `mockApi.ts` (in-memory with simulated latency). Swap with a real API by replacing those functions and keeping thunk shapes intact.
- Redux slice `taskSlice.ts` handles CRUD, filters, and search; `themeSlice.ts` persists theme to `localStorage`.
- React Query client is initialized but currently used for future integrations; Redux thunks drive task data.

### Styling & UI
- Tailwind for layout/theming; shadcn/ui + Radix primitives for accessible components; lucide-react for icons.
- Dark mode toggles the `dark` class on `document.documentElement` and persists preference.

### Troubleshooting
- If ports are busy, change the Vite port: `npm run dev -- --port 5174`.
- Clear cached theme: remove `localStorage['theme']` in devtools.
