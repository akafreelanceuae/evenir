# Evenir — curated event vendor marketplace

Evenir is a Vite + React + TypeScript application that showcases how the team manages both sides of an event-services marketplace:

- **Clients** describe their event once, search vendors, and receive concierge suggestions powered by intelligent rule-based matching.
- **Vendors** submit structured profiles and go through a three-step onboarding flow before receiving briefs.

The UI is split into separate flows (home, find vendor, join vendor) so the product feels like an opinionated marketplace rather than a generic chat demo.

## Tech stack
- Vite, React 19, TypeScript
- Tailwind via CDN for rapid styling
- Lightweight in-app router (replacement for react-router-dom while offline)
- LocalStorage for data persistence
- Rule-based AI concierge service (no external API dependencies)

## Project structure
```
src/
  components/
    home/              // hero, categories, AI concierge, featured vendors, how-it-works
    layout/            // header, footer, layout shell
    requests/          // shared request form + summary cards
    vendors/           // vendor filters, list, cards
  constants/           // categories, homepage copy, mock vendors
  lib/router.tsx       // minimal BrowserRouter replacement
  pages/               // Home, FindVendor, JoinVendor, NotFound
  services/            // aiConcierge, vendorService, requestService
  types/               // vendor, request, concierge domain models
```

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 and explore the different flows.

## Features
- **No external API dependencies** - Works completely offline
- **LocalStorage persistence** - Your requests and signups are saved locally
- **Form validation** - Comprehensive validation with helpful error messages
- **Error boundaries** - Graceful error handling throughout the app
- **Responsive design** - Works on all device sizes

## Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite in development mode |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint against the `src` directory |

## Linting & formatting
The repo ships with a basic ESLint configuration (`eslint.config.js`). Prettier formatting rules follow the default Tailwind-friendly spacing via editor integrations.

## Project structure details
- **Services** (`src/services/`) - Business logic for vendors, requests, and AI concierge
- **Components** (`src/components/`) - Reusable UI components organized by feature
- **Types** (`src/types/`) - TypeScript type definitions
- **Lib** (`src/lib/`) - Utilities including router, validation, storage, and constants
- **Storage** - All data persists in browser localStorage (no backend required)

## Data persistence
The app uses localStorage to persist:
- Event requests (last 50 requests)
- Vendor signups (last 100 signups)

Data is automatically saved when you submit forms and persists across browser sessions.
