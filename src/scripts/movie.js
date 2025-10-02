import { loadHeaderAndFooter } from "./loadPartial";
import { TMDB } from "./TMDB.mjs";
import { formatRuntime, getParam } from "./utils";
import { YouTube } from "./YouTube.mjs";

loadHeaderAndFooter();

const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = new TMDB(tmdbApiKey);

const id = getParam("id");
const movieDetails = await tmdb.getMovieDetails(id);
console.log(movieDetails);

const youtube = new YouTube(youtubeApiKey, movieDetails.title);
const trailerUrl = await youtube.getTrailer();

const displayMovieDetails = (movie, trailerUrl) => {
  const iframe = document.querySelector("iframe");
  iframe.src = trailerUrl;

  const hero = document.getElementById("hero");

  const banner = hero.querySelector("img");
  const title = hero.querySelector("h1");
  const rating = hero.querySelector("#rating");
  const genres = hero.querySelector("#genres");
  const date = hero.querySelector("#date");
  const runtime = hero.querySelector("#runtime");

  banner.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  title.textContent = `${movie.title} (${movie.release_date.split("-")[0]})`;
  rating.innerHTML += `${movie.vote_average.toFixed(1)}`;
  genres.textContent = movie.genres.map((genre) => genre.name).join(" | ");
  date.textContent = `Released: ${new Date(
    movie.release_date
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
  runtime.textContent = `Runtime: ${formatRuntime(movie.runtime)}`;

  const details = document.getElementById("details");

  const overview = details.querySelector("#overview");
  const companies = details.querySelector("#companies");
  const budget = details.querySelector("#budget");
  const revenue = details.querySelector("#revenue");
  const originCountry = details.querySelector("#origin-country");

  overview.textContent = movie.overview;
  companies.innerHTML = movie.production_companies
    .map((company) => `<li class="list-disc ">${company.name}</li>`)
    .join("");
  budget.textContent = movie.budget.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  revenue.textContent = movie.revenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  originCountry.textContent = movie.origin_country.join(" | ");
};

displayMovieDetails(movieDetails, trailerUrl);
