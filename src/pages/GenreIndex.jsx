import { GENRES } from '../api/movieApi'
import GenreCard from '../components/GenreCard'

export default function GenreIndex() {
  return (
    <div className="section-pad pb-24 pt-28 sm:pt-32">
      <div className="mb-8">
        <p className="eyebrow">Browse</p>
        <h1 className="heading-display mt-2 text-3xl font-medium text-mist-100 sm:text-4xl">Genres</h1>
        <p className="mt-2 max-w-md text-sm text-mist-500">Pick a mood, find a film.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {GENRES.map((genre, i) => (
          <GenreCard key={genre.id} genre={genre} index={i} />
        ))}
      </div>
    </div>
  )
}
