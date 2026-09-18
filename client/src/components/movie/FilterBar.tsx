type FilterBarProps = {
  minimumScore: number;
  onMinimumScoreChange: (score: number) => void;
  subgenre: string;
  onSubgenreChange: (subgenre: string) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
  onReset: () => void;
};

export default function FilterBar({
  minimumScore,
  onMinimumScoreChange,
  subgenre,
  onSubgenreChange,
  sortBy,
  onSortByChange,
  onReset,
}: FilterBarProps) {
  return (
    <aside className="h-fit border-2 border-palette-wine bg-palette-dark p-4 shadow-[3px_3px_0_#120408] lg:sticky lg:top-28">
      <h2 className="mb-5 border-b border-palette-main/30 pb-3 font-display text-2xl text-palette-main">
        FILTERS
      </h2>
      <div className="space-y-4">
        <label
          className="block text-xs uppercase tracking-widest text-palette-muted"
          htmlFor="minimum-score"
        >
          Minimum score
          <select
            id="minimum-score"
            value={minimumScore}
            onChange={(event) =>
              onMinimumScoreChange(Number(event.target.value))
            }
            className="mt-2 w-full border-2 border-[inset_#57031A] bg-black px-3 py-2 text-sm normal-case tracking-normal text-palette-bone outline-none transition [border-style:inset] hover:border-palette-main focus:border-palette-main focus:ring-2 focus:ring-palette-main/20"
          >
            <option value="0">Any rating</option>
            <option value="1">1 skull</option>
            <option value="2">2 skulls</option>
            <option value="3">3 skulls</option>
            <option value="4">4 skulls</option>
            <option value="5">5 skulls</option>
          </select>
        </label>
        <label
          className="block text-xs uppercase tracking-widest text-palette-muted"
          htmlFor="genre-filter"
        >
          Genre
          <select
            id="genre-filter"
            value={subgenre}
            onChange={(event) => onSubgenreChange(event.target.value)}
            className="mt-2 w-full border-2 border-[inset_#57031A] bg-black px-3 py-2 text-sm normal-case tracking-normal text-palette-bone outline-none transition [border-style:inset] hover:border-palette-main focus:border-palette-main focus:ring-2 focus:ring-palette-main/20"
          >
            <option value="">All genres</option>
            <option value="classics">Classics</option>
            <option value="slasher">Slasher</option>
            <option value="psychological">Psychological</option>
            <option value="found-footage">Found Footage</option>
            <option value="paranormal">Paranormal</option>
            <option value="gore">Gore</option>
          </select>
        </label>
        <label
          className="block text-xs uppercase tracking-widest text-palette-muted"
          htmlFor="sort-filter"
        >
          Sort by
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
            className="mt-2 w-full border-2 border-[inset_#57031A] bg-black px-3 py-2 text-sm normal-case tracking-normal text-palette-bone outline-none transition [border-style:inset] hover:border-palette-main focus:border-palette-main focus:ring-2 focus:ring-palette-main/20"
          >
            <option value="popular">Highest rated</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A-Z</option>
          </select>
        </label>
        <button
          type="button"
          onClick={onReset}
          className="w-full border-2 border-[outset_#78001B] bg-palette-wine px-3 py-2 font-mono text-xs uppercase tracking-widest text-palette-bone [border-style:outset] hover:bg-palette-main hover:text-palette-black"
        >
          Clear filters
        </button>
      </div>
    </aside>
  );
}
