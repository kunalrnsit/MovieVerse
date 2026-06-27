// =========================================
// modal.js
// =========================================

import {
    getReviews,
    createReviewsHTML
} from "./reviews.js";
import {
    API_KEY,
    IMAGE_BASE_URL,
    fetchData
} from "./api.js";

import { getTrailer } from "./trailer.js";
import { getCast, createCastHTML } from "./cast.js";

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

    const genres = data.genres
        .map(genre => genre.name)
        .join(", ");

    const poster = data.poster_path
        ? `${IMAGE_BASE_URL}${data.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    modalBody.innerHTML = `

        <div class="modal-container">

            <img
                class="modal-poster"
                src="${poster}"
                alt="${data.title}"
            >

            <div class="modal-info">

                <h2>${data.title}</h2>

                <p><strong>⭐ Rating:</strong> ${data.vote_average}</p>

                <p><strong>📅 Release:</strong> ${data.release_date}</p>

                <p><strong>🌍 Language:</strong> ${data.original_language.toUpperCase()}</p>

                <p><strong>⏳ Runtime:</strong> ${data.runtime} Minutes</p>

                <p><strong>🎭 Genres:</strong> ${genres}</p>

                <p><strong>🔥 Popularity:</strong> ${Math.round(data.popularity)}</p>

                <h3>Overview</h3>

                <p>${data.overview}</p>

                <hr>

                <h3>🎥 Official Trailer</h3>

                ${
                    trailerURL
                    ?
                    
                    `
                    <iframe
                        width="100%"
                        height="400"
                        src="${trailerURL}"
                        title="Movie Trailer"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                    `
                    :
                    `
                    <p>No Trailer Available.</p>
                    `
                }
                <hr>

                <h3>👨‍🎤 Top Cast</h3>

                ${castHTML}
                <hr>

                <h3>⭐ User Reviews</h3>

                ${reviewsHTML}

                <br><br>

                <button id="close-modal-btn">
                    Close
                </button>

            </div>

        </div>

    `;

    modal.style.display = "flex";

    document
        .getElementById("close-modal-btn")
        .addEventListener("click", () => {

            modal.style.display = "none";

        });

    modal.onclick = function(event){

        if(event.target === modal){

            modal.style.display = "none";

        }

    };

}