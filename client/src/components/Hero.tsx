import ExploreBtn from "./ExploreBtn";

const Hero = () => {
  return (
    <section className="relative flex min-h-[31rem] w-full flex-col items-center justify-center px-4 py-16 text-center before:absolute before:left-0 before:top-1/2 before:h-px before:w-[18%] before:bg-palette-wine before:shadow-[0_3px_0_#3D0818] before:content-[''] after:absolute after:right-0 after:top-1/2 after:h-px after:w-[18%] after:bg-palette-wine after:shadow-[0_3px_0_#3D0818] after:content-['']">
      <h1 className="font-display text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.95] text-palette-bone [text-shadow:4px_4px_0_#290610]">
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
