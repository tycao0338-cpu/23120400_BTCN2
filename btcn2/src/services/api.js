// Mock Movie API Service
// Simulates TMDB-like API responses with pagination

const MOCK_MOVIES = [
];

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get top-rated movies with pagination
 * @param {number} page - Page number (1-indexed)
 * @returns {Promise<{results: Array, page: number, total_pages: number, total_results: number}>}
 */
export async function getTopRated(page = 1) {
    await delay(300); // Simulate network delay

    const itemsPerPage = 4;
    const totalResults = MOCK_MOVIES.length;
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const results = MOCK_MOVIES.slice(startIndex, endIndex);

    return {
        results,
        page,
        total_pages: totalPages,
        total_results: totalResults
    };
}

/**
 * Search movies with pagination
 * @param {string} query - Search query
 * @param {number} page - Page number (1-indexed)
 * @returns {Promise<{results: Array, page: number, total_pages: number, total_results: number}>}
 */
export async function searchMovies(query, page = 1) {
    await delay(300); // Simulate network delay

    if (!query || query.trim() === '') {
        return {
            results: [],
            page: 1,
            total_pages: 0,
            total_results: 0
        };
    }

    const filteredMovies = MOCK_MOVIES.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );

    const itemsPerPage = 4;
    const totalResults = filteredMovies.length;
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const results = filteredMovies.slice(startIndex, endIndex);

    return {
        results,
        page,
        total_pages: totalPages,
        total_results: totalResults
    };
}
