import { Link } from 'react-router-dom'

export default function EmptyState({
  icon = '🎬',
  title,
  message,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="animate-fadeIn flex flex-col items-center gap-4 py-24 text-center">
      <span className="text-5xl" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="heading-display text-2xl font-medium text-mist-100">{title}</p>
        {message && <p className="mx-auto mt-2 max-w-sm text-sm text-mist-500">{message}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
