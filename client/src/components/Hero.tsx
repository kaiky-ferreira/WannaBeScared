import ExploreBtn from "./ExploreBtn";

const Hero = () => {
  return (
    <section className="relative flex min-h-[31rem] w-full flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-display text-[clamp(4rem,14vw,7.5rem)] leading-[0.95] text-palette-bone [text-shadow:4px_4px_0_#290610]">
        Wanna be Scared?
      </h1>
      <p className="max-w-[34rem] font-serif text-[1.05rem] text-palette-bone mt-5 ">
        An horror media recommendation site.
      </p>
      <div className="my-7 h-[5px] w-[min(20rem,70%)] border-y border-palette-wine" />
      <ExploreBtn />
    </section>
  );
};

export default Hero;
