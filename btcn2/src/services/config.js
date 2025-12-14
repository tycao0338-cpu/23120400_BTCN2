/**
 * API Configuration
 * Centralized configuration for API calls
 */

// API Token from environment variables
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;

// API Base URL (có thể thay đổi sau)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

// Default headers for API requests
export const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_TOKEN}`,
});

/**
 * Helper function to make authenticated API requests
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>}
 */
export async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            ...getHeaders(),
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export default {
    API_TOKEN,
    API_BASE_URL,
    getHeaders,
    apiRequest,
};
