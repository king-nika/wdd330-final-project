import { showError } from "./utils";

export class YouTube {
  constructor(apiKey, query) {
    this.apiKey = apiKey;
    this.query = `${query} official trailer`;
  }

  getTrailer = async () => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        this.query
      )}&type=video&key=${this.apiKey}&maxResults=1`;
      const response = await fetch(url);
      if (!response.ok) {
        showError("Failed to fetch trailer.");
        return null;
      }

      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        showError("No trailer found.");
        return null;
      }

      const videoId = data.items[0].id.videoId;
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      showError("Failed to fetch trailer.");
      return null;
    }
  };
}
