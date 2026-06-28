
// =========================================
// favorites.js (IMPROVED VERSION)
// =========================================

// =========================================
// GET FAVORITES
// =========================================

export function loadFavorites() {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

// =========================================
// SAVE FAVORITES
// =========================================

export function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// =========================================
// CHECK IF FAVORITE
// =========================================

export function isFavorite(movieId) {
    const favorites = loadFavorites();
    return favorites.some(movie => movie.id === movieId);
}

// =========================================
// ADD FAVORITE
// =========================================

export function addToFavorites(movie) {

    const favorites = loadFavorites();

    if (!isFavorite(movie.id)) {
        favorites.push(movie);
        saveFavorites(favorites);

        // UX IMPROVEMENT (NO ALERT)
        showToast(`${movie.title} added to favorites ❤️`);
    }
}

// =========================================
// REMOVE FAVORITE
// =========================================

export function removeFromFavorites(movieId) {

    let favorites = loadFavorites();

    const removedMovie = favorites.find(m => m.id === movieId);

    favorites = favorites.filter(movie => movie.id !== movieId);

    saveFavorites(favorites);

    // UX IMPROVEMENT
    if (removedMovie) {
        showToast(`${removedMovie.title} removed from favorites`);
    }
}

// =========================================
// TOGGLE FAVORITE
// =========================================

export function toggleFavorite(movie) {

    if (isFavorite(movie.id)) {
        removeFromFavorites(movie.id);
    } else {
        addToFavorites(movie);
    }
}

// =========================================
// UX TOAST (REPLACES ALERT)
// =========================================

function showToast(message) {

    let toast = document.createElement("div");

    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}