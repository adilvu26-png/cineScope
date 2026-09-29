import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { FavoritesProvider } from './hooks/FavoritesContext'
import { ToastProvider } from './hooks/ToastContext'

import Home from './pages/Home'
import Discover from './pages/Discover'
import Trending from './pages/Trending'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import GenreIndex from './pages/GenreIndex'
import Genre from './pages/Genre'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <FavoritesProvider>
      <ToastProvider>
        <div className="flex min-h-screen flex-col">
          <ScrollToTop />
          <Navbar />
          <main key={location.pathname} className="animate-fadeIn flex-1" style={{ animationDuration: '0.35s' }}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/genre" element={<GenreIndex />} />
              <Route path="/genre/:genreId" element={<Genre />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </FavoritesProvider>
  )
}
