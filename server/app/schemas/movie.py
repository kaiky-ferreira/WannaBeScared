from pydantic import BaseModel

class Movie(BaseModel):
    id: int
    title: str
    overview: str | None = None
    poster_path: str | None = None
    backdrop_path: str | None = None
    vote_average: float | None = None
    release_date: str | None = None

class MovieFilters(BaseModel):
    minimum_score: int
    page: int
    subgenre: str | None
    keyword: str | None

class MovieResponse(BaseModel):
    movies: list[Movie]
    page: int
    total_pages: int
    filters: MovieFilters
    
