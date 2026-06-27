// ========================================
// cast.js
// ========================================

import { API_KEY, fetchData, IMAGE_BASE_URL } from "./api.js";

export async function getCast(movieId) {

    const data = await fetchData(
        `/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    if (!data || !data.cast) {

        return [];

    }

    return data.cast.slice(0, 10);

}

export function createCastHTML(cast) {

    if (cast.length === 0) {

        return "<p>No Cast Information Available.</p>";

    }

    let html = `<div class="cast-grid">`;

    cast.forEach(actor => {

        const image = actor.profile_path

            ? `${IMAGE_BASE_URL}${actor.profile_path}`

            : "https://via.placeholder.com/150x225?text=No+Image";

        html += `

        <div class="cast-card">

            <img src="${image}" alt="${actor.name}">

            <h4>${actor.name}</h4>

            <p>${actor.character}</p>

        </div>

        `;

    });

    html += "</div>";

    return html;

}