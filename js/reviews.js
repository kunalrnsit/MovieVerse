// =========================================
// reviews.js
// =========================================

import { API_KEY, fetchData } from "./api.js";

export async function getReviews(movieId) {

    const data = await fetchData(
        `/movie/${movieId}/reviews?api_key=${API_KEY}`
    );

    if (!data || !data.results) {
        return [];
    }

    // Show only first 5 reviews
    return data.results.slice(0, 5);
}

export function createReviewsHTML(reviews) {

    if (reviews.length === 0) {
        return "<p>No Reviews Available.</p>";
    }

    let html = `<div class="reviews-container">`;

    reviews.forEach(review => {

        html += `

            <div class="review-card">

                <h4>${review.author}</h4>

                <p>${review.content.substring(0,300)}...</p>

            </div>

        `;

    });

    html += "</div>";

    return html;
}