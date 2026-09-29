import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useFavoritesContext } from '../hooks/FavoritesContext'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/discover', label: 'Discover' },
  { to: '/trending', label: 'Trending' },
  { to: '/genre', label: 'Genres' },
  { to: '/favorites', label: 'Favorites' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { favorites } = useFavoritesContext()
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-[0_8px_30px_rgba(0,0,0,0.35)]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="section-pad flex h-16 items-center justify-between sm:h-20">
        <NavLink to="/" className="flex items-center gap-2 shrink-0" aria-label="CineScope home">
          <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#0B0B0B" />
            <path
              d="M9 8l4 6-4 6M15 8l4 6-4 6M21 8l4 6-4 6"
              stroke="#D4A24E"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="heading-display text-lg font-semibold tracking-tight text-mist-100 sm:text-xl">
            CineScope
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-marquee-light' : 'text-mist-300 hover:text-mist-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden w-56 md:block xl:w-72">
            <SearchBar />
          </div>

          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-mist-300 transition-colors hover:bg-white/5 hover:text-mist-100 md:hidden"
            aria-label="Toggle search"
            aria-expanded={searchOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          <NavLink
            to="/favorites"
            aria-label="View favorites"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-mist-300 transition-colors hover:bg-white/5 hover:text-mist-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.5s-7.5-4.6-10-9.3C.4 7.9 2 4.5 5.4 4A5.1 5.1 0 0112 7a5.1 5.1 0 016.6-3c3.4.5 5 3.9 3.4 7.2-2.5 4.7-10 9.3-10 9.3z"
              />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-marquee px-1 text-[10px] font-bold text-void-950">
                {favorites.length}
              </span>
            )}
          </NavLink>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-mist-300 transition-colors hover:bg-white/5 hover:text-mist-100 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="animate-slideDown section-pad pb-4 md:hidden">
          <SearchBar autoFocus />
        </div>
      )}

      {mobileOpen && (
        <div className="animate-slideDown glass section-pad flex flex-col gap-1 border-t border-white/[0.06] py-4 lg:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/5 text-marquee-light' : 'text-mist-300 hover:bg-white/5 hover:text-mist-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
