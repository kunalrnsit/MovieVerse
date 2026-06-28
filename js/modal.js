// =========================================
// modal.js
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

export async function showMovieDetails(movieId) {

    const data = await fetchData(
        `/movie/${movieId}?api_key=${API_KEY}`
    );

    if (!data) return;

    const trailerURL = await getTrailer(movieId);

    const cast = await getCast(movieId);
    const castHTML = createCastHTML(cast);

    const reviews = await getReviews(movieId);
    const reviewsHTML = createReviewsHTML(reviews);

    const modal = document.getElementById("movie-modal");
    const modalBody = document.getElementById("modal-body");

    const poster = data.poster_path
        ? `${IMAGE_BASE_URL}${data.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    const heartIcon = isFavorite(movieId) ? "❤️" : "🤍";

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

                <p><strong>🌍 Language:</strong> ${data.original_language.toUpperCase()}</p>

                <p><strong>⏳ Runtime:</strong> ${data.runtime} min</p>

                <p><strong>🎭 Genres:</strong> ${
                    data.genres.map(g => g.name).join(", ")
                }</p>

                <p>${data.overview}</p>

                <button class="fav-detail-btn">
                    ${heartIcon} Add to Favorites
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
                ${castHTML}

                <hr>

                <h3>⭐ Reviews</h3>
                ${reviewsHTML}

            </div>
        </div>
    `;

    modal.style.display = "flex";

    // =========================
    // CLOSE BUTTON FIX
    // =========================
    const closeBtn = modal.querySelector(".close-btn");

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // =========================
    // CLICK OUTSIDE CLOSE
    // =========================
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // =========================
    // FAVORITES BUTTON INSIDE MODAL
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

}