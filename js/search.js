// ============================================
// search.js
// ============================================

import { API_KEY, fetchData } from "./api.js";
import { displayMovies } from "./movies.js";

export function setupSearch() {

    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");

    if (!searchBtn || !searchInput) {

        console.error("Search elements not found.");
        return;

    }

    // Search when button is clicked
    searchBtn.addEventListener("click", searchMovies);

    // Search when Enter key is pressed
    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            event.preventDefault();
            searchMovies();

        }

    });

}

async function searchMovies() {

    const searchInput = document.getElementById("search-input");

    const query = searchInput.value.trim();

    if (query === "") {

        alert("Please enter a movie name.");
        return;

    }

    try {

        const data = await fetchData(
            `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        if (!data || !data.results) {

            alert("Unable to fetch movies.");
            return;

        }

        if (data.results.length === 0) {

            document.getElementById("movie-container").innerHTML =
                "<h2>No movies found.</h2>";

            document.getElementById("section-title").textContent =
                "No Results";

            return;

        }

        displayMovies(data.results);

        document.getElementById("section-title").textContent =
            `🔍 Search Results for "${query}"`;

    }

    catch (error) {

        console.error("Search Error:", error);

    }

}