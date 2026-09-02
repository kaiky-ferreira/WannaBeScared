from fastapi import APIRouter, Query

from app.schemas.movie import MovieResponse

from ..services.search_service import search_movies

router = APIRouter(
	prefix="/search",
	tags=["search"],
)


@router.get("", response_model=MovieResponse)
async def search_movies_route(
	query: str = Query(..., min_length=1),
	page: int = Query(1, ge=1),
):
	result = await search_movies(query=query, page=page)
	return {
		"movies": result["movies"],
		"page": result["page"],
		"total_pages": result["total_pages"],
		"filters": {
			"minimum_score": 0,
			"page": result["page"],
			"subgenre": None,
			"keyword": result["query"],
		},
	}
