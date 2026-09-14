import type { MovieResponse } from "../types/movie";
import { API_URL } from "./api";

export async function searchMovies(query: string): Promise<MovieResponse> {
  const searchParams = new URLSearchParams({
    query,
    page: "1",
  });

  const response = await fetch(`${API_URL}/search?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
}