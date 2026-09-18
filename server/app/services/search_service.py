import httpx

from fastapi import HTTPException

from ..core.settings import TMDB_BASE_URL, TMDB_KEY


async def search_movies(query: str, page: int = 1):
	if TMDB_KEY is None:
		raise HTTPException(
			status_code=500,
			detail="TMDB_KEY not found",
		)

	cleaned_query = query.strip()
	if not cleaned_query:
		return {
			"movies": [],
			"page": page,
			"total_pages": 1,
			"query": cleaned_query,
		}

	async with httpx.AsyncClient(base_url=TMDB_BASE_URL) as client:
		response = await client.get(
			"/search/movie",
			params={
				"api_key": TMDB_KEY,
				"language": "en-US",
				"query": cleaned_query,
				"page": page,
				"include_adult": False,
			},
		)

		if response.status_code >= 400:
			raise HTTPException(
				status_code=502,
				detail={
					"message": "Error trying to consult TMDB",
					"status_code": response.status_code,
					"response": response.text,
				},
			)

		data = response.json()

	horror_movies = [
		movie for movie in data.get("results", []) if 27 in movie.get("genre_ids", [])
	]

	return {
		"movies": horror_movies,
		"page": data.get("page", page),
		"total_pages": data.get("total_pages", 1),
		"query": cleaned_query,
	}
