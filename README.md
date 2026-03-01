# Job Tracker

Full-stack job application tracker with a React (Vite + Tailwind) frontend and Node.js Express backend.

## Project structure

```
job-tracker/
  frontend/          # React + Vite + Tailwind
    src/
  backend/           # Express API
    server.js
    jobs.json
```

## Setup

Install all dependencies (root, backend, frontend):

```bash
npm run install:all
```

### Run from project root

Start both backend and frontend at once:

```bash
npm run dev
```

Or run separately in two terminals:

- Backend: `npm run dev:backend` (http://localhost:3001)
- Frontend: `npm run dev:frontend` (http://localhost:5173)

### Or run from each folder

```bash
cd backend && npm install && npm run dev   # port 3001
cd frontend && npm install && npm run dev # port 5173
```

API requests from the frontend are proxied from `/api` to the backend.

## API routes

| Method | Route        | Description        |
|--------|--------------|--------------------|
| GET    | /jobs        | List all jobs      |
| POST   | /jobs        | Create a job       |
| PUT    | /jobs/:id    | Update a job       |
| DELETE | /jobs/:id    | Delete a job       |

Data is stored in `backend/jobs.json`.

## Run both

From the project root, in two terminals:

1. `cd backend && npm install && npm run dev`
2. `cd frontend && npm install && npm run dev`

Then open http://localhost:5173
