import GamesAll from "@/components/layout/GamesAll";
import HeroSection from "@/components/layout/HeroSection";
import React from "react";
import BlogPage from "./blog/page";

const HomePage = () => {
  return (
    <div className="mt-8 mb-6">
      <HeroSection />
      <GamesAll />
      <BlogPage />
    </div>
  );
};

export default HomePage;
