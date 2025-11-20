# NFL Play Finder

Interactive assistant for exploring detailed NFL play data. Ask for touchdowns, rushing plays, defensive highlights, or your own custom queries—the chat interface calls the configured agent endpoint and renders structured play tables alongside narrative answers.

## Table of Contents
- Overview
- Tech Stack
- Project Structure
- Getting Started
- Environment Variables
- Available Scripts
- Usage Tips

## Overview
- Chat-driven flow powered by `Index.tsx`, which sends user prompts to an external inference agent.
- Responses can include human-readable thoughts plus a list of play objects rendered in `PlayTable`.
- Skeleton loaders, toasts, and button/input primitives come from shadcn-ui for a polished UX.

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui component primitives
- lucide-react icons

## Project Structure
- `src/pages/Index.tsx` main chat experience and API orchestration
- `src/components/PlayTable.tsx` tabular rendering of play results
- `src/components/ChatMessage.tsx` role-aware message bubbles
- `src/components/ThoughtLoader.tsx` animated loader while awaiting responses
- `src/components/ui/*` shadcn-ui building blocks
- `src/hooks/use-toast.ts` toast helpers
- `env.example` documented configuration variables

## Getting Started
```sh
git clone <repo>
cd nfl-play-finder
npm install
cp env.example .env        # fill in real values
npm run dev                # http://localhost:5173 by default
```

## Environment Variables
Copy `env.example` to `.env` and set:
- `VITE_AGENT_API_URL` full inference endpoint
- `VITE_AGENT_API_KEY` API key for the agent
- `VITE_AGENT_USER_ID` identifier passed as `user_id`
- `VITE_AGENT_ID` agent identifier

The app generates a unique session identifier per browser session, so no session env var is required.

## Available Scripts
- `npm run dev` start the Vite dev server with HMR
- `npm run build` production build
- `npm run preview` preview the production build locally
- `npm run lint` run lint checks (if configured in `package.json`)

## Usage Tips
- Use the preset prompt buttons on an empty conversation to quickly explore examples.
- Messages that return structured play data render an interactive table under the assistant response.
- Configuration issues (missing env vars, network errors) raise shadcn toasts for quick diagnosis.
