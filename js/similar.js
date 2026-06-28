import { API_KEY, fetchData } from "./api.js";

export async function getSimilarMovies(movieId) {

    const data = await fetchData(
        `/movie/${movieId}/similar?api_key=${API_KEY}`
    );

    if (!data || !data.results) return [];

    return data.results;
}