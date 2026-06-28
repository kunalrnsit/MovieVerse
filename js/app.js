import { loadTrendingMovies, setupCategories } from "./movies.js";
import { setupSearch } from "./search.js";
import { setupFilters } from "./filters.js";
import { loadFavoritesMovies } from "./movies.js";

document.addEventListener("DOMContentLoaded", () => {

    loadTrendingMovies();
    setupSearch();
    setupFilters();
    setupCategories();

    const favBtn = document.getElementById("favorites-btn");

    if (favBtn) {
        favBtn.addEventListener("click", () => {

            loadFavoritesMovies();

            document.querySelectorAll(".category-btn")
                .forEach(btn => btn.classList.remove("active"));

            favBtn.classList.add("active");

        });
    }

});