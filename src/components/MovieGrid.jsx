import MovieCard from './MovieCard'
import MovieSkeleton from './MovieSkeleton'

/**
 * Responsive movie grid: 2 cols mobile, 3-4 tablet, 5 desktop.
 * When `loading`, renders skeleton placeholders instead of blank space.
 */
export default function MovieGrid({ movies, loading, skeletonCount = 10, onQuickPreview, stagger = true }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {loading ? (
        <MovieSkeleton count={skeletonCount} />
      ) : (
        movies.map((movie, i) => (
          <div
            key={movie.id}
            className={stagger ? 'animate-slideUp' : ''}
            style={stagger ? { animationDelay: `${Math.min(i, 10) * 45}ms` } : undefined}
          >
            <MovieCard movie={movie} onQuickPreview={onQuickPreview} />
          </div>
        ))
      )}
    </div>
  )
}
