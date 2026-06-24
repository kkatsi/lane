# Lane

A Kanban board app — boards, columns, draggable task cards, filtering and search. Built with Vue 3 to get hands-on with the ecosystem coming from a React background.

State lives in the browser (localStorage), so there's no backend to run. The store sits behind a repository layer, so swapping localStorage for a real API is a single-file change.

## Demo

Live: https://lane-akv.pages.dev

## Features

- Multiple boards with a starred section and an overview grid
- Board templates (Kanban, Sprint, or blank) when creating a board
- Columns: add, rename, delete, and bulk-move all tasks to another column
- Task cards: create, edit inline, delete, with labels, an assignee, a due date, and comments
- Drag and drop tasks within and across columns, with a custom drop indicator
- Due dates via a calendar or natural language ("next friday"), parsed with chrono-node
- Filter by label, assignee, and due-date range, plus full-text search across title, description, assignee, and labels
- Filters and search live in the URL, so the view is shareable and survives a refresh
- Light and dark themes

## Stack

- Vue 3 (`<script setup>`) + TypeScript
- Vite
- Pinia for state, with a localStorage-backed repository layer
- Vue Router
- Tailwind CSS v4 + shadcn-vue (reka-ui) for components
- TanStack Form + Zod for form state and validation
- vue-draggable-plus for drag and drop
- VueUse, date-fns, chrono-node

## A few decisions worth calling out

- **Normalized state.** Boards keep tasks and columns as id-keyed records with a separate order array, rather than nested arrays. Moves, edits, and filtering stay cheap and don't fight reactivity.
- **Repository seam.** The Pinia store never touches `localStorage` directly — it goes through `repositories/boards.ts`. The persistence layer is isolated and swappable.
- **URL as the source of truth for filters.** A typed `useQueryRef` composable reads and writes query params, so filter and search state is shareable and refresh-safe instead of trapped in a store.
- **Composables over components.** Domain logic (current board, current task, filtered task ids) lives in composables, keeping components focused on rendering.

## Running locally

Requires Node `^20.19.0` or `>=22.12.0`.

```sh
npm install
npm run dev
```

Other scripts:

```sh
npm run build        # type-check and build for production
npm run type-check   # vue-tsc
npm run lint         # oxlint + eslint
npm run format       # oxfmt
```

The app seeds a couple of example boards on first load.

## Project structure

```
src/
  components/      # UI components (ui/ holds shadcn-vue primitives)
  composables/     # board/task state, filters, URL query refs
  stores/          # Pinia stores
  repositories/    # localStorage persistence
  schemas/         # Zod validation
  views/           # routed pages
  lib/ constants/  # helpers and static data
```

## Notes

This is a portfolio project, not a product. There's no backend, and no test suite yet.
