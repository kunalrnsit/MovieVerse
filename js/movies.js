// ============================================
// movies.js (UPDATED VERSION)
// ============================================

import {
    API_KEY,
    IMAGE_BASE_URL,
    fetchData
} from "./api.js";

import { showMovieDetails } from "./modal.js";

import {
    addToFavorites,
    removeFromFavorites,
    isFavorite
} from "./favorites.js";

const movieContainer = document.getElementById("movie-container");
const sectionTitle = document.getElementById("section-title");

// ============================================
// LOADING STATE
// ============================================

let isLoading = false;
// ===============================
// Infinite Scroll Variables
// ===============================

let currentPage = 1;
let totalPages = 1;
let currentCategory = "trending";

// ============================================
// SKELETON UI
// ============================================

function renderSkeletons() {
    return Array(12)
        .fill()
        .map(() => `
            <div class="movie-card skeleton"></div>
        `)
        .join("");
}

function showLoader() {
    isLoading = true;
    movieContainer.innerHTML = renderSkeletons();
}

function hideLoader() {
    isLoading = false;
}

// ============================================
// Load Trending Movies
// ============================================

export async function loadTrendingMovies() {

    sectionTitle.textContent = "🔥 Trending Movies";

    try {
        showLoader();

        const data = await fetchData(
           
            `/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
        );

        if (data) {
            totalPages = data.total_pages;
        }
        

        hideLoader();

        if (data && data.results) {
            displayMovies(data.results);
        }

    } catch (error) {
        console.error("Error loading trending movies:", error);
        movieContainer.innerHTML = "<h2>Error loading movies</h2>";
    }
}

// ============================================
// Load Popular Movies
// ============================================

export async function loadPopularMovies() {

    sectionTitle.textContent = "🎬 Popular Movies";

    try {
        showLoader();

        const data = await fetchData(
            `/movie/popular?api_key=${API_KEY}`
        );

        hideLoader();

        if (data && data.results) {
            displayMovies(data.results);
        }

    } catch (error) {
        console.error("Error loading popular movies:", error);
    }
}

// ============================================
// Load Top Rated Movies
// ============================================

export async function loadTopRatedMovies() {

    sectionTitle.textContent = "⭐ Top Rated Movies";

    try {
        showLoader();

        const data = await fetchData(
            `/movie/top_rated?api_key=${API_KEY}`
        );

        hideLoader();

        if (data && data.results) {
            displayMovies(data.results);
        }

    } catch (error) {
        console.error("Error loading top rated movies:", error);
    }
}

// ============================================
// Load Upcoming Movies
// ============================================

export async function loadUpcomingMovies() {

    sectionTitle.textContent = "📅 Upcoming Movies";

    try {
        showLoader();

        const data = await fetchData(
            `/movie/upcoming?api_key=${API_KEY}`
        );

        hideLoader();

        if (data && data.results) {
            displayMovies(data.results);
        }

    } catch (error) {
        console.error("Error loading upcoming movies:", error);
    }
}

// ============================================
// Display Movies
// ============================================

export function displayMovies(movies , append = false) {
    if(!append){


    movieContainer.innerHTML = "";
    }

    if (!movies || movies.length === 0) {
        movieContainer.innerHTML = "<h2>No Movies Found</h2>";
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

    const heartIcon = isFavorite(movie.id) ? "❤️" : "🤍";

    card.innerHTML = `
        <div class="movie-poster-wrapper">
            <img src="${poster}" alt="${movie.title}">
            
            <button class="fav-btn">
                ${heartIcon}
            </button>
        </div>

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

    // ============================================
    // View Details
    // ============================================

    card.querySelector(".details-btn")
        .addEventListener("click", () => {
            showMovieDetails(movie.id);
        });

    // ============================================
    // Favorite Button
    // ============================================

    const favBtn = card.querySelector(".fav-btn");

    favBtn.addEventListener("click", () => {

        const movieData = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            release_date: movie.release_date
        };

        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
            favBtn.textContent = "🤍";
        } else {
            addToFavorites(movieData);
            favBtn.textContent = "❤️";
        }
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

// ============================================
// Load Favorites Movies
// ============================================

export function loadFavoritesMovies() {

    sectionTitle.textContent = "❤️ Your Favorites";

    showLoader();

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    hideLoader();

    if (favorites.length === 0) {
        movieContainer.innerHTML = "<h2>No Favorites Added ❤️</h2>";
        return;
    }

    displayMovies(favorites);
}
export async function loadNextPage() {

    if (isLoading) return;

    if (currentPage >= totalPages) return;

    currentPage++;

    const data = await fetchData(
        `/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
    );

    if (data && data.results) {

        displayMovies(data.results, true);

    }

}