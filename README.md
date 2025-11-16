# Evenir — curated event vendor marketplace

Evenir is a Vite + React + TypeScript application that showcases how the team manages both sides of an event-services marketplace:

- **Clients** describe their event once, search vendors, and receive concierge suggestions backed by Gemini models.
- **Vendors** submit structured profiles and go through a three-step onboarding flow before receiving briefs.

The UI is split into separate flows (home, find vendor, join vendor) so the product feels like an opinionated marketplace rather than a generic chat demo.

## Tech stack
- Vite, React 19, TypeScript
- Tailwind via CDN for rapid styling
- Lightweight in-app router (replacement for react-router-dom while offline)
- Gemini client (`@google/genai`) wrapped by `aiConciergeService.ts`

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
1. Install dependencies (already vendored in `node_modules`):
   ```bash
   npm install
   ```
2. Copy the example environment file and provide a Gemini API key (optional—fallback data is used if absent):
   ```bash
   cp .env.example .env.local
   # edit .env.local and set GEMINI_API_KEY=your-key
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 and explore the different flows.

## Environment variables
| Name | Description |
| --- | --- |
| `GEMINI_API_KEY` | Used by `aiConciergeService.ts` to generate real concierge suggestions. Optional—mock data is used when unset. |

## Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite in development mode |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint against the `src` directory |

## Linting & formatting
The repo ships with a basic ESLint configuration (`eslint.config.js`). Prettier formatting rules follow the default Tailwind-friendly spacing via editor integrations.

## Where to configure the AI concierge
All Gemini prompt/response logic lives in [`src/services/aiConciergeService.ts`](src/services/aiConciergeService.ts). The UI (`AiConciergeSection.tsx`) simply calls the service, making it easy to swap the implementation for future backend APIs.
