import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center">
      <div className="flex w-full max-w-6xl flex-1 items-center px-4 sm:px-6">
        <Hero />
      </div>
      <div className="w-full max-w-6xl">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
