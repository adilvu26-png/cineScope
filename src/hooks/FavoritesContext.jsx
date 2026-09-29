import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { getFavorites, toggleFavorite as toggleFavoriteStorage } from '../utils/favorites'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => getFavorites())

  const toggle = useCallback((movie) => {
    const updated = toggleFavoriteStorage(movie)
    setFavorites(updated)
    return updated
  }, [])

  const isFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
    [favorites]
  )

  const value = useMemo(
    () => ({ favorites, toggle, isFavorite }),
    [favorites, toggle, isFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavoritesContext must be used within a FavoritesProvider')
  return ctx
}
