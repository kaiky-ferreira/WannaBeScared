import type { Movie } from "../../types/movie";
import Rate from "./Rating";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

function formatDate(dateString: string | null) {
  if (!dateString) return "-";
  const [year, month, day] = dateString.split("-");
  return `${month?.padStart(2, "0") ?? "00"}/${day?.padStart(2, "0") ?? "00"}/${year ?? "0000"}`;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-palette-black/90 p-4 sm:p-6"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        className="relative my-auto flex max-h-[92vh] w-full max-w-4xl flex-col gap-5 overflow-y-auto border-[3px] border-double border-palette-wine bg-palette-dark p-5 shadow-[8px_8px_0_#120408,inset_0_0_0_1px_#3D0818] sm:p-7 md:flex-row md:gap-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close movie details"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-palette-wine bg-palette-wine text-lg font-semibold text-palette-main [border-style:outset] hover:bg-[#78001B] sm:right-4 sm:top-4"
        >
          ×
        </button>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="mx-auto aspect-[2/3] w-40 shrink-0 border-[3px] border-palette-bruise object-cover shadow-[4px_4px_0_#120408] sm:w-52 md:mx-0 md:w-64"
        />
        <div className="flex min-w-0 flex-col gap-4 font-serif text-[1.05rem] text-palette-ash">
          <h1
            id="movie-modal-title"
            className="pr-10 font-display text-4xl leading-tight text-palette-bone [text-shadow:2px_2px_0_#290610] sm:text-5xl"
          >
            {movie.title}
          </h1>
          <Rate movie={movie} />
          <p className="text-sm text-palette-ash">
            Released {formatDate(movie.release_date)}
          </p>
          <div className="border-t border-palette-main/30 pt-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-palette-main">
              Synopsis
            </h3>
            <p className="leading-7">
              {movie.overview || "No synopsis available for this title."}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
