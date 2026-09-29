import { useRef } from 'react'
import MovieCard from './MovieCard'

export default function Carousel({ movies, loading, onQuickPreview }) {
  const trackRef = useRef(null)

  function scrollBy(amount) {
    trackRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="group/carousel relative">
      <button
        onClick={() => scrollBy(-560)}
        aria-label="Scroll left"
        className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-void-900/90 text-mist-100 opacity-0 backdrop-blur transition-opacity duration-200 hover:border-marquee/40 group-hover/carousel:opacity-100 lg:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[42vw] flex-shrink-0 space-y-3 xs:w-48 sm:w-52 md:w-56">
              <div className="skeleton skeleton-shimmer aspect-[2/3] w-full rounded-2xl" />
              <div className="skeleton skeleton-shimmer h-3.5 w-3/4 rounded-full" />
            </div>
          ))
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="w-[42vw] flex-shrink-0 xs:w-48 sm:w-52 md:w-56">
              <MovieCard movie={movie} onQuickPreview={onQuickPreview} />
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => scrollBy(560)}
        aria-label="Scroll right"
        className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-void-900/90 text-mist-100 opacity-0 backdrop-blur transition-opacity duration-200 hover:border-marquee/40 group-hover/carousel:opacity-100 lg:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
