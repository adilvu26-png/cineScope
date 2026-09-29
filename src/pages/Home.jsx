import { useEffect, useState } from 'react'
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  GENRES,
} from '../api/movieApi'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import MovieGrid from '../components/MovieGrid'
import GenreCard from '../components/GenreCard'
import SectionHeader from '../components/SectionHeader'
import ErrorMessage from '../components/ErrorMessage'
import QuickPreviewModal from '../components/QuickPreviewModal'

export default function Home() {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [previewMovie, setPreviewMovie] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    Promise.all([getTrendingMovies(), getPopularMovies(), getTopRatedMovies(), getUpcomingMovies()])
      .then(([t, p, tr, u]) => {
        if (cancelled) return
        setTrending(t)
        setPopular(p)
        setTopRated(tr)
        setUpcoming(u)
      })
      .catch((err) => {
  console.error('Failed to load home page data:', err)
  if (!cancelled) setError(err)
})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  if (error) {
    return (
      <div className="section-pad pt-32">
        <ErrorMessage onRetry={() => setReloadKey((k) => k + 1)} />
      </div>
    )
  }

  const featured = trending[0]

  return (
    <>
      <Hero movie={featured} />

      <div className="section-pad space-y-16 py-16 sm:space-y-20 sm:py-20">
        <section>
          <SectionHeader title="Trending Now" subtitle="What everyone's watching this week" to="/trending" />
          <Carousel movies={trending} loading={loading} onQuickPreview={setPreviewMovie} />
        </section>

        <section>
          <SectionHeader title="Popular" subtitle="Fan favorites right now" to="/discover?sort=popularity.desc" />
          <MovieGrid movies={popular.slice(0, 10)} loading={loading} onQuickPreview={setPreviewMovie} />
        </section>

        <section>
          <SectionHeader title="Top Rated" subtitle="Critically acclaimed classics" to="/discover?sort=vote_average.desc" />
          <MovieGrid movies={topRated.slice(0, 10)} loading={loading} onQuickPreview={setPreviewMovie} />
        </section>

        <section>
          <SectionHeader title="Upcoming" subtitle="Coming soon to theaters" to="/discover?sort=release_date.desc" />
          <MovieGrid movies={upcoming.slice(0, 10)} loading={loading} onQuickPreview={setPreviewMovie} />
        </section>

        <section>
          <SectionHeader title="Browse by Genre" subtitle="Find your next favorite by mood or style" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {GENRES.map((genre, i) => (
              <GenreCard key={genre.id} genre={genre} index={i} />
            ))}
          </div>
        </section>
      </div>

      {previewMovie && (
        <QuickPreviewModal movie={previewMovie} onClose={() => setPreviewMovie(null)} />
      )}
    </>
  )
}
