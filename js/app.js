import {
    loadTrendingMovies,
    setupCategories,
    loadFavoritesMovies,
    loadNextPage
} from "./movies.js";

import { setupSearch } from "./search.js";
import { setupFilters } from "./filters.js";
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
    window.addEventListener("scroll", () => {

        if (

            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 400

        ) {

            loadNextPage();

        }

    });

    // ===============================
    // 🌙 DARK MODE STARTS HERE
    // ===============================

    const themeToggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    updateThemeButton();

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const theme = document.body.classList.contains("dark")
                ? "dark"
                : "light";

            localStorage.setItem("theme", theme);

            updateThemeButton();

        });

    }

    function updateThemeButton() {

        if (!themeToggle) return;

        if (document.body.classList.contains("dark")) {

            themeToggle.textContent = "☀️ Light Mode";

        } else {

            themeToggle.textContent = "🌙 Dark Mode";

        }

    }

    // ===============================
    // 🌙 DARK MODE ENDS HERE
    // ===============================

});