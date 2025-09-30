import { loadHeaderAndFooter } from "./loadPartial";
import { TMDB } from "./tmdb.mjs";

loadHeaderAndFooter();

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdb = new TMDB(apiKey);
const results = await tmdb.getTrendingMovies();

const displayMovies = async (movies) => {
  const template = document.querySelector("template");
  const moviesContainer = document.getElementById("movies-container");

  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  const genresArray = await tmdb.getGenres();
  const genreMap = Object.fromEntries(genresArray.map((g) => [g.id, g.name]));

  movies.forEach((movie) => {
    const clone = template.content.cloneNode(true);

    const h1 = clone.querySelector("h1");
    const container = clone.querySelector("#container");
    const p = clone.querySelector("p");

    const genreNames = movie.genre_ids.map((id) => genreMap[id]);
    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : "N/A";
    p.textContent = `${releaseYear} | ${genreNames.join(", ")}`;

    container.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    h1.textContent = movie.title;

    moviesContainer.appendChild(clone);
  });
};

const displayRandomMovie = async (movies) => {
  if (!movies || movies.length === 0) {
    return;
  }

  const genresArray = await tmdb.getGenres();
  const genreMap = Object.fromEntries(genresArray.map((g) => [g.id, g.name]));

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
  )} | <span class="flex items-center gap-1"><img src="/assets/star.svg" class="size-5" alt="Rating" /> ${randomMovie.vote_average.toFixed(
    1
  )}</span>`;
};

displayMovies(results);
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
