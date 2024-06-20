import HeroSection from "@/components/layout/HeroSection";
import GamesAll from "@/components/layout/GamesAll";
import { Suspense } from "react";
import RecentBlogs from "@/components/layout/RecentBlogs";

const HomePage = () => {
  return (
    <div className="mt-8 mb-6">
      <HeroSection />
      <div className="mt-20">
        <GamesAll />
      </div>
      <Suspense fallback="">
      <div className="mt-20">
        <RecentBlogs />
      </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
