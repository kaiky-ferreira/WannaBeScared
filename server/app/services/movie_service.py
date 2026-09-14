import httpx
from collections.abc import Sequence

from fastapi import HTTPException

from ..core.settings import TMDB_KEY, TMDB_BASE_URL
from app.data.subgenres import get_keywords, normalize_subgenre


async def _resolve_keyword_ids(
    client: httpx.AsyncClient,
    keyword_queries: Sequence[str],
) -> list[int]:
    keyword_ids: list[int] = []

    for query in keyword_queries:
        response = await client.get(
            "/search/keyword",
            params={
                "api_key": TMDB_KEY,
                "query": query,
                "page": 1,
            },
        )

        if response.status_code >= 400:
            continue

        results = response.json().get("results", [])
        if not results:
            continue

        exact_match = next(
            (
                result
                for result in results
                if result.get("name", "").strip().lower() == query.strip().lower()
            ),
            None,
        )
        if exact_match:
            keyword_ids.append(exact_match["id"])

    return keyword_ids


async def get_movies(
    minimum_score: int = 5,
    page: int = 1,
    subgenre: str | None = None,
    keyword: str | None = None,
    sort_by: str = "popular",
):
    if TMDB_KEY is None:
        raise HTTPException(
            status_code=500,
            detail="TMDB_KEY not found",
        )

    params = {
        "api_key": TMDB_KEY,
        "language": "en-US",
        "sort_by": {
            "popular": "vote_average.desc",
            "newest": "primary_release_date.desc",
            "oldest": "primary_release_date.asc",
            "title": "original_title.asc",
        }.get(sort_by, "vote_average.desc"),
        "vote_average.gte": minimum_score,
        "with_genres": 27,
        "without_genres": 10402,
        "with_runtime.gte": 60,
        "vote_count.gte": 100,
        "page": page,
    }

    keyword_queries: list[str] = []

    if subgenre:
        normalized_subgenre = normalize_subgenre(subgenre)
        subgenre_keywords = get_keywords(normalized_subgenre)

        if subgenre_keywords is None:
            raise HTTPException(
                status_code=400,
                detail="Invalid subgenre",
            )
        if normalized_subgenre == "classics":
            params["primary_release_date.lte"] = "1999-12-31"
            if sort_by == "popular":
                params["sort_by"] = "vote_average.desc"

        keyword_queries.extend(subgenre_keywords)

    if keyword:
        keyword_queries.append(keyword.strip())


    async with httpx.AsyncClient(base_url=TMDB_BASE_URL) as client:
        if keyword_queries:
            keyword_ids = await _resolve_keyword_ids(client, keyword_queries)

            if keyword_ids:
                params["with_keywords"] = str(keyword_ids[0])
            else:
                return {
                    "movies": [],
                    "page": page,
                    "total_pages": 1,
                    "filters": {
                        "minimum_score": minimum_score,
                        "page": page,
                        "subgenre": subgenre,
                        "keyword": keyword.strip() if keyword else None,
                    },
                }

        response = await client.get(
            "/discover/movie",
            params=params,
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

    return {
        "movies": data.get("results", []),
        "page": data.get("page", page),
        "total_pages": data.get("total_pages", 1),
        "filters": {
            "minimum_score": minimum_score,
            "page": page,
            "subgenre": subgenre,
            "keyword": keyword.strip() if keyword else None,
        },
    }