import type { Movie } from "../../types/movie";
import { SkullIcon } from "../../assets/SkullIcon";

interface RatingProps {
  movie: Movie;
}

export default function Rate({ movie }: RatingProps) {
  const totalSkulls = 5;
  const scoreOutOfFive = (movie.vote_average ?? 0) / 2;
  const roundedRate = Math.min(
    totalSkulls,
    Math.max(0, Math.round(scoreOutOfFive * 2) / 2),
  );
  const filledSkulls = Math.floor(roundedRate);
  const hasHalfSkull = roundedRate % 1 !== 0;
  const scoreLabel =
    movie.vote_average === null
      ? "No rating"
      : `${scoreOutOfFive.toFixed(1)} out of 5`;

  return (
    <div
      className="ml-auto flex min-w-[6.7rem] shrink-0 items-center justify-end gap-1.5"
      aria-label={`Rating: ${scoreLabel}`}
      title={scoreLabel}
    >
      {Array.from({ length: totalSkulls }, (_, index) => {
        const isFilled = index < filledSkulls;
        const isHalf = !isFilled && hasHalfSkull && index === filledSkulls;

        return (
          <span
            key={index}
            className="relative h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
          >
            <SkullIcon className="absolute inset-0 h-full w-full text-palette-wine" />
            {(isFilled || isHalf) && (
              <span
                className={`absolute inset-y-0 left-0 overflow-hidden ${isHalf ? "w-1/2" : "w-full"}`}
              >
                <SkullIcon className="h-full w-3 max-w-none text-palette-bone sm:w-3.5" />
              </span>
            )}
          </span>
        );
      })}
      <span className="ml-0.5 text-[0.65rem] font-semibold tabular-nums text-palette-bone sm:text-xs">
        {movie.vote_average === null ? "--" : `${scoreOutOfFive.toFixed(1)}/5`}
      </span>
    </div>
  );
}
