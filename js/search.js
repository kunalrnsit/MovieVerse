// ============================================
// search.js (IMPROVED VERSION)
// ============================================

import { API_KEY, fetchData } from "./api.js";
import { displayMovies } from "./movies.js";

// ============================================
// Setup Search
// ============================================

export function setupSearch() {

    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");

    if (!searchBtn || !searchInput) {
        console.error("Search elements not found.");
        return;
    }

    // Button click search
    searchBtn.addEventListener("click", searchMovies);

    // Enter key search
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchMovies();
        }
    });
}

// ============================================
// MAIN SEARCH FUNCTION (IMPROVED)
// ============================================

async function searchMovies() {

    const searchInput = document.getElementById("search-input");
    const movieContainer = document.getElementById("movie-container");
    const sectionTitle = document.getElementById("section-title");

    const query = searchInput.value.trim();

    // ----------------------------------------
    // Validate input
    // ----------------------------------------
    if (query === "") {
        alert("Please enter a movie name.");
        return;
    }

    try {

        // ========================================
        // Show loading state (IMPORTANT FIX)
        // ========================================
        movieContainer.innerHTML = `
            <div class="movie-card skeleton"></div>
            <div class="movie-card skeleton"></div>
            <div class="movie-card skeleton"></div>
            <div class="movie-card skeleton"></div>
        `;

        sectionTitle.textContent = "🔍 Searching...";

        // ========================================
        // Fetch search results
        // ========================================
        const data = await fetchData(
            `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        // ----------------------------------------
        // Handle API failure
        // ----------------------------------------
        if (!data || data.error) {
            movieContainer.innerHTML = "<h2>⚠️ Error fetching movies</h2>";
            sectionTitle.textContent = "Error";
            return;
        }

        // ----------------------------------------
        // Handle no results
        // ----------------------------------------
        if (data.results.length === 0) {

            movieContainer.innerHTML = "<h2>No movies found 😔</h2>";
            sectionTitle.textContent = "No Results";
            return;
        }

        // ========================================
        // Render results
        // ========================================
        displayMovies(data.results);

        sectionTitle.textContent = `🔍 Search Results for "${query}"`;

    } catch (error) {

        console.error("Search Error:", error);

        movieContainer.innerHTML = "<h2>Something went wrong ❌</h2>";
        sectionTitle.textContent = "Error";
    }
}