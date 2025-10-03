// Base URL for fetching partials and other resources
export const base = import.meta.env.BASE_URL;

export const showError = (message = "Something went wrong") => {
  const errorContainer = document.createElement("div");
  errorContainer.classList.add("toast", "error");
  errorContainer.textContent = message;

  document.body.prepend(errorContainer);

  setTimeout(() => {
    errorContainer.classList.add("show");
  }, 10);

  setTimeout(() => {
    errorContainer.classList.remove("show");
    errorContainer.classList.add("hide");
  }, 3000);

  setTimeout(() => {
    errorContainer.remove();
  }, 3500);
};

export const showSuccess = (message = "Operation successful") => {
  const successContainer = document.createElement("div");
  successContainer.classList.add("toast", "success");
  successContainer.textContent = message;

  document.body.prepend(successContainer);

  setTimeout(() => {
    successContainer.classList.add("show");
  }, 10);

  setTimeout(() => {
    successContainer.classList.remove("show");
    successContainer.classList.add("hide");
  }, 3000);

  setTimeout(() => {
    successContainer.remove();
  }, 3500);
};

export const displayMovies = async (
  movies,
  templateSelector,
  genreMap,
  containerSelector
) => {
  const template = document.querySelector(templateSelector);
  const moviesContainer = document.querySelector(containerSelector);

  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

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

    container.href = `${base}movie/?id=${movie.id}`;
    container.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    h1.textContent = movie.title;

    moviesContainer.appendChild(clone);
  });
};

export const displayMoviesWatchlist = async (movies, selector) => {
  const template = document.querySelector(selector);
  const moviesContainer = document.getElementById("movies-container");

  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movies.forEach((movie) => {
    const clone = template.content.cloneNode(true);

    const h1 = clone.querySelector("h1");
    const container = clone.querySelector("#container");
    const p = clone.querySelector("p");

    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : "N/A";
    p.textContent = `${releaseYear} | ${movie.genres
      .map((genre) => genre.name)
      .join(", ")}`;

    container.href = `${base}movie/?id=${movie.id}`;
    container.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    h1.textContent = movie.title;

    moviesContainer.appendChild(clone);
  });
};

export const getParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const formatRuntime = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
