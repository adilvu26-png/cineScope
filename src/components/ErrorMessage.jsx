export default function ErrorMessage({
  title = 'Something went wrong.',
  message = "We couldn't load the movies right now.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center" role="alert">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ember/10 text-ember-light">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
          <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
      <div>
        <p className="heading-display text-xl font-medium text-mist-100">{title}</p>
        <p className="mt-1 text-sm text-mist-500">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary">
          Try Again
        </button>
      )}
    </div>
  )
}
