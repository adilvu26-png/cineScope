import EmptyState from '../components/EmptyState'

export default function NotFound() {
  return (
    <div className="section-pad flex min-h-[70vh] items-center justify-center pt-28">
      <EmptyState
        icon="🎞️"
        title="Page not found"
        message="This reel seems to be missing. Let's get you back to something worth watching."
        actionLabel="Back to Home"
        actionTo="/"
      />
    </div>
  )
}
