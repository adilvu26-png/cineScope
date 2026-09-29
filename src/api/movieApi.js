// Centralized TMDB API layer.
// Every network call for movie data lives here so components never talk
// to `fetch` directly. Keep this file framework-agnostic (plain JS).

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
]

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * Low-level fetch wrapper. Adds the API key, base URL and consistent
 * error handling so callers only deal with parsed JSON or a thrown ApiError.
 */
async function request(path, params = {}) {
  if (!API_KEY) {
    throw new ApiError(
      'Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file.',
      401
    )
  }

  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  let response
  try {
    response = await fetch(url.toString())
  } catch (networkError) {
    throw new ApiError('Network error while reaching TMDB.', 0)
  }

  if (!response.ok) {
    throw new ApiError(`TMDB request failed (${response.status})`, response.status)
  }

  return response.json()
}

/** Build a full image URL from a TMDB path. Returns null if no path exists. */
export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

export async function getTrendingMovies(timeWindow = 'week') {
  const data = await request(`/trending/movie/${timeWindow}`)
  return data.results ?? []
}

export async function getPopularMovies(page = 1) {
  const data = await request('/movie/popular', { page })
  return data.results ?? []
}

export async function getTopRatedMovies(page = 1) {
  const data = await request('/movie/top_rated', { page })
  return data.results ?? []
}

export async function getUpcomingMovies(page = 1) {
  const data = await request('/movie/upcoming', { page })
  return data.results ?? []
}

export async function getMovieDetails(id) {
  return request(`/movie/${id}`)
}

export async function getMovieCredits(id) {
  const data = await request(`/movie/${id}/credits`)
  return data.cast ?? []
}

export async function getSimilarMovies(id) {
  const data = await request(`/movie/${id}/similar`)
  return data.results ?? []
}

export async function searchMovies(query, page = 1) {
  if (!query?.trim()) return { results: [], totalResults: 0, totalPages: 0 }
  const data = await request('/search/movie', { query, page, include_adult: false })
  return {
    results: data.results ?? [],
    totalResults: data.total_results ?? 0,
    totalPages: data.total_pages ?? 0,
  }
}

export async function getMoviesByGenre(genreId, { page = 1, year, sortBy = 'popularity.desc' } = {}) {
  const data = await request('/discover/movie', {
    with_genres: genreId,
    page,
    primary_release_year: year,
    sort_by: sortBy,
  })
  return {
    results: data.results ?? [],
    totalResults: data.total_results ?? 0,
    totalPages: data.total_pages ?? 0,
  }
}

export async function discoverMovies({
  page = 1,
  genre,
  year,
  minRating,
  language,
  sortBy = 'popularity.desc',
} = {}) {
  const data = await request('/discover/movie', {
    page,
    with_genres: genre || undefined,
    primary_release_year: year || undefined,
    'vote_average.gte': minRating || undefined,
    with_original_language: language || undefined,
    sort_by: sortBy,
  })
  return {
    results: data.results ?? [],
    totalResults: data.total_results ?? 0,
    totalPages: data.total_pages ?? 0,
  }
}

export { ApiError }
