export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20" role="status" aria-live="polite">
      <span className="relative flex h-10 w-10 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-marquee" />
      </span>
      <span className="text-sm text-mist-500">{label}…</span>
    </div>
  )
}
