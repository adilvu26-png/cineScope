import { Link } from 'react-router-dom'
import { GENRES } from '../api/movieApi'

const SOCIALS = [
  { label: 'Twitter', path: 'M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.7 11.7 0 013 4.9a4.1 4.1 0 001.3 5.5c-.6 0-1.2-.2-1.7-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 01-1.8.1 4.1 4.1 0 003.9 2.9A8.3 8.3 0 012 18.6a11.7 11.7 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z' },
  { label: 'Instagram', path: 'M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.2-.4a3.8 3.8 0 01-1.4-.9 3.8 3.8 0 01-.9-1.4c-.2-.4-.4-1.1-.4-2.2C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8 2 8.3 2 12 2zm0 1.8c-2.7 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.4.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.3-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.4 1 .6.3.1.8.3 1.7.3 1 .1 1.3.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.4-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.3.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7a2.6 2.6 0 00-.6-1 2.6 2.6 0 00-1-.6c-.3-.1-.8-.3-1.7-.3-1-.1-1.3-.1-4-.1zm0 3.5a4.7 4.7 0 110 9.4 4.7 4.7 0 010-9.4zm0 1.8a2.9 2.9 0 100 5.8 2.9 2.9 0 000-5.8zm5-2a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z' },
  { label: 'GitHub', path: 'M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1-1.5-1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-void-900/60">
      <div className="section-pad grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#111111" />
              <path
                d="M9 8l4 6-4 6M15 8l4 6-4 6M21 8l4 6-4 6"
                stroke="#D4A24E"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="heading-display text-lg font-semibold text-mist-100">CineScope</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-mist-500">Discover movies. Explore stories.</p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist-500 transition-colors hover:border-marquee/40 hover:text-marquee-light"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-mist-100">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-mist-500">
            <li><Link to="/" className="transition-colors hover:text-marquee-light">Home</Link></li>
            <li><Link to="/discover" className="transition-colors hover:text-marquee-light">Discover</Link></li>
            <li><Link to="/trending" className="transition-colors hover:text-marquee-light">Trending</Link></li>
            <li><Link to="/favorites" className="transition-colors hover:text-marquee-light">Favorites</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-mist-100">Genres</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-mist-500">
            {GENRES.slice(0, 4).map((g) => (
              <li key={g.id}>
                <Link to={`/genre/${g.id}`} className="transition-colors hover:text-marquee-light">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-mist-100">About</h3>
          <p className="mt-4 text-sm leading-relaxed text-mist-500">
            CineScope is a portfolio project built with React, Vite and Tailwind CSS to explore movie
            data in a fast, cinematic interface.
          </p>
        </div>
      </div>

      <div className="section-pad flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] py-6 text-xs text-mist-500 sm:flex-row">
        <p>© 2026 CineScope. All rights reserved.</p>
        <p>Movie data and images provided by TMDB. This product is not endorsed or certified by TMDB.</p>
      </div>
    </footer>
  )
}
