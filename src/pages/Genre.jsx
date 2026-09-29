import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMoviesByGenre, GENRES } from '../api/movieApi'
import MovieGrid from '../components/MovieGrid'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import QuickPreviewModal from '../components/QuickPreviewModal'

export default function Genre() {
  const { genreId } = useParams()
  const genre = GENRES.find((g) => String(g.id) === genreId)

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [previewMovie, setPreviewMovie] = useState(null)

  useEffect(() => {
    setPage(1)
    setMovies([])
  }, [genreId])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getMoviesByGenre(genreId, { page })
      .then(({ results, totalPages: tp }) => {
        if (cancelled) return
        setMovies((prev) => (page === 1 ? results : [...prev, ...results]))
        setTotalPages(tp)
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
  }, [genreId, page])

  return (
    <div className="section-pad pb-24 pt-28 sm:pt-32">
      <div className="mb-8">
        <p className="eyebrow">Genre</p>
        <h1 className="heading-display mt-2 text-3xl font-medium text-mist-100 sm:text-4xl">
          {genre ? `${genre.name} Movies` : 'Movies'}
        </h1>
      </div>

      {error ? (
        <ErrorMessage onRetry={() => setPage((p) => p)} />
      ) : !loading && movies.length === 0 ? (
        <EmptyState
          title="No movies found."
          message="Try a different genre from the list."
          actionLabel="Browse Genres"
          actionTo="/genre"
          icon="🎞️"
        />
      ) : (
        <>
          <MovieGrid movies={movies} loading={loading && page === 1} onQuickPreview={setPreviewMovie} />
          {!loading && page < totalPages && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setPage((p) => p + 1)} className="btn-secondary">
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
