import { formatRating } from '../utils/helpers'

/**
 * Small star + score badge. `size` controls text scale so it can be
 * dropped into cards, hero sections or the details page.
 */
export default function Rating({ vote, size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-lg gap-2',
  }

  return (
    <span
      className={`inline-flex items-center font-semibold text-marquee-light ${sizes[size]} ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className={size === 'lg' ? 'h-5 w-5' : size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'}
        aria-hidden="true"
      >
        <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L10 1.5z" />
      </svg>
      {formatRating(vote)}
    </span>
  )
}
