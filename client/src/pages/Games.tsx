export default function Games() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center px-4 py-28 text-center sm:px-6">
      <div className="w-full max-w-4xl">
        <h1 className="my-3 font-display text-[clamp(4rem,14vw,9rem)] leading-[0.9] text-palette-bone [text-shadow:5px_5px_0_#290610]">
          GAMES
        </h1>
        <div className="mx-auto my-6 h-1 w-[min(22rem,75%)] border-y border-palette-wine" />
        <p className="font-serif text-[1.3rem] italic text-palette-bone">
          "Got a selection of good things on sale stranger!"
        </p>
        <p className="mx-auto my-3 max-w-md font-serif leading-7 text-palette-ash">
          Our horror game shelf is being assembled. Check back soon.
        </p>
      </div>
    </section>
  );
}
