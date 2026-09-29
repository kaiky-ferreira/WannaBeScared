import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import InputBox from "./InputBox";
import MovieModal from "./movie/MovieModal";
import type { Movie } from "../types/movie";
import { searchMovies } from "../services/searchService";
import loadingGif from "../assets/Loading.gif";

const Navbar = () => {
  const { pathname } = useLocation();
  const showSearch = pathname === "/movies";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    if (results.length > 0) {
      setSelectedMovie(results[0]);
      setIsOpen(false);
      return;
    }
  };

  const handleSearchFocus = () => {
    if (query.trim()) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const term = query.trim();

    if (!term) {
      const resetId = window.setTimeout(() => {
        setResults([]);
        setIsOpen(false);
        setLoading(false);
      }, 0);

      return () => {
        window.clearTimeout(resetId);
      };
    }

    let cancelled = false;

    const timeoutId = window.setTimeout(() => {
      const loadMovies = async () => {
        setLoading(true);
        setIsOpen(true);

        try {
          const data = await searchMovies(term);

          if (cancelled) {
            return;
          }

          const normalizedTerm = term.toLowerCase();
          const prioritizedMovies = [...data.movies].sort(
            (firstMovie, secondMovie) => {
              const firstTitle = firstMovie.title.toLowerCase();
              const secondTitle = secondMovie.title.toLowerCase();
              const firstRank =
                firstTitle === normalizedTerm
                  ? 0
                  : firstTitle.startsWith(normalizedTerm)
                    ? 1
                    : 2;
              const secondRank =
                secondTitle === normalizedTerm
                  ? 0
                  : secondTitle.startsWith(normalizedTerm)
                    ? 1
                    : 2;
              return firstRank - secondRank;
            },
          );

          setResults(prioritizedMovies.slice(0, 5));
          setIsOpen(true);
        } catch {
          if (!cancelled) {
            setResults([]);
            setIsOpen(true);
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

      loadMovies();
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-palette-wine bg-palette-dark px-3 py-2 shadow-[0_2px_0_#120408,0_5px_0_rgba(18,4,8,0.8)] sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex min-w-0 max-w-full gap-1 overflow-x-auto font-mono text-sm sm:gap-2 sm:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block border border-palette-wine px-3 py-2 font-mono text-sm font-bold tracking-[0.08em] text-palette-bone [text-shadow:1px_1px_#120408] sm:text-base ${isActive ? "bg-palette-wine" : "bg-gradient-to-b from-palette-bruise to-palette-dark hover:bg-palette-wine"}`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `block border border-palette-wine px-3 py-2 font-mono text-sm font-bold tracking-[0.08em] text-palette-bone [text-shadow:1px_1px_#120408] sm:text-base ${isActive ? "bg-palette-wine" : "bg-gradient-to-b from-palette-bruise to-palette-dark hover:bg-palette-wine"}`
            }
          >
            MOVIES
          </NavLink>
          <NavLink
            to="/games"
            className={({ isActive }) =>
              `block border border-palette-wine px-3 py-2 font-mono text-sm font-bold tracking-[0.08em] text-palette-bone [text-shadow:1px_1px_#120408] sm:text-base ${isActive ? "bg-palette-wine" : "bg-gradient-to-b from-palette-bruise to-palette-dark hover:bg-palette-wine"}`
            }
          >
            GAMES
          </NavLink>
        </div>
        {showSearch && (
          <div className="relative w-full min-w-0 sm:col-start-3 sm:w-[min(34vw,20rem)] sm:justify-self-end">
            <div className="relative w-full">
              <InputBox
                value={query}
                onValueChange={setQuery}
                onSubmit={handleSearch}
                onFocus={handleSearchFocus}
              />

              {isOpen && query.trim() && (
                <div className="absolute left-0 right-0 top-full mt-1 overflow-hidden border-2 border-palette-wine bg-palette-dark shadow-[4px_4px_0_#120408]">
                  {loading && (
                    <div className="flex items-center gap-3 px-4 py-3 text-sm text-palette-muted">
                      <img
                        src={loadingGif}
                        alt="Searching movies"
                        className="h-7 w-7"
                      />
                      <span>Searching...</span>
                    </div>
                  )}

                  {!loading && results.length === 0 && (
                    <div className="px-4 py-3 text-sm text-palette-muted">
                      No results found
                    </div>
                  )}

                  {!loading &&
                    results.map((movie) => (
                      <button
                        key={movie.id}
                        type="button"
                        className="flex w-full items-center gap-3 border-b border-dotted border-palette-wine px-4 py-3 text-left text-palette-bone hover:bg-palette-wine"
                        onClick={() => {
                          setSelectedMovie(movie);
                          setIsOpen(false);
                        }}
                      >
                        <span className="text-palette-bone">{movie.title}</span>
                        {movie.release_date && (
                          <span className="text-sm text-palette-muted">
                            {movie.release_date.slice(0, 4)}
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;
