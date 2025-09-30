import { loadHeaderAndFooter } from "./loadPartial";
import { TMDB } from "./tmdb.mjs";

loadHeaderAndFooter();

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdb = new TMDB(apiKey);
const results = await tmdb.getTrendingMovies();
console.log(results);

const displayResults = async (movies) => {
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

    container.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`;
    h1.textContent = movie.title;

    moviesContainer.appendChild(clone);
  });
};

displayResults(results);
