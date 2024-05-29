import HeroSection from "@/components/layout/HeroSection";
import BlogPage from "./blog/page";
import GamesPage from "./games/page";

const HomePage = () => {
  return (
    <div className="mt-8 mb-6">
      <HeroSection />
      <GamesPage />
      <BlogPage />
    </div>
  );
};

export default HomePage;
