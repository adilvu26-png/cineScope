import { Link } from 'react-router-dom'

// Each genre gets a subtle gradient pairing so the grid doesn't feel
// like identical repeated tiles.
const GRADIENTS = [
  'from-ember/25 to-void-900',
  'from-marquee/25 to-void-900',
  'from-void-600 to-void-900',
  'from-ember-light/20 to-void-900',
  'from-marquee-dark/30 to-void-900',
]

export default function GenreCard({ genre, index = 0 }) {
  const gradient = GRADIENTS[index % GRADIENTS.length]

  return (
    <Link
      to={`/genre/${genre.id}`}
      className={`group relative flex h-28 items-end overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 sm:h-36 ${gradient}`}
    >
      <span className="heading-display text-lg font-medium text-mist-100 transition-colors group-hover:text-marquee-light sm:text-xl">
        {genre.name}
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="absolute right-4 top-4 h-5 w-5 -translate-x-1 text-mist-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-marquee group-hover:opacity-100"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
