import { loadHeaderAndFooter } from "./loadPartial";
import { TMDB } from "./TMDB.mjs";
import { displayMoviesWatchlist, getLocalStorage } from "./utils";

loadHeaderAndFooter();

const watchlist = getLocalStorage("watchlist");
const moviesContainer = document.getElementById("movies-container");
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = new TMDB(apiKey);

if (!watchlist || watchlist.length === 0) {
  moviesContainer.classList.remove("grid");
  moviesContainer.innerHTML =
    "<p class='text-center text-gray-400'>Your watchlist is empty.</p>";
} else {
  moviesContainer.classList.add("grid");

  const movies = await tmdb.getMoviesById(watchlist);
  displayMoviesWatchlist(movies, "template");
}
