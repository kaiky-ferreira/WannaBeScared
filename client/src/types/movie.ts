export interface Movie {
    id: number
    title: string
    overview: string | null
    poster_path: string | null
    backdrop_path: string | null
    vote_average: number | null
    release_date: string | null
}

export interface MovieFilters{
    minimum_score: number
    page: number
    subgenre: string | null
    keyword: string | null
}

export interface MovieResponse{
    movies: Movie[]
    page: number
    total_pages: number
    filters: MovieFilters
}
    