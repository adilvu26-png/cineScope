import { useCallback, useEffect, useState } from 'react'
import { getFavorites, toggleFavorite, isFavorite } from '../utils/favorites'

/**
 * Keeps a React-reactive view of the favorites stored in localStorage,
 * and exposes a toggle function that updates both storage and state.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => getFavorites())

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === 'cinescope:favorites') {
        setFavorites(getFavorites())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggle = useCallback((movie) => {
    const updated = toggleFavorite(movie)
    setFavorites(updated)
    return updated
  }, [])

  const checkIsFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
    [favorites]
  )

  return { favorites, toggle, isFavorite: checkIsFavorite }
}

export { isFavorite }
