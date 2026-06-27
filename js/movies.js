// ============================================
// movies.js
// ============================================

import {
    API_KEY,
    IMAGE_BASE_URL,
    fetchData
} from "./api.js";

import { showMovieDetails } from "./modal.js";

const movieContainer = document.getElementById("movie-container");
const sectionTitle = document.getElementById("section-title");

// ============================================
// Load Trending Movies
// ============================================

export async function loadTrendingMovies() {

    sectionTitle.textContent = "🔥 Trending Movies";

    const data = await fetchData(
        `/trending/movie/day?api_key=${API_KEY}`
    );

    if (data && data.results) {
        displayMovies(data.results);
    }

}

// ============================================
// Load Popular Movies
// ============================================

export async function loadPopularMovies() {

    sectionTitle.textContent = "🎬 Popular Movies";

    const data = await fetchData(
        `/movie/popular?api_key=${API_KEY}`
    );

    if (data && data.results) {
        displayMovies(data.results);
    }

}

// ============================================
// Load Top Rated Movies
// ============================================

export async function loadTopRatedMovies() {

    sectionTitle.textContent = "⭐ Top Rated Movies";

    const data = await fetchData(
        `/movie/top_rated?api_key=${API_KEY}`
    );

    if (data && data.results) {
        displayMovies(data.results);
    }

}

// ============================================
// Load Upcoming Movies
// ============================================

export async function loadUpcomingMovies() {

    sectionTitle.textContent = "📅 Upcoming Movies";

    const data = await fetchData(
        `/movie/upcoming?api_key=${API_KEY}`
    );

    if (data && data.results) {
        displayMovies(data.results);
    }

}

// ============================================
// Display Movies
// ============================================

export function displayMovies(movies) {

    movieContainer.innerHTML = "";

    if (!movies || movies.length === 0) {

        movieContainer.innerHTML =
            "<h2>No Movies Found</h2>";

        return;

    }

    movies.forEach(movie => {

        createMovieCard(movie);

    });

}

// ============================================
// Create Movie Card
// ============================================

function createMovieCard(movie) {

    const card = document.createElement("div");

    card.className = "movie-card";

    const poster = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "N/A";

    const year = movie.release_date
        ? movie.release_date.substring(0, 4)
        : "N/A";

    const overview = movie.overview
        ? movie.overview.substring(0, 100) + "..."
        : "No overview available.";

    card.innerHTML = `
    
        <img src="${poster}" alt="${movie.title}">

        <div class="movie-info">

            <h3>${movie.title}</h3>

            <p>⭐ ${rating}</p>

            <p>📅 ${year}</p>

            <p>${overview}</p>

            <button class="details-btn">
                View Details
            </button>

        </div>

    `;

    // View Details Button

    card.querySelector(".details-btn").addEventListener("click", () => {

        showMovieDetails(movie.id);

    });

    movieContainer.appendChild(card);

}

// ============================================
// Setup Category Buttons
// ============================================

export function setupCategories() {

    const trendingBtn = document.getElementById("trending-btn");
    const popularBtn = document.getElementById("popular-btn");
    const topRatedBtn = document.getElementById("toprated-btn");
    const upcomingBtn = document.getElementById("upcoming-btn");

    if (trendingBtn) {

        trendingBtn.addEventListener("click", () => {

            activateButton(trendingBtn);

            loadTrendingMovies();

        });

    }

    if (popularBtn) {

        popularBtn.addEventListener("click", () => {

            activateButton(popularBtn);

            loadPopularMovies();

        });

    }

    if (topRatedBtn) {

        topRatedBtn.addEventListener("click", () => {

            activateButton(topRatedBtn);

            loadTopRatedMovies();

        });

    }

    if (upcomingBtn) {

        upcomingBtn.addEventListener("click", () => {

            activateButton(upcomingBtn);

            loadUpcomingMovies();

        });

    }

}

// ============================================
// Active Button
// ============================================

function activateButton(activeBtn) {

    document.querySelectorAll(".category-btn").forEach(btn => {

        btn.classList.remove("active");

    });

    activeBtn.classList.add("active");

}