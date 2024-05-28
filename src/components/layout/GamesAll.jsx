import { Micro_5_Charted, Quantico } from "next/font/google";
import Link from "next/link";

async function getGameData() {
  const res = await fetch("http://localhost:3000/api/games", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const microCharted = Micro_5_Charted({
  weight: ["400"],
  subsets: ["latin"],
});

const quantico = Quantico({
  weight: ["400"],
  subsets: ["latin"],
});

const GamesAll = async () => {
  const games = await getGameData();
  return (
    <div className="mt-20">
      <h1
        className={`${microCharted.className} text-4xl font-bold text-center text-emerald-600`}
      >
        ALL GAMES WALKTHROUGH
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 px-4 md:px-0">
        {games.map((game) => (
          <div
            key={game._id}
            className="relative h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${game.image})` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-0 hover:bg-opacity-75 transition-opacity duration-300">
              <h1
                className={`${quantico.className} text-white text-center text-lg transition-opacity duration-300`}
              >
                {game.name}
              </h1>
              <Link
                href={`/games/${game._id}`}
                className={`${quantico.className} text-sm font-semibold transition-opacity duration-300 mt-2 py-2  px-3 bg-emerald-600 text-white rounded-lg`}
              >
                Game Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesAll;
