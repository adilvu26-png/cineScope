import { Link } from 'react-router-dom'
import { getImageUrl } from '../api/movieApi'
import { formatYear } from '../utils/helpers'
import Rating from './Rating'
import { useFavoritesContext } from '../hooks/FavoritesContext'
import { useToast } from '../hooks/ToastContext'

export default function MovieCard({ movie, onQuickPreview }) {
  const { isFavorite, toggle } = useFavoritesContext()
  const { showToast } = useToast()
  const favorite = isFavorite(movie.id)
  const poster = getImageUrl(movie.poster_path, 'w342')

  function handleFavoriteClick(e) {
    e.preventDefault()
    e.stopPropagation()
    toggle(movie)
    showToast(favorite ? 'Removed from favorites' : 'Added to favorites')
  }

  function handlePreviewClick(e) {
    e.preventDefault()
    e.stopPropagation()
    onQuickPreview?.(movie)
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block outline-none"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-void-800 shadow-card transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-glow-marquee group-focus-visible:-translate-y-1.5">
        <div className="aspect-[2/3] w-full overflow-hidden">
          {poster ? (
            <img
              src={poster}
              alt={`${movie.title} poster`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-void-700 text-mist-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 16l5-5 4 4 5-6 4 5" />
              </svg>
              <span className="text-xs">No poster</span>
            </div>
          )}
        </div>

        {/* gradient overlay + info that intensifies on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />

        <button
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          className="absolute right-2.5 top-2.5 flex h-9 w-9 translate-y-0 items-center justify-center rounded-full bg-black/50 text-white opacity-100 backdrop-blur-sm transition-all duration-300 hover:bg-black/70 sm:translate-y-[-6px] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            className={`h-[18px] w-[18px] transition-colors ${favorite ? 'text-ember-light' : 'text-white'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.5s-7.5-4.6-10-9.3C.4 7.9 2 4.5 5.4 4A5.1 5.1 0 0112 7a5.1 5.1 0 016.6-3c3.4.5 5 3.9 3.4 7.2-2.5 4.7-10 9.3-10 9.3z"
            />
          </svg>
        </button>

        {onQuickPreview && (
          <button
            onClick={handlePreviewClick}
            className="absolute bottom-3 left-1/2 hidden w-[calc(100%-1.5rem)] -translate-x-1/2 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-white/10 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
          >
            Quick Preview
          </button>
        )}
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold text-mist-100 transition-colors group-hover:text-marquee-light">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs text-mist-500">
          <Rating vote={movie.vote_average} size="sm" />
          <span>{formatYear(movie.release_date)}</span>
        </div>
      </div>
    </Link>
  )
}
