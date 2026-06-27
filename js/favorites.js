
// =========================================
// favorites.js
// =========================================

// Get favorites from Local Storage
export function loadFavorites() {
    const favorites = localStorage.getItem("favorites");

    return favorites ? JSON.parse(favorites) : [];
}

// Save favorites
export function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Check if movie already exists
export function isFavorite(movieId) {
    const favorites = loadFavorites();

    return favorites.some(movie => movie.id === movieId);
}

// Add movie
export function addToFavorites(movie) {

    const favorites = loadFavorites();

    if (!isFavorite(movie.id)) {

        favorites.push(movie);

        saveFavorites(favorites);

        alert(`${movie.title} added to Favorites ❤️`);

    }

}

// Remove movie
export function removeFromFavorites(movieId) {

    let favorites = loadFavorites();

    favorites = favorites.filter(movie => movie.id !== movieId);

    saveFavorites(favorites);

}

// Toggle Favorite
export function toggleFavorite(movie) {

    if (isFavorite(movie.id)) {

        removeFromFavorites(movie.id);

        alert(`${movie.title} removed from Favorites`);

    } else {

        addToFavorites(movie);

    }

}