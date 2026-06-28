// =========================================
// modal.js (UPDATED - WITH SIMILAR MOVIES)
// =========================================

import {
    API_KEY,
    IMAGE_BASE_URL,
    fetchData
} from "./api.js";

import { getTrailer } from "./trailer.js";
import { getCast, createCastHTML } from "./cast.js";
import { getReviews, createReviewsHTML } from "./reviews.js";

import {
    addToFavorites,
    removeFromFavorites,
    isFavorite
} from "./favorites.js";

import { getSimilarMovies } from "./similar.js";

// =========================================
// SHOW MOVIE DETAILS
// =========================================

export async function showMovieDetails(movieId) {

    const modal = document.getElementById("movie-modal");
    const modalBody = document.getElementById("modal-body");

    // =========================
    // LOADING STATE
    // =========================
    modalBody.innerHTML = `
        <div class="modal-loading">
            <p>Loading...</p>
        </div>
    `;

    modal.style.display = "flex";

    try {

        // =========================
        // MAIN MOVIE DATA
        // =========================
        const data = await fetchData(
            `/movie/${movieId}?api_key=${API_KEY}`
        );

        if (!data) {
            modalBody.innerHTML = "<p>Error loading movie details</p>";
            return;
        }

        // =========================
        // PARALLEL DATA FETCH
        // =========================
        const trailerURL = await getTrailer(movieId);
        const cast = await getCast(movieId);
        const reviews = await getReviews(movieId);
        const similarMovies = await getSimilarMovies(movieId);

        const castHTML = createCastHTML(cast);
        const reviewsHTML = createReviewsHTML(reviews);

        const poster = data.poster_path
            ? `${IMAGE_BASE_URL}${data.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";

        const heartIcon = isFavorite(movieId) ? "❤️" : "🤍";

        // =========================
        // SIMILAR MOVIES HTML
        // =========================
        const similarHTML = createSimilarHTML(similarMovies);

        // =========================
        // RENDER MODAL
        // =========================
        modalBody.innerHTML = `
            <div class="modal-container">

                <img
                    class="modal-poster"
                    src="${poster}"
                    alt="${data.title}"
                >

                <div class="modal-info">

                    <button class="close-btn">&times;</button>

                    <h2>${data.title}</h2>

                    <p><strong>⭐ Rating:</strong> ${data.vote_average}</p>

                    <p><strong>📅 Release:</strong> ${data.release_date}</p>

                    <p><strong>🌍 Language:</strong> ${data.original_language?.toUpperCase() || "N/A"}</p>

                    <p><strong>⏳ Runtime:</strong> ${data.runtime || "N/A"} min</p>

                    <p><strong>🎭 Genres:</strong> ${
                        data.genres?.map(g => g.name).join(", ") || "N/A"
                    }</p>

                    <p>${data.overview || "No overview available."}</p>

                    <button class="fav-detail-btn">
                        ${heartIcon} ${isFavorite(movieId) ? "Remove from Favorites" : "Add to Favorites"}
                    </button>

                    <hr>

                    <h3>🎥 Official Trailer</h3>

                    ${
                        trailerURL
                            ? `
                            <iframe
                                width="100%"
                                height="350"
                                src="${trailerURL}"
                                frameborder="0"
                                allowfullscreen>
                            </iframe>
                            `
                            : "<p>No Trailer Available</p>"
                    }

                    <hr>

                    <h3>👨‍🎤 Top Cast</h3>
                    ${castHTML || "<p>No cast data</p>"}

                    <hr>

                    <h3>⭐ Reviews</h3>
                    ${reviewsHTML || "<p>No reviews available</p>"}

                    <hr>

                    <h3>🎯 Recommended for you</h3>
                    ${similarHTML}

                </div>
            </div>
        `;

        // =========================
        // CLOSE MODAL
        // =========================
        const closeBtn = modal.querySelector(".close-btn");

        closeBtn.addEventListener("click", closeModal);

        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
            }
        };

        // =========================
        // FAVORITES BUTTON
        // =========================
        const favBtn = modal.querySelector(".fav-detail-btn");

        favBtn.addEventListener("click", () => {

            const movieData = {
                id: movieId,
                title: data.title,
                poster_path: data.poster_path,
                vote_average: data.vote_average,
                release_date: data.release_date
            };

            if (isFavorite(movieId)) {
                removeFromFavorites(movieId);
                favBtn.innerHTML = "🤍 Add to Favorites";
            } else {
                addToFavorites(movieData);
                favBtn.innerHTML = "❤️ Added to Favorites";
            }

        });

        // =========================
        // CLICK ON SIMILAR MOVIES
        // =========================
        modal.querySelectorAll(".similar-card").forEach(card => {

            card.addEventListener("click", () => {

                const id = card.dataset.id;
                showMovieDetails(id);

            });

        });

    } catch (error) {
        console.error("Modal Error:", error);

        modalBody.innerHTML = `
            <p style="color:red;">Failed to load movie details</p>
        `;
    }
}

// =========================================
// CLOSE MODAL FUNCTION
// =========================================

function closeModal() {
    const modal = document.getElementById("movie-modal");
    modal.style.display = "none";
}

// =========================================
// CREATE SIMILAR MOVIES HTML
// =========================================

function createSimilarHTML(movies) {

    if (!movies || movies.length === 0) {
        return "<p>No recommendations available</p>";
    }

    return `
        <div class="similar-container">

            ${movies.map(movie => {

                const poster = movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image";

                return `
                    <div class="similar-card" data-id="${movie.id}">
                        <img src="${poster}" alt="${movie.title}">
                        <p>${movie.title}</p>
                    </div>
                `;
            }).join("")}

        </div>
    `;
}