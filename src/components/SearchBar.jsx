import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * If `onSearch` is provided, calls it directly (controlled use, e.g. inside
 * Discover page). Otherwise navigates to /search?q=... (navbar use).
 */
export default function SearchBar({
  initialValue = '',
  onSearch,
  autoFocus = false,
  placeholder = 'Search movies…',
  className = '',
}) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    if (onSearch) {
      onSearch(trimmed)
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`} role="search">
      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-500"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
      </svg>
      <input
        id="movie-search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-20 text-sm text-mist-100 placeholder:text-mist-500 outline-none transition-all duration-200 focus:border-marquee/50 focus:bg-white/[0.07]"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-marquee px-3.5 py-1.5 text-xs font-semibold text-void-950 transition-colors hover:bg-marquee-light"
      >
        Search
      </button>
    </form>
  )
}
