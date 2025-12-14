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

/**
 * Search movies by title
 * @param {string} title - Search query
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Number of movies per page
 * @returns {Promise<{data: Array, pagination: object}>}
 */
export async function searchMovies(title, page = 1, limit = 10) {
    if (!title || title.trim() === "") {
        return {
            data: [],
            pagination: { total_items: 0, current_page: 1, total_pages: 0, page_size: limit }
        };
    }

    const result = await apiRequest(
        `/movies/search?title=${encodeURIComponent(title)}&page=${page}&limit=${limit}`
    );

    return {
        data: result.data.map((movie) => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.year?.toString() || "",
            poster_path: movie.image,
            rating: movie.rate,
            description: movie.short_description,
            genres: movie.genres || [],
        })),
        pagination: result.pagination || {
            total_items: result.data.length,
            current_page: page,
            total_pages: 1,
            page_size: limit
        }
    };
}

/**
 * Search movies by person (actor/director/screenwriter)
 * @param {string} person - Person name to search
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Number of movies per page
 * @returns {Promise<{data: Array, pagination: object}>}
 */
export async function searchByPerson(person, page = 1, limit = 10) {
    if (!person || person.trim() === "") {
        return {
            data: [],
            pagination: { total_items: 0, current_page: 1, total_pages: 0, page_size: limit }
        };
    }

    const result = await apiRequest(
        `/movies/search?person=${encodeURIComponent(person)}&page=${page}&limit=${limit}`
    );

    return {
        data: result.data.map((movie) => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.year?.toString() || "",
            poster_path: movie.image,
            rating: movie.rate,
            description: movie.short_description,
            genres: movie.genres || [],
        })),
        pagination: result.pagination || {
            total_items: result.data.length,
            current_page: page,
            total_pages: 1,
            page_size: limit
        }
    };
}

/**
 * Get movie details by ID
 * @param {string} movieId - Movie ID (e.g., "tt0012349")
 * @returns {Promise<object>} - Movie details with directors, actors, reviews, similar_movies
 */
export async function getMovieDetails(movieId) {
    if (!movieId) {
        throw new Error("Movie ID is required");
    }

    const result = await apiRequest(`/movies/${encodeURIComponent(movieId)}`);

    return {
        id: result.id,
        title: result.title,
        full_title: result.full_title,
        release_date: result.year?.toString() || "",
        poster_path: result.image,
        rating: result.rate,
        runtime: result.runtime,
        overview: result.plot_full,
        short_description: result.short_description,
        genres: result.genres || [],
        awards: result.awards,
        box_office: result.box_office || {},
        ratings: result.ratings || {},
        directors: (result.directors || []).map((d) => ({
            id: d.id,
            name: d.name,
            role: d.role,
            image: d.image,
        })),
        actors: (result.actors || []).map((a) => ({
            id: a.id,
            name: a.name,
            role: a.role,
            image: a.image,
            character: a.character,
        })),
        reviews: (result.reviews || []).map((r) => ({
            id: r.id,
            author: r.username,
            rating: r.rate,
            title: r.title,
            content: r.content,
            date: r.date,
            warning_spoilers: r.warning_spoilers,
        })),
        similar_movies: (result.similar_movies || []).map((m) => ({
            id: m.id,
            title: m.title,
            release_date: m.year?.toString() || "",
            poster_path: m.image,
            rating: m.rate,
            genres: m.genres || [],
        })),
    };
}

/**
 * Get person details by ID
 * @param {string} personId - Person ID (e.g., "nm0000122")
 * @returns {Promise<object>} - Person details with known_for movies
 */
export async function getPersonDetails(personId) {
    if (!personId) {
        throw new Error("Person ID is required");
    }

    const result = await apiRequest(`/persons/${encodeURIComponent(personId)}`);

    return {
        id: result.id,
        name: result.name,
        role: result.role,
        image: result.image,
        summary: result.summary,
        birth_date: result.birth_date,
        death_date: result.death_date,
        height: result.height,
        known_for: (result.known_for || []).map((m) => ({
            id: m.id,
            title: m.title,
            release_date: m.year?.toString() || "",
            poster_path: m.image,
            rating: m.rate,
            short_description: m.short_description,
            genres: m.genres || [],
            role: m.role,
            character: m.character,
        })),
    };
}

/**
 * Get movie reviews with pagination
 * @param {string} movieId - Movie ID (e.g., "tt0012349")
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Number of reviews per page
 * @param {string} sort - Sort order (newest, oldest, highest, lowest)
 * @returns {Promise<object>} - Reviews with pagination
 */
export async function getMovieReviews(movieId, page = 1, limit = 10, sort = "newest") {
    if (!movieId) {
        throw new Error("Movie ID is required");
    }

    const result = await apiRequest(
        `/movies/${encodeURIComponent(movieId)}/reviews?page=${page}&limit=${limit}&sort=${sort}`
    );

    return {
        movie_id: result.movie_id,
        movie_title: result.movie_title,
        reviews: (result.data || []).map((r) => ({
            id: r.id,
            author: r.username,
            rating: r.rate,
            title: r.title,
            content: r.content,
            date: r.date,
            warning_spoilers: r.warning_spoilers,
        })),
        pagination: result.pagination || {
            total_items: 0,
            current_page: page,
            total_pages: 1,
            page_size: limit
        }
    };
}

/**
 * Register a new user
 * @param {object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email
 * @param {string} userData.password - Password
 * @param {string} userData.phone - Phone number (optional)
 * @param {string} userData.dob - Date of birth (optional, YYYY-MM-DD)
 * @returns {Promise<object>} - Registration result
 */
export async function registerUser({ username, email, password, phone, dob }) {
    const result = await apiRequest("/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
            phone: phone || undefined,
            dob: dob || undefined,
        }),
    });

    return result;
}

/**
 * Login user
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise<object>} - Login result with token
 */
export async function loginUser(username, password) {
    const result = await apiRequest("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    return result;
}

/**
 * Logout user
 * @returns {Promise<object>} - Logout result
 */
export async function logoutUser() {
    const result = await apiRequest("/users/logout", {
        method: "POST",
    });

    return result;
}
