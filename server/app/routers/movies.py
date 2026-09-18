from fastapi import APIRouter, Query
from ..services.movie_service import get_movies
from app.schemas.movie import MovieResponse

router = APIRouter(
    prefix="/movies",
    tags=["movies"],
)

@router.get("", response_model=MovieResponse)
async def get_movies_route(
    minimum_score: int = Query(1, ge=0, le=5),
    page: int = Query(1, ge=1),
    subgenre: str | None = Query(None),
    keyword: str | None = Query(None),
    sort_by: str = Query("popular", pattern="^(popular|newest|oldest|title)$"),
    ):

        return await get_movies(
            minimum_score=minimum_score,
            page=page,
            subgenre=subgenre,
            keyword=keyword,
            sort_by=sort_by,
        )