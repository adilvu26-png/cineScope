export default function MovieSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="skeleton skeleton-shimmer aspect-[2/3] w-full rounded-2xl" />
          <div className="skeleton skeleton-shimmer h-3.5 w-3/4 rounded-full" />
          <div className="skeleton skeleton-shimmer h-3 w-1/3 rounded-full" />
        </div>
      ))}
    </>
  )
}
