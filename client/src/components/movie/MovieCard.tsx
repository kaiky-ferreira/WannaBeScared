import type { Movie } from "../../types/movie";
import Rating from "./Rating";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "/placeholder.jpg";

  const releaseDate = movie.release_date;
  const releaseYear = releaseDate?.slice(0, 4);

  return (
    <button
      type="button"
      className="flex h-full min-h-[25rem] flex-col overflow-hidden border-2 border-palette-wine bg-palette-dark text-left shadow-[3px_3px_0_#120408] focus:outline-none focus:ring-2 focus:ring-palette-main hover:border-palette-wine"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden bg-palette-black">
        <img
          src={posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex min-h-[8.5rem] flex-1 flex-col gap-2 px-3 py-3">
        <h2 className="line-clamp-2 min-h-[3rem] font-serif text-base font-semibold leading-6 text-palette-bone">
          {movie.title}
        </h2>
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-palette-main/30 pt-2 text-xs text-palette-muted">
          <span className="shrink-0">{releaseYear ?? "Unknown year"}</span>
          <Rating movie={movie} />
        </div>
      </div>
    </button>
  );
}
