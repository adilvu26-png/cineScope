# CineScope — Movie Explorer

CineScope is a premium, cinematic movie discovery web app built as a frontend portfolio project. It uses **The Movie Database (TMDB) API** to let people discover trending, popular, top-rated and upcoming movies, search by title, browse by genre, dig into full movie details and cast, and keep a personal, persistent favorites list — all wrapped in a dark, glassmorphic UI with deliberate, restrained motion.

![CineScope](./screenshot-placeholder.png)

---

## Features

- **Discovery surfaces** — trending (day/week), popular, top-rated and upcoming movies
- **Cinematic hero** — a large featured-movie banner with a staggered load-in animation
- **Discover page** — combined search, genre, year, rating, language and sort filters with load-more pagination
- **Search** — debounced/instant search with loading, empty and error states, and Enter-to-search support
- **Genre browsing** — a genre index and a dedicated page per genre with pagination
- **Movie details** — backdrop, poster, overview, runtime, budget/revenue, production companies, full cast, and similar movies
- **Favorites** — add/remove from any card or the details page, persisted in `localStorage`, with a dedicated Favorites page and empty state
- **Quick Preview modal** — peek at a movie without leaving the grid; closes on outside click or `Escape`
- **Toast notifications** — subtle confirmation when favoriting/unfavoriting
- **Skeleton loading states** — shimmer placeholders instead of blank screens
- **Graceful error handling** — no raw errors shown to users, with retry actions
- **Fully responsive** — 2/3–4/5 column movie grids across mobile/tablet/desktop, hamburger navigation on small screens
- **Accessible by default** — semantic HTML, alt text, labeled icon buttons, visible focus states, and `prefers-reduced-motion` support

---

## Technologies

- [React](https://react.dev/) (functional components + hooks)
- [Vite](https://vitejs.dev/)
- JavaScript (ES2020+, no TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)

---

## Project Structure

```
src/
├── api/movieApi.js        # All TMDB fetch calls live here
├── components/             # Reusable presentational components
├── pages/                  # Route-level views
├── hooks/                  # useFavorites context, toast context
├── utils/                  # favorites.js (localStorage), helpers.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

```bash
npm install
```

## Environment Variables

CineScope needs a free TMDB API key.

1. Create an account at [themoviedb.org](https://www.themoviedb.org/) and generate an API key (v3 auth) from your account settings under **API**.
2. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

3. Add your key:

   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

The key is only ever read from `import.meta.env.VITE_TMDB_API_KEY` inside `src/api/movieApi.js` — it is never hard-coded in a component.

## Running the Project

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build

```bash
npm run build
```

Outputs a production build to `dist/`. Preview it locally with:

```bash
npm run preview
```

---

## Screenshots

_Add screenshots here once the app is running locally, e.g.:_

- Home page hero + trending carousel
- Discover page with filters
- Movie details page
- Favorites page (populated and empty state)

---

## Future Improvements

- User accounts and cloud-synced favorites/watchlists
- Trailer playback via the TMDB videos endpoint
- Reviews and ratings from users
- Infinite scroll as an alternative to Load More
- Dedicated actor/person detail pages
- Multi-language UI (i18n)

---

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.

Built as a personal portfolio project to demonstrate React, JavaScript, API integration, state management, client-side routing, `localStorage` persistence, responsive design and modern frontend engineering practices.
