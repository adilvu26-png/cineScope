import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, getMovieCredits, getSimilarMovies, getImageUrl } from '../api/movieApi'
import { formatDate, formatRuntime, formatCurrency, formatYear } from '../utils/helpers'
import Rating from '../components/Rating'
import CastCard from '../components/CastCard'
import MovieGrid from '../components/MovieGrid'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import QuickPreviewModal from '../components/QuickPreviewModal'
import { useFavoritesContext } from '../hooks/FavoritesContext'
import { useToast } from '../hooks/ToastContext'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggle } = useFavoritesContext()
  const { showToast } = useToast()

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [previewMovie, setPreviewMovie] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setMovie(null)

    Promise.all([getMovieDetails(id), getMovieCredits(id), getSimilarMovies(id)])
      .then(([details, credits, similarMovies]) => {
        if (cancelled) return
        setMovie(details)
        setCast(credits.slice(0, 12))
        setSimilar(similarMovies.slice(0, 10))
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="pt-28 sm:pt-32">
        <Loader label="Loading movie" />
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="section-pad pt-28 sm:pt-32">
        <ErrorMessage
          title="Couldn't load this movie."
          message="It may not exist, or there was a problem reaching TMDB."
          onRetry={() => navigate(0)}
        />
      </div>
    )
  }

  const favorite = isFavorite(movie.id)
  const backdrop = getImageUrl(movie.backdrop_path, 'original')
  const poster = getImageUrl(movie.poster_path, 'w500')

  function handleFavorite() {
    toggle(movie)
    showToast(favorite ? 'Removed from favorites' : 'Added to favorites')
  }

  return (
    <div className="pb-24">
      <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden sm:h-[58vh]">
        {backdrop ? (
          <img src={backdrop} alt="" className="animate-fadeIn h-full w-full object-cover object-top" />
        ) : (
          <div className="h-full w-full bg-void-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/70 to-void-950/20" />

        <button
          onClick={() => navigate(-1)}
          className="glass absolute left-5 top-24 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-mist-100 transition-colors hover:text-marquee-light sm:top-28"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="section-pad relative z-10 -mt-24 flex flex-col gap-8 sm:-mt-32 sm:flex-row sm:gap-10">
        <div className="animate-slideUp w-40 flex-shrink-0 sm:w-56">
          <div className="aspect-[2/3] overflow-hidden rounded-2xl bg-void-800 shadow-card ring-1 ring-white/10">
            {poster ? (
              <img src={poster} alt={`${movie.title} poster`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-mist-500">No poster</div>
            )}
          </div>
        </div>

        <div className="animate-slideUp flex-1 pt-2" style={{ animationDelay: '120ms' }}>
          <h1 className="heading-display text-balance text-3xl font-medium text-mist-100 sm:text-5xl">
            {movie.title}
          </h1>
          {movie.tagline && <p className="mt-2 text-sm italic text-mist-500">{movie.tagline}</p>}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mist-300">
            <Rating vote={movie.vote_average} size="lg" />
            <span className="h-1 w-1 rounded-full bg-mist-500" />
            <span>{formatYear(movie.release_date)}</span>
            <span className="h-1 w-1 rounded-full bg-mist-500" />
            <span>{formatRuntime(movie.runtime)}</span>
          </div>

          {movie.genres?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <Link
                  key={g.id}
                  to={`/genre/${g.id}`}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-mist-300 transition-colors hover:border-marquee/40 hover:text-marquee-light"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={handleFavorite} className="btn-primary" aria-pressed={favorite}>
              <svg
                viewBox="0 0 24 24"
                fill={favorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
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

          {movie.overview && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-mist-500">Overview</h2>
              <p className="mt-2 max-w-2xl text-balance leading-relaxed text-mist-300">{movie.overview}</p>
            </div>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/[0.06] pt-6 sm:grid-cols-4">
            <DetailItem label="Release Date" value={formatDate(movie.release_date)} />
            <DetailItem label="Budget" value={formatCurrency(movie.budget)} />
            <DetailItem label="Revenue" value={formatCurrency(movie.revenue)} />
            <DetailItem
              label="Production"
              value={movie.production_companies?.map((c) => c.name).join(', ') || 'Independent'}
            />
          </dl>
        </div>
      </div>

      {cast.length > 0 && (
        <section className="section-pad mt-16">
          <h2 className="heading-display text-2xl font-medium text-mist-100">Cast</h2>
          <div className="no-scrollbar mt-6 flex gap-4 overflow-x-auto pb-2">
            {cast.map((member, i) => (
              <div key={member.id} className="animate-slideUp" style={{ animationDelay: `${i * 50}ms` }}>
                <CastCard member={member} />
              </div>
            ))}
          </div>
        </section>
      )}

      {similar.length > 0 && (
        <section className="section-pad mt-16">
          <h2 className="heading-display text-2xl font-medium text-mist-100">Similar Movies</h2>
          <div className="mt-6">
            <MovieGrid movies={similar} loading={false} onQuickPreview={setPreviewMovie} />
          </div>
        </section>
      )}

      {previewMovie && <QuickPreviewModal movie={previewMovie} onClose={() => setPreviewMovie(null)} />}
    </div>
  )
}

function DetailItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-mist-500">{label}</dt>
      <dd className="mt-1 text-sm text-mist-100">{value}</dd>
    </div>
  )
}
