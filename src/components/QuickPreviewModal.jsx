import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../api/movieApi'
import { formatYear } from '../utils/helpers'
import Rating from './Rating'
import { useFavoritesContext } from '../hooks/FavoritesContext'
import { useToast } from '../hooks/ToastContext'

export default function QuickPreviewModal({ movie, onClose }) {
  const { isFavorite, toggle } = useFavoritesContext()
  const { showToast } = useToast()

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!movie) return null

  const favorite = isFavorite(movie.id)
  const backdrop = getImageUrl(movie.backdrop_path, 'w780') || getImageUrl(movie.poster_path, 'w780')

  function handleFavorite() {
    toggle(movie)
    showToast(favorite ? 'Removed from favorites' : 'Added to favorites')
  }

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      style={{ animationDuration: '0.2s' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${movie.title} quick preview`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scaleIn relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-void-900 shadow-card"
      >
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative h-52 w-full sm:h-64">
          {backdrop && <img src={backdrop} alt="" className="h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/20 to-transparent" />
        </div>

        <div className="-mt-10 px-6 pb-6">
          <h2 className="heading-display text-2xl font-medium text-mist-100">{movie.title}</h2>
          <div className="mt-2 flex items-center gap-3 text-sm text-mist-300">
            <Rating vote={movie.vote_average} />
            <span>{formatYear(movie.release_date)}</span>
          </div>
          {movie.overview && (
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-mist-500">{movie.overview}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/movie/${movie.id}`} className="btn-primary" onClick={onClose}>
              View Details
            </Link>
            <button onClick={handleFavorite} className="btn-secondary" aria-pressed={favorite}>
              <svg
                viewBox="0 0 24 24"
                fill={favorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-4 w-4 ${favorite ? 'text-ember-light' : ''}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.5s-7.5-4.6-10-9.3C.4 7.9 2 4.5 5.4 4A5.1 5.1 0 0112 7a5.1 5.1 0 016.6-3c3.4.5 5 3.9 3.4 7.2-2.5 4.7-10 9.3-10 9.3z"
                />
              </svg>
              {favorite ? 'In Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
