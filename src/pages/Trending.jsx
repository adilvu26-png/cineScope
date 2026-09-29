import { useEffect, useState } from 'react'
import { getTrendingMovies } from '../api/movieApi'
import MovieGrid from '../components/MovieGrid'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import QuickPreviewModal from '../components/QuickPreviewModal'

const PAGE_SIZE = 15

export default function Trending() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [timeWindow, setTimeWindow] = useState('week')
  const [previewMovie, setPreviewMovie] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getTrendingMovies(timeWindow)
      .then((data) => {
        if (!cancelled) setMovies(data)
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
  }, [timeWindow])

  return (
    <div className="section-pad pb-24 pt-28 sm:pt-32">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Right Now</p>
          <h1 className="heading-display mt-2 text-3xl font-medium text-mist-100 sm:text-4xl">
            Trending Movies
          </h1>
        </div>

        <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm">
          {[
            { value: 'day', label: 'Today' },
            { value: 'week', label: 'This Week' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTimeWindow(opt.value)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors duration-200 ${
                timeWindow === opt.value ? 'bg-marquee text-void-950' : 'text-mist-300 hover:text-mist-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <ErrorMessage onRetry={() => setTimeWindow((w) => w)} />
      ) : !loading && movies.length === 0 ? (
        <EmptyState title="No trending movies right now" message="Check back soon." icon="📽️" />
      ) : (
        <>
          <MovieGrid movies={movies.slice(0, visibleCount)} loading={loading} onQuickPreview={setPreviewMovie} />
          {!loading && visibleCount < movies.length && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} className="btn-secondary">
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {previewMovie && <QuickPreviewModal movie={previewMovie} onClose={() => setPreviewMovie(null)} />}
    </div>
  )
}
