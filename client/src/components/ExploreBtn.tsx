const ExploreBtn = () => {
  return (
    <div className="inline-block border-2 border-palette-wine bg-palette-wine font-mono text-2xl font-bold tracking-[0.08em] text-palette-bone [border-style:outset] [text-shadow:1px_1px_#290610] hover:bg-[#78001B]">
      <a href="/movies" className="block px-5 py-2">
        ENTER THE ARCHIVE <span aria-hidden="true">&gt;&gt;</span>
      </a>
    </div>
  );
};

export default ExploreBtn;
