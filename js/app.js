import { loadTrendingMovies, setupCategories } from "./movies.js";
import { setupSearch } from "./search.js";
import { setupFilters } from "./filters.js";

document.addEventListener("DOMContentLoaded", () => {

    loadTrendingMovies();

    setupSearch();

    setupFilters();

    setupCategories();

});