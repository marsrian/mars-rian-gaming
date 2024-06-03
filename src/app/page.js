import HeroSection from "@/components/layout/HeroSection";
import BlogPage from "./blog/page";
import GamesPage from "./games/page";

const HomePage = () => {
  return (
    <div className="mt-8 mb-6">
      <HeroSection />
      <div className="mt-20">
       <GamesPage />
      </div>
      <div className="mt-20">
      <BlogPage />
      </div>
    </div>
  );
};

export default HomePage;
