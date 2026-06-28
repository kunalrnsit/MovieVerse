// ============================================
// TMDB API Configuration
// ============================================

export const API_KEY = "ea2660aae78b7f5e138c2aeebfe6a9ff";

export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// ============================================
// Fetch Data Function (WITH TIMEOUT)
// ============================================

export async function fetchData(endpoint, timeout = 8000) {

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            signal: controller.signal
        });

        clearTimeout(timer);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {

        console.error("FetchData Error:", error.message);

        return {
            results: [],
            error: true
        };
    }
}