import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import HeroBackground from "../components/home/HeroBackground";
import ImageType from "../components/home/ImageType";
import Footer from "../components/layout/Footer";
import ImageGrid from "../components/ui/ImageGrid";
import { usePixabayQuery } from "../hooks/usePixabayQuery";

const HomePage = () => {
  const { data, isLoading, isError } = usePixabayQuery({
    image_type: "photo",
    order: "popular",
  });

  return (
    // Added page-fade-in for smooth loading transition
    <div className="flex flex-col min-h-screen bg-gray-50 page-fade-in">
      <header className="relative mx-2 mt-2 min-h-[26rem] overflow-hidden rounded-3xl sm:mx-4 sm:mt-4 lg:min-h-[32rem]">
        <HeroBackground />
        <Navbar />
        <Hero />
      </header>

      <main className="flex-1 w-full mx-auto max-w-7xl">
        <ImageType />
        <ImageGrid
          hits={data?.hits || []}
          isLoading={isLoading}
          isError={isError}
        />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
