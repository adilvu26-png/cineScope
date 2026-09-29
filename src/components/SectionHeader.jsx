import { Link } from 'react-router-dom'

export default function SectionHeader({ title, subtitle, to, toLabel = 'View all' }) {
  return (
    <div className="mb-5 flex items-end justify-between sm:mb-7">
      <div>
        <h2 className="heading-display text-2xl font-medium text-mist-100 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-mist-500">{subtitle}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-mist-300 transition-colors hover:text-marquee-light sm:flex"
        >
          {toLabel}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}
