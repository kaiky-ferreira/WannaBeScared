import { useEffect, useState, useRef } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import MovieCard from "../components/movie/MovieCard";
import FilterBar from "../components/movie/FilterBar";
import MovieModal from "../components/movie/MovieModal";
import { useSearchParams } from "react-router-dom";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSubgenre = searchParams.get("subgenre");
  const urlSort = searchParams.get("sort");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [minimumScore, setMinimumScore] = useState(1);
  const [subgenre, setSubgenre] = useState(urlSubgenre ?? "");
  const [sortBy, setSortBy] = useState(urlSort ?? "popular");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const requestIdRef = useRef(0);
  const urlKeyword = searchParams.get("keyword");
  const [keyword, setKeyword] = useState(urlKeyword ?? "");

  useEffect(() => {
    if ((urlKeyword ?? "") !== keyword) {
      const syncKeywordId = window.setTimeout(() => {
        setKeyword(urlKeyword ?? "");
      }, 0);

      return () => {
        window.clearTimeout(syncKeywordId);
      };
    }
  }, [urlKeyword, keyword]);

  useEffect(() => {
    if ((urlSubgenre ?? "") !== subgenre) {
      const syncSubgenreId = window.setTimeout(() => {
        setSubgenre(urlSubgenre ?? "");
      }, 0);

      return () => {
        window.clearTimeout(syncSubgenreId);
      };
    }
  }, [urlSubgenre, subgenre]);

  useEffect(() => {
    const validSorts = ["popular", "newest", "oldest", "title"];
    if (urlSort && validSorts.includes(urlSort) && urlSort !== sortBy) {
      const syncSortId = window.setTimeout(() => {
        setSortBy(urlSort);
      }, 0);

      return () => {
        window.clearTimeout(syncSortId);
      };
    }
  }, [urlSort, sortBy]);

  useEffect(() => {
    const loadMovies = async () => {
      const requestId = ++requestIdRef.current;
      setLoading(true);
      try {
        const data = await getMovies(
          page,
          minimumScore,
          subgenre,
          keyword,
          sortBy,
        );

        if (requestId !== requestIdRef.current) {
          return;
        }

        if (page === 1) {
          setMovies(data.movies);
        } else {
          setMovies((previousMovies) => [...previousMovies, ...data.movies]);
        }
        setHasMore(data.page < data.total_pages);
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    };

    loadMovies();
  }, [page, minimumScore, subgenre, keyword, sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setPage((previousPage) => previousPage + 1);
      }
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading]);

  useEffect(() => {
    const resetId = window.setTimeout(() => {
      setMovies([]);
      setPage(1);
    }, 0);

    return () => {
      window.clearTimeout(resetId);
    };
  }, [minimumScore, subgenre, keyword, sortBy]);

  const resetFilters = () => {
    setMinimumScore(0);
    setSubgenre("");
    setSortBy("popular");
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.delete("subgenre");
      nextParams.delete("sort");
      return nextParams;
    });
  };

  const handleSubgenreChange = (nextSubgenre: string) => {
    setSubgenre(nextSubgenre);
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      if (nextSubgenre) {
        nextParams.set("subgenre", nextSubgenre);
      } else {
        nextParams.delete("subgenre");
      }
      return nextParams;
    });
  };

  const handleSortChange = (nextSort: string) => {
    setSortBy(nextSort);
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      if (nextSort === "popular") {
        nextParams.delete("sort");
      } else {
        nextParams.set("sort", nextSort);
      }
      return nextParams;
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6 md:pt-28">
      <div className="mb-6 border border-palette-wine border-l-[5px] border-l-palette-wine bg-palette-dark px-5 py-4 shadow-[3px_3px_0_#120408]">
        <h1 className="font-display text-4xl text-palette-bone sm:text-6xl">
          MOVIES
        </h1>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <FilterBar
          minimumScore={minimumScore}
          onMinimumScoreChange={setMinimumScore}
          subgenre={subgenre}
          onSubgenreChange={handleSubgenreChange}
          sortBy={sortBy}
          onSortByChange={handleSortChange}
          onReset={resetFilters}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      </div>

      <div ref={loadMoreRef} />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
