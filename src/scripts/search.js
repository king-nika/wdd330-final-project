import { loadHeaderAndFooter } from "./loadPartial.js";
import { TMDB } from "./TMDB.mjs";
import { debounce, displayMovies } from "./utils.js";

loadHeaderAndFooter();

const searchInput = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies-container");

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdb = new TMDB(apiKey);

const genresArray = await tmdb.getGenres();
const genreMap = Object.fromEntries(genresArray.map((g) => [g.id, g.name]));

searchInput.addEventListener(
  "input",
  debounce(async () => {
    const query = searchInput.value.trim();
    moviesContainer.innerHTML = "";

    if (query.length === 0) {
      moviesContainer.classList.remove("grid");
      moviesContainer.innerHTML =
        "<p class='text-center text-gray-400 my-8'>Please enter a search term.</p>";
      return;
    }

    moviesContainer.classList.add("grid");
    const movies = await tmdb.searchMovies(query);
    displayMovies(movies, "template", genreMap);
  }, 500)
);
