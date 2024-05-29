import { quantico, tradeWinds } from "@/utils/fonts";
import Image from "next/image";


const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="w-full md:w-[600px] px-4 md:px-0 mb-3 md:mb-0">
        <h3 className={`${quantico.className}`}>
          🎮 Welcome to{" "}
          <span className={`${tradeWinds.className} text-md md:text-2xl font-bold text-emerald-500 ml-1`}>
            MARS RIAN GAMING 
          </span>{" "}
           🎮
        </h3>
        <p className={`${quantico.className} mt-2 text-gray-500 text-justify`}>
          Dive into immersive story-based gameplay as I take you on epic
          adventures through your favorite games! Watch my gaming videos and
          live streams on Facebook and YouTube, where I share thrilling
          gameplay, and interactive experiences. Join our
          community of gamers, enjoy the journey, and let&apos;s conquer new
          challenges together! Don&apos;t forget to like, subscribe, and hit the
          notification bell for updates on new content. Let&apos;s game on! 🚀🕹️
        </p>
      </div>
      <div className="w-full md:w-[400px] px-4 md:px-0">
        <Image
          src="/controller.jpg"
          width={400}
          height={400}
          alt="controller"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
