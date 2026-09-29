import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../api/movieApi'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import QuickPreviewModal from '../components/QuickPreviewModal'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [previewMovie, setPreviewMovie] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setMovies([])
      setTotalResults(0)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    searchMovies(query)
      .then(({ results, totalResults: total }) => {
        if (cancelled) return
        setMovies(results)
        setTotalResults(total)
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
  }, [query])

  return (
    <div className="section-pad pb-24 pt-28 sm:pt-32">
      <div className="mb-8">
        <p className="eyebrow">Search</p>
        <h1 className="heading-display mt-2 text-3xl font-medium text-mist-100 sm:text-4xl">
          {query ? `Results for “${query}”` : 'Search Movies'}
        </h1>
        {!loading && query && !error && (
          <p className="mt-2 text-sm text-mist-500">{totalResults.toLocaleString()} movies found</p>
        )}
        <div className="mt-6 max-w-md">
          <SearchBar initialValue={query} />
        </div>
      </div>

      {!query.trim() ? (
        <EmptyState
          icon="🔎"
          title="Search for a movie"
          message="Try a title, like “Interstellar” or “Batman”."
        />
      ) : error ? (
        <ErrorMessage onRetry={() => setError(null)} />
      ) : !loading && movies.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No movies found."
          message="Try searching with another title."
          actionLabel="Browse Trending Movies"
          actionTo="/trending"
        />
      ) : (
        <MovieGrid movies={movies} loading={loading} onQuickPreview={setPreviewMovie} />
      )}

      {previewMovie && <QuickPreviewModal movie={previewMovie} onClose={() => setPreviewMovie(null)} />}
    </div>
  )
}
