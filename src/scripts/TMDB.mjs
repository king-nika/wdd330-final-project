import { showError } from "./utils";

export class TMDB {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.themoviedb.org/3";
    this.imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  }

  async getTrendingMovies() {
    try {
      const url = `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        showError("Failed to fetch trending movies.");
        return [];
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      showError("Failed to load trending movies.");
      return [];
    }
  }

  async getGenres() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`
      );
      if (!res.ok) {
        showError("Failed to fetch genres.");
        return [];
      }

      const data = await res.json();
      return data.genres;
    } catch (error) {
      console.error("Error fetching genres:", error);
      showError("Failed to load genres.");
      return [];
    }
  }

  async getMovieDetails(id) {
    try {
      const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`;
      const response = await fetch(url);
      if (!response.ok) {
        showError("Failed to fetch movie details.");
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      showError("Failed to load movie details.");
      return null;
    }
  }
}
