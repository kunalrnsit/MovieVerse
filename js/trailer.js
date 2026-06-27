// ======================================
// trailer.js
// ======================================

import { API_KEY, fetchData } from "./api.js";

export async function getTrailer(movieId){

    const data = await fetchData(
        `/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    if(!data || !data.results) return "";

    const trailer = data.results.find(video =>

        video.site === "YouTube" &&
        video.type === "Trailer"

    );

    if(trailer){

        return `https://www.youtube.com/embed/${trailer.key}`;

    }

    return "";

}