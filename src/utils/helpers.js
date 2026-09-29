export function formatYear(dateString) {
  if (!dateString) return '—'
  const year = new Date(dateString).getFullYear()
  return Number.isNaN(year) ? '—' : year
}

export function formatDate(dateString) {
  if (!dateString) return 'TBA'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'TBA'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatRuntime(minutes) {
  if (!minutes) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

export function formatRating(vote) {
  if (vote === undefined || vote === null || Number.isNaN(vote)) return 'NR'
  return vote.toFixed(1)
}

export function formatCurrency(amount) {
  if (!amount) return 'Undisclosed'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function genreNamesFromIds(ids = [], genreList = []) {
  return ids
    .map((id) => genreList.find((g) => g.id === id)?.name)
    .filter(Boolean)
}

/** Simple debounce: delays invoking fn until `delay` ms of silence. */
export function debounce(fn, delay = 400) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
