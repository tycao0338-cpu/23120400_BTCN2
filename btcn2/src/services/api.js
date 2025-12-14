/**
 * Movie API Service
 * Xử lý gọi API tập trung - theo cấu trúc src/services
 */

import { API_TOKEN } from "./config";

// API Base URL - sử dụng proxy để bypass CORS
const API_BASE_URL = "/api";

/**
 * Helper function to make API requests
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>}
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            "accept": "application/json",
            "x-app-token": API_TOKEN,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}






/**
 * Get most popular movies
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Number of movies to fetch
 * @returns {Promise<Array>} - Array of movies
 */
export async function getMostPopular(page = 1, limit = 5) {
    const result = await apiRequest(`/movies/most-popular?page=${page}&limit=${limit}`);

    return result.data.map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.year?.toString() || "",
        poster_path: movie.image,
        rating: movie.rate,
        description: movie.short_description,
        genres: movie.genres || [],
        revenue: movie.box_office_revenue,
    }));
}

/**
 * Get top-rated movies (IMDB TOP 50)
 * @param {string} category - Category (default: IMDB_TOP_50)
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Number of movies to fetch
 * @returns {Promise<Array>} - Array of movies
 */
export async function getTopRated(category = "IMDB_TOP_50", page = 1, limit = 15) {
    const result = await apiRequest(
        `/movies/top-rated?category=${encodeURIComponent(category)}&page=${page}&limit=${limit}`
    );

    return result.data.map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.year?.toString() || "",
        poster_path: movie.image,
        rating: movie.rate,
        description: movie.short_description,
        genres: movie.genres || [],
        rank: movie.rank,
    }));
}

