import { loadHeaderAndFooter } from "./loadPartial";
import { TMDB } from "./TMDB.mjs";
import {
  displayMovies,
  getLocalStorage,
  imgBase,
  setLocalStorage,
} from "./utils";

loadHeaderAndFooter();

if (!getLocalStorage("watchlist")) {
  setLocalStorage("watchlist", []);
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdb = new TMDB(apiKey);
const results = await tmdb.getTrendingMovies();

const genresArray = await tmdb.getGenres();
const genreMap = Object.fromEntries(genresArray.map((g) => [g.id, g.name]));

const displayRandomMovie = async (movies) => {
  if (!movies || movies.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  const genreNames = randomMovie.genre_ids.map((id) => genreMap[id]);

  const randomContainer = document.getElementById("random-movie");
  const img = randomContainer.querySelector("img");
  const h1 = randomContainer.querySelector("h1");
  const p = randomContainer.querySelector("p");

  const releaseYear = randomMovie.release_date
    ? new Date(randomMovie.release_date).getFullYear()
    : "N/A";

  img.src = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
  h1.textContent = randomMovie.title;
  p.innerHTML = `${releaseYear} | ${genreNames.join(
    ", "
  )} | <span class="flex items-center gap-1"><img src="${imgBase}assets/star.svg" class="size-5" alt="Rating" /> ${randomMovie.vote_average.toFixed(
    1
  )}</span>`;

  const seeMoreBtn = randomContainer.querySelector("button");
  seeMoreBtn.onclick = () => {
    window.location.href = `movie/?id=${randomMovie.id}`;
  };
};

displayMovies(results, "template", genreMap);
displayRandomMovie(results);
setInterval(() => {
  const randomContainer = document.getElementById("random-movie");
  randomContainer.querySelector("#animation").style.animationPlayState =
    "paused";
  randomContainer.querySelector("img").style.animationPlayState = "paused";

  displayRandomMovie(results);

  randomContainer.querySelector("img").style.animationPlayState = "running";
  randomContainer.querySelector("#animation").style.animationPlayState =
    "running";
}, 3000);
