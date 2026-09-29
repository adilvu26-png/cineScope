import { Link } from 'react-router-dom'
import { getImageUrl, GENRES } from '../api/movieApi'
import { formatYear, formatRuntime, genreNamesFromIds } from '../utils/helpers'
import Rating from './Rating'
import { useFavoritesContext } from '../hooks/FavoritesContext'
import { useToast } from '../hooks/ToastContext'

export default function Hero({ movie }) {
  const { isFavorite, toggle } = useFavoritesContext()
  const { showToast } = useToast()

  if (!movie) return <HeroSkeleton />

  const favorite = isFavorite(movie.id)
  const backdrop = getImageUrl(movie.backdrop_path, 'original')
  const genreNames = movie.genres
    ? movie.genres.map((g) => g.name).slice(0, 3)
    : genreNamesFromIds(movie.genre_ids, GENRES).slice(0, 3)

  function handleFavorite() {
    toggle(movie)
    showToast(favorite ? 'Removed from favorites' : 'Added to favorites')
  }

  return (
    <section className="relative flex h-[88vh] min-h-[560px] w-full items-end overflow-hidden sm:h-[92vh]">
      <div className="absolute inset-0">
        {backdrop && (
          <img
            src={backdrop}
            alt=""
            className="animate-fadeIn h-full w-full object-cover object-top"
            style={{ animationDuration: '1.2s' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/60 to-void-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-void-950/90 via-void-950/10 to-transparent" />
        <div className="bg-film-grain absolute inset-0" />
      </div>

      <div className="section-pad relative z-10 w-full max-w-3xl pb-16 sm:pb-24">
        <p
          className="eyebrow animate-slideUp"
          style={{ animationDelay: '150ms' }}
        >
          Featured This Week
        </p>

        <h1
          className="heading-display animate-slideUp mt-3 text-balance text-4xl font-medium leading-[1.05] text-mist-100 sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '260ms' }}
        >
          {movie.title}
        </h1>

        <div
          className="animate-slideUp mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mist-300"
          style={{ animationDelay: '400ms' }}
        >
          <Rating vote={movie.vote_average} size="lg" />
          <span className="h-1 w-1 rounded-full bg-mist-500" />
          <span>{formatYear(movie.release_date)}</span>
          {movie.runtime > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-mist-500" />
              <span>{formatRuntime(movie.runtime)}</span>
            </>
          )}
          {genreNames.length > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-mist-500" />
              <span>{genreNames.join(' • ')}</span>
            </>
          )}
        </div>

        {movie.overview && (
          <p
            className="animate-slideUp mt-5 line-clamp-3 max-w-xl text-balance text-sm leading-relaxed text-mist-300 sm:text-base"
            style={{ animationDelay: '520ms' }}
          >
            {movie.overview}
          </p>
        )}

        <div
          className="animate-slideUp mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '640ms' }}
        >
          <Link to={`/movie/${movie.id}`} className="btn-primary">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M8 5v14l11-7z" />
            </svg>
            Explore Movie
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
    </section>
  )
}

function HeroSkeleton() {
  return (
    <section className="relative flex h-[88vh] min-h-[560px] w-full items-end overflow-hidden sm:h-[92vh]">
      <div className="skeleton skeleton-shimmer absolute inset-0" />
      <div className="section-pad relative z-10 w-full max-w-2xl space-y-4 pb-24">
        <div className="skeleton skeleton-shimmer h-4 w-32 rounded-full" />
        <div className="skeleton skeleton-shimmer h-14 w-full rounded-xl" />
        <div className="skeleton skeleton-shimmer h-4 w-2/3 rounded-full" />
      </div>
    </section>
  )
}
