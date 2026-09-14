import type { MovieResponse } from "../types/movie";
import { API_URL } from "./api";

export async function getMovies(
    page: number,
    minimumScore: number,
    subgenre: string,
    keyword: string,
    sortBy: string,
): Promise<MovieResponse> {
    const searchParams = new URLSearchParams({
    page: String(page),
    minimum_score: String(minimumScore),
    sort_by: sortBy,
});

    if (subgenre) {
    searchParams.set("subgenre", subgenre);
}

    if (keyword) {
    searchParams.set("keyword", keyword);
}
    const response = await fetch(`${API_URL}/movies?${searchParams.toString()}`);

    if (!response.ok) {
        throw new Error ("Failed to fetch movies")
    }
    return response.json()
}