import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { discoverMovies, GENRES } from '../api/movieApi'
import MovieGrid from '../components/MovieGrid'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import QuickPreviewModal from '../components/QuickPreviewModal'
import { debounce } from '../utils/helpers'

const YEARS = Array.from({ length: 30 }, (_, i) => 2026 - i)
const LANGUAGES = [
  { code: '', label: 'All Languages' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'hi', label: 'Hindi' },
]
const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'release_date.desc', label: 'Newest' },
  { value: 'release_date.asc', label: 'Oldest' },
  { value: 'title.asc', label: 'Title (A-Z)' },
]

export default function Discover() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [genre, setGenre] = useState(searchParams.get('genre') || '')
  const [year, setYear] = useState(searchParams.get('year') || '')
  const [minRating, setMinRating] = useState(searchParams.get('rating') || '')
  const [language, setLanguage] = useState(searchParams.get('lang') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popularity.desc')
  const [page, setPage] = useState(1)

  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [previewMovie, setPreviewMovie] = useState(null)

  // Keep the URL in sync with filters so results are shareable / bookmarkable.
  useEffect(() => {
    const params = {}
    if (genre) params.genre = genre
    if (year) params.year = year
    if (minRating) params.rating = minRating
    if (language) params.lang = language
    if (sortBy !== 'popularity.desc') params.sort = sortBy
    setSearchParams(params, { replace: true })
  }, [genre, year, minRating, language, sortBy]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPage(1)
  }, [genre, year, minRating, language, sortBy])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    discoverMovies({ page, genre, year, minRating, language, sortBy })
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
  }, [page, genre, year, minRating, language, sortBy])

  const filteredMovies = useMemo(() => {
    if (!search.trim()) return movies
    const q = search.trim().toLowerCase()
    return movies.filter((m) => m.title.toLowerCase().includes(q))
  }, [movies, search])

  const debouncedSetSearch = useMemo(() => debounce((v) => setSearch(v), 300), [])

  return (
    <div className="section-pad pb-24 pt-28 sm:pt-32">
      <div className="mb-8">
        <p className="eyebrow">Refine your results</p>
        <h1 className="heading-display mt-2 text-3xl font-medium text-mist-100 sm:text-4xl">Discover Movies</h1>
      </div>

      <div className="glass mb-10 rounded-2xl p-4 sm:p-6">
        <div className="mb-4">
          <label htmlFor="filter-search" className="mb-1.5 block text-xs font-medium text-mist-500">
            Search within results
          </label>
          <input
            id="filter-search"
            type="text"
            defaultValue={search}
            onChange={(e) => debouncedSetSearch(e.target.value)}
            placeholder="Search movies…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-mist-100 placeholder:text-mist-500 outline-none transition-colors focus:border-marquee/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <FilterSelect
            label="Genre"
            value={genre}
            onChange={setGenre}
            options={[{ code: '', label: 'All Genres' }, ...GENRES.map((g) => ({ code: String(g.id), label: g.name }))]}
          />
          <FilterSelect
            label="Year"
            value={year}
            onChange={setYear}
            options={[{ code: '', label: 'All Years' }, ...YEARS.map((y) => ({ code: String(y), label: String(y) }))]}
          />
          <FilterSelect
            label="Rating"
            value={minRating}
            onChange={setMinRating}
            options={[
              { code: '', label: 'All Ratings' },
              { code: '8', label: '8+ Excellent' },
              { code: '6', label: '6+ Good' },
              { code: '4', label: '4+ Average' },
            ]}
          />
          <FilterSelect
            label="Language"
            value={language}
            onChange={setLanguage}
            options={LANGUAGES}
          />
          <FilterSelect
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={SORT_OPTIONS.map((o) => ({ code: o.value, label: o.label }))}
          />
        </div>
      </div>

      {error ? (
        <ErrorMessage onRetry={() => setPage((p) => p)} />
      ) : !loading && filteredMovies.length === 0 ? (
        <EmptyState
          title="No movies found."
          message="Try adjusting your filters or searching a different title."
          icon="🔍"
        />
      ) : (
        <>
          <MovieGrid movies={filteredMovies} loading={loading && page === 1} onQuickPreview={setPreviewMovie} />
          {!loading && page < totalPages && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setPage((p) => p + 1)} className="btn-secondary">
                Load More
              </button>
            </div>
          )}
          {loading && page > 1 && (
            <p className="mt-8 text-center text-sm text-mist-500">Loading more…</p>
          )}
        </>
      )}

      {previewMovie && <QuickPreviewModal movie={previewMovie} onClose={() => setPreviewMovie(null)} />}
    </div>
  )
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-mist-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-mist-100 outline-none transition-colors focus:border-marquee/50"
      >
        {options.map((opt) => (
          <option key={opt.code} value={opt.code} className="bg-void-800 text-mist-100">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
