// Favorites persistence layer. Pure functions over localStorage so UI
// components never touch storage APIs directly.

const STORAGE_KEY = 'cinescope:favorites'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // Storage might be unavailable (private browsing, quota). Fail silently;
    // the app still works, favorites just won't persist.
  }
}

export function getFavorites() {
  return readAll()
}

export function isFavorite(movieId) {
  return readAll().some((m) => m.id === movieId)
}

export function addFavorite(movie) {
  const favorites = readAll()
  if (favorites.some((m) => m.id === movie.id)) return favorites
  const minimalMovie = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    addedAt: Date.now(),
  }
  const updated = [minimalMovie, ...favorites]
  writeAll(updated)
  return updated
}

export function removeFavorite(movieId) {
  const updated = readAll().filter((m) => m.id !== movieId)
  writeAll(updated)
  return updated
}

export function toggleFavorite(movie) {
  return isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie)
}
