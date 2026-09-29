import MovieGrid from '../components/MovieGrid'
import EmptyState from '../components/EmptyState'
import QuickPreviewModal from '../components/QuickPreviewModal'
import { useFavoritesContext } from '../hooks/FavoritesContext'
import { useState } from 'react'

export default function Favorites() {
  const { favorites } = useFavoritesContext()
  const [previewMovie, setPreviewMovie] = useState(null)

  return (
    <div className="section-pad pb-24 pt-28 sm:pt-32">
      <div className="mb-8">
        <p className="eyebrow">Your Watchlist</p>
        <h1 className="heading-display mt-2 text-3xl font-medium text-mist-100 sm:text-4xl">Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon="🎬"
          title="Your watchlist is empty"
          message="Start exploring movies and save your favorites here."
          actionLabel="Explore Movies"
          actionTo="/discover"
        />
      ) : (
        <MovieGrid movies={favorites} loading={false} onQuickPreview={setPreviewMovie} />
      )}

      {previewMovie && <QuickPreviewModal movie={previewMovie} onClose={() => setPreviewMovie(null)} />}
    </div>
  )
}
