// ============================================
// TMDB API Configuration
// ============================================
export const API_KEY = "ea2660aae78b7f5e138c2aeebfe6a9ff";

export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// ============================================
// Fetch Data Function
// ============================================

export async function fetchData(endpoint) {

    try {

        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return null;

    }

}